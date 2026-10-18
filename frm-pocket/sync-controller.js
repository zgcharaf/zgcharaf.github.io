/* Generated from lib/sync-controller.mjs. */
(function(root){'use strict';
const {clone,equal,cloudState,mergeProgress}=root.SyncEngine;
class SyncController {
 constructor({storage,transport,getState,apply,defaults,token=null,getToken,uuid=()=>crypto.randomUUID(),online=()=>true,onStatus=()=>{},schedule=fn=>setTimeout(fn,900)}){
  Object.assign(this,{storage,transport,getState,apply,defaults,token,uuid,online,onStatus,schedule});this.getToken=getToken||(()=>this.token);this.busy=false;this.timer=false;this.meta=null;this.ready=false;this.status='loading';
 }
 statusAs(status,error=''){this.status=status;this.error=error;this.onStatus(this);}
 async init(){
  try{
   this.meta=await this.storage.load() || {version:1,device:this.uuid(),seq:0,user:null,base:null,pending:null,commit:null,revision:0,lastSync:0,conflicts:[],localConflicts:[],backup:clone(this.getState())};
   if(this.meta.version!==1)throw Error('local_sync_version');
   this.recover();
   await this.storage.save(this.meta);this.ready=true;this.statusAs(this.online()?'pending':'offline');return true;
  }catch{this.statusAs('error','Le journal de synchronisation est indisponible. Exporte ta progression.');return false;}
 }
 recover(){const commit=this.meta.commit;if(commit&&commit.token!==this.getToken()){const restored=mergeProgress(commit.before,cloudState(this.getState()),commit.after);this.apply(restored.state,commit.token,commit.base,commit.remote);this.token=commit.token;}}
 changed(){
  if(!this.meta || this.status==='account' || this.status==='error' && !this.meta)return;
  this.statusAs(this.online()?'pending':'offline');
  if(!this.timer){this.timer=true;this.schedule(()=>{this.timer=false;this.flush();});}
 }
 async request(method,body){
  const result=await this.transport(method,body);
  if(!result || result.version!==1 || !result.user?.id || !Number.isInteger(result.revision))throw Error('invalid_response');
  if(this.meta.user && this.meta.user!==result.user.id){this.statusAs('account','Ce navigateur est lié à un autre compte. Reconnecte-toi au compte initial ou exporte tes données.');throw Error('account_changed');}
  return result;
 }
 async commit(result,base,seq=this.meta.seq){
  const before=cloudState(this.getState()),merged=result.state?mergeProgress(base,before,result.state):{state:before,conflicts:[]},token=this.uuid();
  const localConflicts=[...(this.meta.localConflicts||[])];
  for(const c of merged.conflicts)if(!localConflicts.some(x=>x.path===c.path&&x.local===c.local&&x.remote===c.remote))localConflicts.push({...c,at:Date.now()});
  const next={...this.meta,user:result.user.id,userName:result.user.name,seq,base:clone(result.state),revision:result.revision,pending:null,lastSync:Date.now(),conflicts:result.conflicts||[],localConflicts,commit:{token,before,after:merged.state,base:clone(base),remote:clone(result.state)}};
  // Journal first, browser projection second. A crash between them is recovered in init().
  await this.storage.save(next);this.meta=next;
  const current=cloudState(this.getState()),latest=mergeProgress(before,current,merged.state);
  this.apply(latest.state,token,base,result.state);this.token=token;
 }
 async flush(){
  if(this.busy || !this.ready || !this.meta || this.status==='account')return;
  if(!this.online()){this.statusAs('offline');return;}
  this.busy=true;this.statusAs('syncing');
  try{
   this.recover();
   const remote=await this.request('GET');
   if(!this.meta.user){this.meta={...this.meta,user:remote.user.id,userName:remote.user.name};await this.storage.save(this.meta);}
   if(this.meta.pending){
    await this.storage.save(this.meta);
    const op=clone(this.meta.pending),result=await this.request('POST',op);
    await this.commit(result,op.local,op.seq);
   }else if(!this.meta.base || !equal(cloudState(this.getState()),this.meta.base)){
    const op={device:this.meta.device,seq:this.meta.seq+1,mode:this.meta.base?'merge':'seed',base:cloudState(this.meta.base||this.defaults()),local:cloudState(this.getState())};
    this.meta={...this.meta,pending:op};await this.storage.save(this.meta);
    const result=await this.request('POST',op);await this.commit(result,op.local,op.seq);
   }else if(remote.state && remote.revision!==this.meta.revision){await this.commit(remote,this.meta.base);}
   else {this.meta={...this.meta,lastSync:Date.now()};await this.storage.save(this.meta);}
   this.statusAs('saved');
  }catch(error){
   if(error.message==='account_changed'){}else if(error.message==='sign_in_required')this.statusAs('signin');
   else this.statusAs(this.online()?'error':'offline',error.message==='too_large'?'Progression trop volumineuse. Exporte-la avant de continuer.':error.message==='sequence_gap'?'Le journal de cet appareil doit être vérifié. Exporte ta progression.':'Synchronisation en attente. Tes réponses restent enregistrées sur cet appareil.');
  }finally{this.busy=false;}
  if(this.status==='saved' && !equal(cloudState(this.getState()),this.meta.base))this.changed();
 }
}


root.SyncController=SyncController;
})(globalThis);
