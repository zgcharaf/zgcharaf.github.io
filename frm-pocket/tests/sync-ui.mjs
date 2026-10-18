import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {clone,mergeProgress} from '../lib/sync-engine.mjs';
const root=new URL('../',import.meta.url),files=['vendor/katex/katex.min.js','math-overrides.js','math-text.js','data.js','exam.js','challenge.js','engine.js','coach.js','syllabus.js','coverage-market-credit.js','coverage-operational-liquidity.js','coverage-investment-current.js','coverage-register.js','deep-market.js','deep-credit.js','deep-operational.js','deep-liquidity.js','deep-investment.js','deep-current.js','deep-register.js','campaign.js','checkpoints.js','readiness.js','roadmap-engine.js','sync-boot.js','app.js','upgrade.js','exam-prep.js','roadmap-ui.js','sync-engine.js','sync-controller.js','sync-ui.js'];
async function mount({host='https://frm-pocket-charaf.zgcharaf.chatgpt.site',online=false,cloud=null,raw=null,token=null}={}){
 const elements=new Map(),events={},local=new Map(),journal=new Map(),inputs=[];let revision=cloud?1:0,cloudState=clone(cloud),metaRequests=0;
 if(raw)local.set('frm-pocket-v1',JSON.stringify({...raw,_cloudCommit:token}));
 function element(id){if(!elements.has(id))elements.set(id,{id,innerHTML:'',textContent:'',open:false,value:'',dataset:{},classList:{add(){},remove(){}},setAttribute(k,v){this[k]=v;},showModal(){this.open=true;},close(){this.open=false;},addEventListener(){},reportValidity:()=>true});return elements.get(id);}
 const db={createObjectStore(){},transaction(){const tx={objectStore:()=>({get(key){const req={};queueMicrotask(()=>{req.result=clone(journal.get(key));req.onsuccess?.();});return req;},put(value,key){journal.set(key,clone(value));queueMicrotask(()=>tx.oncomplete?.());}})};return tx;}};
 const navigator={onLine:online,locks:{request:async(_name,_opts,fn)=>fn({})}};
 const context=vm.createContext({console,Date,Math,JSON,Set,Map,Object,Array,Number,String,Boolean,Error,RegExp,Blob,URL,AbortController,crypto,Response,structuredClone,queueMicrotask,setTimeout:()=>0,clearTimeout(){},setInterval(){},navigator,
  indexedDB:{open(){const req={result:db};queueMicrotask(()=>{req.onupgradeneeded?.();req.onsuccess?.();});return req;}},
  localStorage:{getItem:k=>local.get(k)||null,setItem:(k,v)=>local.set(k,v)},
  fetch:async(_url,options)=>{metaRequests++;if(options.method==='POST'){const op=JSON.parse(options.body);cloudState=cloudState?mergeProgress(op.base,op.local,cloudState,{seed:op.mode==='seed'}).state:op.local;revision++;}return Response.json({version:1,user:{id:'test-owner',name:'Charaf'},revision,state:clone(cloudState),conflicts:[],updatedAt:Date.now()});},
  location:{origin:host,href:host+'/',hash:''},window:{scrollTo(){},addEventListener(){}},
  document:{compatMode:'CSS1Compat',visibilityState:'visible',hidden:false,querySelector:element,addEventListener:(type,fn,capture)=>{(events[type]||=[]).push({fn,capture});},createElement(tag){const el={tagName:tag.toUpperCase(),click(){}};if(tag==='input')inputs.push(el);return el;}}
 });
 Object.assign(context,context.window);context.window=context;
 for(const file of files)vm.runInContext(fs.readFileSync(new URL(file,root),'utf8'),context,{filename:file});
 const run=s=>vm.runInContext(s,context);
 for(let i=0;i<40;i++)await new Promise(setImmediate);
 return {run,context,elements,events,local,journal,inputs,navigator,element,cloud:()=>cloudState,cloudSet:s=>{cloudState=clone(s);revision++;},requests:()=>metaRequests};
}
let tests=0;async function test(name,fn){await fn();tests++;console.log('PASS '+name);}
const app=await mount();
await test('Cloud status and settings are rendered with a real initialized retry controller',()=>{
 assert.equal(app.run('CloudUI.controller().ready'),true);assert.equal(app.run('CloudUI.controller().status'),'offline');app.run('settings()');assert.match(app.element('#modalcontent').innerHTML,/Mon compte et ma synchronisation/);assert.equal(app.element('#sync-status').textContent,'Hors ligne');
});
await test('Syncing a local question exposure preserves its own fresh flag and choice order',async()=>{
 app.run("state.session=null;launchSelection('quiz',[HARD[0]])");assert.equal(app.run('state.session.items[0].fresh'),true);const order=app.run('JSON.stringify(state.session.items[0].order)');app.navigator.onLine=true;await app.run('CloudUI.controller().flush()');
 assert.equal(app.run('state.session.items[0].fresh'),true);assert.equal(app.run('JSON.stringify(state.session.items[0].order)'),order);assert.equal(app.cloud().session,null);
});
await test('Remote progress invalidates a paused question’s freshness without replacing its local session',async()=>{
 const cloud=clone(app.cloud()),id=app.run('state.session.items[0].id'),started=app.run('state.session.started');cloud.exposed[id]=Date.now()+1;app.cloudSet(cloud);await app.run('CloudUI.controller().flush()');assert.equal(app.run('state.session.items[0].fresh'),false);assert.equal(app.run('state.session.started'),started);
});
await test('A successful cloud projection retains its recovery marker through ordinary local saves',async()=>{
 app.run('state.session=null;state.notes.q001="Phone note";persist()');await app.run('CloudUI.controller().flush()');const marker=JSON.parse(app.local.get('frm-pocket-v1'))._cloudCommit;assert.ok(marker);app.run('state.goal=15;persist()');assert.equal(JSON.parse(app.local.get('frm-pocket-v1'))._cloudCommit,marker);
});
await test('Cloud and local notes escape imported markup in sync settings and conflict copies',()=>{
 app.run('CloudUI.controller().meta.localConflicts.push({path:"notes.q001",local:"<img onerror=boom>",remote:"<script>boom</script>"});settings()');const html=app.element('#modalcontent').innerHTML;assert.ok(html.includes('&lt;img onerror=boom&gt;'));assert.ok(!html.includes('<script>boom'));
});
await test('Imports merge progress and download a prior copy while retaining the local practice session',async()=>{
 app.run("state.session=null;launchSelection('quiz',[HARD[1]])");const started=app.run('state.session.started'),incoming=app.run('JSON.parse(JSON.stringify(defaults()))');incoming.notes.q002='Imported note';incoming.exposed[app.run('state.session.items[0].id')]=Date.now();app.run('importData()');const input=app.inputs.at(-1);input.files=[{size:100,text:async()=>JSON.stringify(incoming)}];await input.onchange();app.element('#confirm-import').onclick();assert.equal(app.run('state.notes.q001'),'Phone note');assert.equal(app.run('state.notes.q002'),'Imported note');assert.equal(app.run('state.session.started'),started);assert.equal(app.run('state.session.items[0].fresh'),false);
});
await test('Import is blocked during a live closed-book assessment',()=>{
 app.run('state.session.assessment=true;importData()');assert.match(app.element('#toast').textContent,/remets ta copie/);app.run('state.session=null');
});
await test('GitHub keeps local study and presents the exact private sync migration URL',async()=>{
 const gh=await mount({host:'https://zgcharaf.github.io'});assert.equal(gh.run('CloudUI.controller()'),null);assert.equal(gh.element('#sync-status').textContent,'Activer la sync');gh.run('settings()');assert.match(gh.element('#modalcontent').innerHTML,/https:\/\/frm-pocket-charaf.zgcharaf.chatgpt.site/);assert.equal(gh.requests(),0);gh.run('state.goal=20;persist()');assert.equal(JSON.parse(gh.local.get('frm-pocket-v1')).goal,20);
});
await test('A new online device does not create a false zero-score trend before cloud evidence loads',async()=>{
 const saved=app.run('JSON.parse(JSON.stringify(defaults()))');saved.readinessHistory=[{at:Date.now()-1000,score:25,n:5,timed:0,delayed:0,version:1,reason:'practice'}];saved.evidence.h001={at:Date.now()-1000,correct:true,timed:false};saved.quiz.h001={attempts:1,correct:1,due:Date.now()+86400000,last:Date.now()-1000};
 const online=await mount({online:true,cloud:saved});assert.ok(online.run('state.readinessHistory.some(x=>x.score===25)'));assert.equal(online.run('state.readinessHistory.filter(x=>x.score===0).length'),0);assert.ok(online.run('state.quiz.h001'));
});
console.log(`${tests} sync UI checks passed with the full app scripts and simulated DOM/IndexedDB. Physical iPhone remains unverified.`);
