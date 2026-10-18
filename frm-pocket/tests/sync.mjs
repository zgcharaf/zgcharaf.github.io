import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import {clone,mergeProgress,cloudState,sanitizeState,equal} from '../lib/sync-engine.mjs';
import {SyncController} from '../lib/sync-controller.mjs';
import {handleSync} from '../lib/sync-server.mjs';
let tests=0;
async function test(name,fn){await fn();tests++;console.log('PASS '+name);}
const defaults=()=>({version:1,exam:'2026-11-24',goal:10,quiz:{},cards:{},bookmarks:[],notes:{},days:{},history:[],mistakes:{},log:[],exposed:{},evidence:{},retention:{},readinessHistory:[],lessons:{},assessments:[],backupAt:0,campaign:{start:'2026-10-18',weekdayMinutes:90,weekendMinutes:180,targetAccuracy:70,readings:{},done:{},assignments:{},mockResults:[]},roadmap:{version:1,self:{},history:[],focus:null},session:null});
function answer(state,id,correct,at,kind='quiz'){
 const previous=state[kind][id];state[kind][id]={attempts:(previous?.attempts||0)+1,correct:(previous?.correct||0)+Number(correct),streak:correct?(previous?.streak||0)+1:0,interval:correct?1:0,ease:2.5,due:at+(correct?86400000:600000),last:at,lastCorrect:correct,firstCorrect:previous?.firstCorrect??correct,firstAt:previous?.firstAt||at,lapses:(previous?.lapses||0)+Number(!correct),mistakeAt:correct?(previous?.mistakeAt||0):at,repairDays:[],lastConfidence:null,wrongConfidence:null,lastWrongChoice:correct?null:0};
 state.days['2026-10-18']=(state.days['2026-10-18']||0)+1;state.log.push({id,kind,at,correct,confidence:null,choice:correct?1:0,elapsedMs:1000});
 if(kind==='quiz'&&!state.evidence[id])state.evidence[id]={at,correct,timed:false};state.exposed[id]=at-1;
}
class SQLiteD1 {
 constructor(){this.sql=new DatabaseSync(':memory:');this.sql.exec(readFileSync(new URL('../drizzle/0000_silent_midnight.sql',import.meta.url),'utf8'));}
 prepare(sql){const db=this;return {sql,args:[],bind(...args){this.args=args;return this;},async run(){return db.execute(this);}};}
 execute(stmt){const s=this.sql.prepare(stmt.sql);if(/^\s*SELECT/i.test(stmt.sql))return {results:s.all(...stmt.args),meta:{changes:0}};const r=s.run(...stmt.args);return {results:[],meta:{changes:Number(r.changes)}};}
 async batch(stmts){this.sql.exec('BEGIN');try{const out=stmts.map(s=>this.execute(s));this.sql.exec('COMMIT');return out;}catch(e){this.sql.exec('ROLLBACK');throw e;}}
}
const user={userId:'owner-test',displayName:'Test owner'},origin='https://example.test';
const req=(method='GET',body,headers={})=>new Request(origin+'/api/sync',{method,headers:{origin,...(body?{'content-type':'application/json'}:{}),...headers},body:body?JSON.stringify(body):undefined});
async function call(db,method,body,who=user){const response=await handleSync(req(method,body),db,who);const json=await response.json();if(!response.ok)throw Error(json.error);return json;}
const op=(device,seq,local,base=defaults(),mode='merge')=>({device,seq,local:cloudState(local),base:cloudState(base),mode});
function device(db,{state=defaults(),saved=null,token=null,who=()=>user,drop=()=>false,applyHook=()=>{},saveHook=()=>{}}={}){
 const box={state:clone(state),saved:clone(saved),token,writes:0,posts:0};
 const storage={load:async()=>clone(box.saved),save:async value=>{box.saved=clone(value);box.writes++;saveHook(box,value);}};
 const transport=async(method,body)=>{if(method==='POST')box.posts++;const result=await call(db,method,body,who());if(drop(method,box))throw Error('connection_lost');return result;};
 const c=new SyncController({storage,transport,defaults,getState:()=>box.state,token,apply:(value,marker,base,remote)=>{applyHook(box,value);box.state={...clone(value),session:box.state.session};box.token=marker;},schedule:()=>{}});
 return {c,box};
}
await test('Offline devices retain both answers, correct totals and distinct histories',async()=>{
 const db=new SQLiteD1(),a=device(db),b=device(db);await a.c.init();await a.c.flush();await b.c.init();await b.c.flush();
 answer(a.box.state,'q001',false,100);answer(b.box.state,'q002',true,200);await Promise.all([a.c.flush(),b.c.flush()]);await a.c.flush();await b.c.flush();
 for(const d of [a,b]){assert.equal(d.box.state.days['2026-10-18'],2);assert.equal(d.box.state.quiz.q001.correct,0);assert.equal(d.box.state.quiz.q002.correct,1);assert.equal(d.box.state.log.length,2);}
});
await test('Concurrent offline answers to one question add once and preserve the earliest first answer',async()=>{
 const db=new SQLiteD1(),a=device(db),b=device(db);await a.c.init();await a.c.flush();await b.c.init();await b.c.flush();answer(a.box.state,'q001',false,100);answer(b.box.state,'q001',true,200);
 await Promise.all([a.c.flush(),b.c.flush()]);const cloud=(await call(db,'GET')).state;
 assert.equal(cloud.quiz.q001.attempts,2);assert.equal(cloud.quiz.q001.correct,1);assert.equal(cloud.quiz.q001.lastCorrect,true);assert.equal(cloud.quiz.q001.firstCorrect,false);assert.equal(cloud.evidence.q001.correct,false);assert.equal(cloud.log.length,2);
});
await test('A server save followed by a lost response is retried without duplicate counters',async()=>{
 const db=new SQLiteD1(),a=device(db,{drop:(method,box)=>method==='POST'&&box.posts===2});await a.c.init();await a.c.flush();answer(a.box.state,'q001',true,100);await a.c.flush();assert.ok(a.box.saved.pending);assert.equal(a.c.status,'error');
 await a.c.flush();assert.equal(a.box.state.quiz.q001.attempts,1);assert.equal(a.box.saved.pending,null);assert.equal((await call(db,'GET')).state.days['2026-10-18'],1);
});
await test('Closing after a lost response retains the retry and new offline work on reopening',async()=>{
 const db=new SQLiteD1(),a=device(db,{drop:(m,b)=>m==='POST'&&b.posts===2});await a.c.init();await a.c.flush();answer(a.box.state,'q001',true,100);await a.c.flush();answer(a.box.state,'q002',false,200);
 const reopened=device(db,{state:a.box.state,saved:a.box.saved,token:a.box.token});await reopened.c.init();await reopened.c.flush();await reopened.c.flush();const s=(await call(db,'GET')).state;assert.equal(s.days['2026-10-18'],2);assert.equal(s.quiz.q001.attempts,1);assert.equal(s.quiz.q002.attempts,1);
});
await test('New answers written during a slow upload survive rebasing and upload once',async()=>{
 const db=new SQLiteD1(),a=device(db);await a.c.init();await a.c.flush();answer(a.box.state,'q001',true,100);
 const transport=a.c.transport;let injected=false;a.c.transport=async(method,body)=>{const result=await transport(method,body);if(method==='POST'&&!injected){injected=true;answer(a.box.state,'q002',true,200);}return result;};
 await a.c.flush();assert.equal(a.box.state.days['2026-10-18'],2);await a.c.flush();assert.equal((await call(db,'GET')).state.days['2026-10-18'],2);
});
await test('Recovery after the journal commits but the local projection fails does not lose cloud work',async()=>{
 const db=new SQLiteD1(),a=device(db),b=device(db);await a.c.init();await a.c.flush();await b.c.init();await b.c.flush();answer(b.box.state,'q002',false,200);await b.c.flush();
 let crash=true;a.c.apply=()=>{if(crash)throw Error('simulated_crash');};await a.c.flush();assert.notEqual(a.box.saved.commit.token,a.box.token);
 const reopened=device(db,{state:a.box.state,saved:a.box.saved,token:a.box.token});await reopened.c.init();assert.ok(reopened.box.state.quiz.q002);await reopened.c.flush();assert.equal((await call(db,'GET')).state.quiz.q002.attempts,1);
});
await test('Reload after a completed projection uses its marker and cannot double counts',async()=>{
 const db=new SQLiteD1(),a=device(db);await a.c.init();await a.c.flush();answer(a.box.state,'q001',true,100);await a.c.flush();
 const b=device(db,{state:a.box.state,saved:a.box.saved,token:a.box.token});await b.c.init();await b.c.flush();assert.equal(b.box.state.days['2026-10-18'],1);assert.equal(b.box.posts,0);
});
await test('A different signed-in account cannot receive the previous account’s local progress',async()=>{
 const db=new SQLiteD1();let who=user;const a=device(db,{who:()=>who});await a.c.init();await a.c.flush();answer(a.box.state,'q001',true,100);who={userId:'another',displayName:'Another'};await a.c.flush();assert.equal(a.c.status,'account');assert.equal((await call(db,'GET',undefined,who)).state,null);assert.ok(a.box.state.quiz.q001);
});
await test('Repeated legacy imports are conservative, preserve disjoint work and do not double count',async()=>{
 const legacy=defaults();answer(legacy,'q001',false,100);const cloud=clone(legacy);answer(cloud,'q002',true,200);
 let m=mergeProgress(defaults(),legacy,cloud,{seed:true}).state;m=mergeProgress(defaults(),legacy,m,{seed:true}).state;assert.equal(m.days['2026-10-18'],2);assert.equal(m.quiz.q001.attempts,1);assert.equal(m.log.length,2);
});
await test('A new device receives cloud study settings rather than resetting them to defaults',async()=>{
 const db=new SQLiteD1(),s=defaults();s.goal=30;s.campaign.weekdayMinutes=120;s.notes.q001='Keep this';const a=device(db,{state:s});await a.c.init();await a.c.flush();const b=device(db);await b.c.init();await b.c.flush();assert.equal(b.box.state.goal,30);assert.equal(b.box.state.campaign.weekdayMinutes,120);assert.equal(b.box.state.notes.q001,'Keep this');
});
await test('Legacy unknown first attempts stay unknown and cannot inherit fresh evidence from another device',async()=>{
 const db=new SQLiteD1(),fresh=defaults();answer(fresh,'q001',true,200);const a=device(db,{state:fresh});await a.c.init();await a.c.flush();
 const legacy=defaults();answer(legacy,'q001',false,100);legacy.quiz.q001.firstAt=null;legacy.quiz.q001.firstCorrect=null;legacy.evidence={};const b=device(db,{state:legacy});await b.c.init();await b.c.flush();
 assert.equal(b.box.state.quiz.q001.firstCorrect,null);assert.equal(b.box.state.evidence.q001,undefined);await a.c.flush();assert.equal(a.box.state.evidence.q001,undefined);
});
await test('Conflicting note edits retain both texts, while independent note fields merge',async()=>{
 const db=new SQLiteD1(),a=device(db),b=device(db);await a.c.init();await a.c.flush();await b.c.init();await b.c.flush();a.box.state.notes.q001='Phone version';b.box.state.notes.q001='Computer version';b.box.state.notes.q002='Independent';await Promise.all([a.c.flush(),b.c.flush()]);const x=await call(db,'GET');assert.equal(x.conflicts.length,1);assert.deepEqual(new Set([x.conflicts[0].local,x.conflicts[0].remote]),new Set(['Phone version','Computer version']));assert.equal(x.state.notes.q002,'Independent');
});
await test('Bookmark removal survives a simultaneous unrelated addition',()=>{
 const b=defaults();b.bookmarks=['q001'];const l=clone(b),r=clone(b);l.bookmarks=[];r.bookmarks.push('q002');assert.deepEqual(mergeProgress(b,l,r).state.bookmarks,['q002']);
});
await test('A new mistake discards repair days belonging to an earlier mistake',()=>{
 const b=defaults();answer(b,'q001',false,100);const l=clone(b),r=clone(b);l.quiz.q001.repairDays=['2026-10-19','2026-10-20'];answer(r,'q001',false,300);const s=mergeProgress(b,l,r).state;assert.equal(s.quiz.q001.mistakeAt,300);assert.deepEqual(s.quiz.q001.repairDays,[]);
});
await test('Readiness trends, assessments, notes and chapter evidence remain distinct through merge',()=>{
 const b=defaults(),l=clone(b),r=clone(b);l.readinessHistory=[{at:100,version:1,score:35}];r.readinessHistory=[{at:200,version:1,score:40}];l.roadmap.self['CR-1']={notes:'Understand assumptions',at:100};r.campaign.readings['MR-1']={status:'read',at:200,notes:'Done'};const s=mergeProgress(b,l,r).state;assert.equal(s.readinessHistory.length,2);assert.ok(s.roadmap.self['CR-1']);assert.ok(s.campaign.readings['MR-1']);
});
await test('Sessions and live assessment deadlines are never uploaded or replaced from cloud',async()=>{
 const db=new SQLiteD1(),s=defaults();s.session={assessment:true,deadline:123456789,index:4};const a=device(db,{state:s});await a.c.init();await a.c.flush();assert.equal(a.box.state.session.deadline,123456789);assert.equal((await call(db,'GET')).state.session,null);
});
await test('Authentication, same-origin writes, account isolation and no-store responses are enforced',async()=>{
 const db=new SQLiteD1();let res=await handleSync(req(),db,null);assert.equal(res.status,401);assert.match(res.headers.get('cache-control'),/no-store/);
 res=await handleSync(req('POST',op('test-device-123456',1,defaults()),{origin:'https://evil.test'}),db,user);assert.equal(res.status,403);
 res=await handleSync(req('GET',undefined,{'sec-fetch-site':'cross-site'}),db,user);assert.equal(res.status,403);
 await call(db,'POST',op('test-device-123456',1,defaults()));assert.equal((await call(db,'GET',undefined,{userId:'stranger'})).state,null);
});
await test('Invalid operations, sequence gaps and malformed state cannot corrupt stored progress',async()=>{
 const db=new SQLiteD1(),bad=defaults();bad.quiz.q001={attempts:1,correct:5,due:100};await assert.rejects(()=>call(db,'POST',op('test-device-123456',1,bad)),/invalid_operation/);
 await assert.rejects(()=>call(db,'POST',op('test-device-123456',2,defaults())),/sequence_gap/);assert.equal((await call(db,'GET')).state,null);
});
await test('Large Unicode progress is split into safe chunks and atomically reconstructed',async()=>{
 const db=new SQLiteD1(),s=defaults();for(let i=0;i<300;i++)s.notes['q'+i]='é📘漢'.repeat(1000);const x=await call(db,'POST',op('test-device-123456',1,s));assert.deepEqual(x.state.notes,s.notes);assert.ok(db.sql.prepare('SELECT count(*) AS n FROM sync_chunks').get().n>10);
});
await test('Prototype keys and private browser markers never enter cloud data',()=>{
 const s=defaults();s._cloudCommit='secret-local-marker';s.notes=JSON.parse('{"__proto__":{"polluted":true},"q001":"safe"}');const clean=sanitizeState(s);assert.equal({}.polluted,undefined);assert.equal(clean._cloudCommit,undefined);assert.equal(Object.hasOwn(clean.notes,'__proto__'),false);
});
await test('Browser and server merge implementations are generated from the identical source',async()=>{
 const source=readFileSync(new URL('../sync-engine.js',import.meta.url),'utf8');const vm=await import('node:vm'),ctx={};vm.runInNewContext(source,ctx);const b=defaults(),l=clone(b),r=clone(b);answer(l,'q001',false,100);answer(r,'q002',true,200);assert.equal(JSON.stringify(ctx.SyncEngine.mergeProgress(b,l,r)),JSON.stringify(mergeProgress(b,l,r)));
});
console.log(`${tests} cloud sync checks passed against real SQLite transactions; browser auth and physical-device UX still require hosted use.`);
