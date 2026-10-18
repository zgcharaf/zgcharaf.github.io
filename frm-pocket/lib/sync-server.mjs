import {mergeProgress,sanitizeState,stable} from './sync-engine.mjs';
const MAX_BYTES=16*1024*1024,MAX_STATE=7*1024*1024,CHUNK=60000;
const json=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'private, no-store','Vary':'Cookie','X-Content-Type-Options':'nosniff'}});
async function read(db,userId){
 const results=await db.batch([
  db.prepare('SELECT revision,devices,conflicts,updated_at FROM sync_accounts WHERE user_id=?').bind(userId),
  db.prepare('SELECT content FROM sync_chunks WHERE user_id=? ORDER BY part').bind(userId),
 ]);
 const row=results[0].results[0];if(!row)return {revision:0,devices:{},conflicts:[],state:null,updatedAt:0};
 const text=results[1].results.map(x=>x.content).join('');
 return {revision:row.revision,devices:JSON.parse(row.devices),conflicts:JSON.parse(row.conflicts),state:text?JSON.parse(text):null,updatedAt:row.updated_at};
}
function response(data,user){return json({version:1,user:{id:user.userId,name:user.displayName},revision:data.revision,state:data.state,conflicts:data.conflicts,updatedAt:data.updatedAt});}
async function readBody(request){
 if(Number(request.headers.get('content-length'))>MAX_BYTES)throw Error('too_large');
 const reader=request.body?.getReader();if(!reader)throw Error('invalid_body');
 const chunks=[];let size=0;
 while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>MAX_BYTES){await reader.cancel();throw Error('too_large');}chunks.push(value);}
 const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}
 return JSON.parse(new TextDecoder().decode(bytes));
}
export async function handleSync(request,db,user){
 if(!user?.userId)return json({error:'sign_in_required'},401);
 if(!db)return json({error:'storage_unavailable'},503);
 if(!['GET','POST'].includes(request.method))return json({error:'method_not_allowed'},405);
 if(request.headers.get('sec-fetch-site')==='cross-site')return json({error:'cross_origin_denied'},403);
 if(request.method==='GET')return response(await read(db,user.userId),user);
 if(request.headers.get('origin')!==new URL(request.url).origin || !/^application\/json(?:;|$)/i.test(request.headers.get('content-type')||''))return json({error:'cross_origin_denied'},403);
 let op;
 try{
  op=await readBody(request);
  if(!op || !/^[a-zA-Z0-9_-]{16,80}$/.test(op.device) || !Number.isSafeInteger(op.seq)||op.seq<1 || !['merge','seed'].includes(op.mode))throw Error('invalid_operation');
  op.local=sanitizeState(op.local);op.base=sanitizeState(op.base);
 }catch(error){return json({error:error.message==='too_large'?'too_large':'invalid_operation'},error.message==='too_large'?413:400);}
 await db.prepare('INSERT INTO sync_accounts(user_id) VALUES(?) ON CONFLICT(user_id) DO NOTHING').bind(user.userId).run();
 for(let attempt=0;attempt<8;attempt++){
  const prior=await read(db,user.userId),acked=prior.devices[op.device]||0;
  if(acked>=op.seq)return response(prior,user); // Lost-response retries cannot count twice.
  if(op.seq!==acked+1)return json({error:'sequence_gap'},409);
  const result=prior.state?mergeProgress(op.base,op.local,prior.state,{seed:op.mode==='seed'}):{state:op.local,conflicts:[]};
  let state;try{state=sanitizeState(result.state);}catch{return json({error:'invalid_merged_state'},400);}
  const serialized=JSON.stringify(state);if(new TextEncoder().encode(serialized).byteLength>MAX_STATE)return json({error:'too_large'},413);
  const now=Date.now(),writer=crypto.randomUUID(),devices={...prior.devices,[op.device]:op.seq};
  if(Object.keys(devices).length>200)return json({error:'device_limit'},409);
  const conflicts=[...prior.conflicts];
  for(const c of result.conflicts)if(!conflicts.some(x=>stable({...x,at:undefined})===stable({...c,at:undefined})))conflicts.push({...c,at:now});
  // Keep every unresolved note variant. Capacity errors leave the previous cloud state intact.
  if(conflicts.length>1000)return json({error:'conflict_limit'},409);
  const commands=[db.prepare('UPDATE sync_accounts SET revision=?,writer=?,devices=?,conflicts=?,updated_at=? WHERE user_id=? AND revision=?').bind(prior.revision+1,writer,JSON.stringify(devices),JSON.stringify(conflicts),now,user.userId,prior.revision),
   db.prepare('DELETE FROM sync_chunks WHERE user_id=? AND EXISTS(SELECT 1 FROM sync_accounts WHERE user_id=? AND writer=?)').bind(user.userId,user.userId,writer)];
  for(let offset=0,part=0;offset<serialized.length;part++){
    let end=Math.min(serialized.length,offset+CHUNK);
    if(end<serialized.length && /[\uD800-\uDBFF]/.test(serialized[end-1]))end--;
    commands.push(db.prepare('INSERT INTO sync_chunks(user_id,part,content) SELECT ?,?,? WHERE EXISTS(SELECT 1 FROM sync_accounts WHERE user_id=? AND writer=?)').bind(user.userId,part,serialized.slice(offset,end),user.userId,writer));offset=end;
  }
  const written=await db.batch(commands);
  if(written[0].meta.changes===1)return response(await read(db,user.userId),user);
 }
 return json({error:'busy_try_again'},409);
}
