/* Transparent study-evidence index v1. No pass-probability calibration. */
(function(root){
 'use strict';
 const DAY=86400000,WEIGHTS={market:.20,credit:.20,operational:.20,liquidity:.15,investment:.15,current:.10};
 const fresh=(state,id)=>!state.quiz[id]&&!state.cards[id]&&!state.exposed[id];
 function score(state,questions,skills,now=Date.now()){
  const byId=new Map(questions.map(q=>[q.id,q])),cutoff=now-42*DAY;
  const observations=Object.entries(state.evidence||{}).filter(([id,e])=>byId.has(id)&&e.at>=cutoff&&e.at<=now).map(([id,e])=>({...e,q:byId.get(id)}));
  const domains=Object.entries(WEIGHTS).map(([id,weight])=>{const xs=observations.filter(e=>e.q.topic===id);return {id,weight,n:xs.length,right:xs.filter(e=>e.correct).length,accuracy:xs.length?xs.filter(e=>e.correct).length/xs.length:null};});
  const performance=60*domains.reduce((sum,d)=>sum+d.weight*(d.accuracy||0),0);
  const breadth=20*skills.reduce((sum,s)=>sum+Math.min(2,observations.filter(e=>e.q.skill===s.id&&e.correct).length)/2,0)/skills.length;
  const delayed=Object.entries(state.retention||{}).filter(([id,e])=>byId.has(id)&&e.at>=cutoff&&e.at<=now);
  const retention=10*Math.min(1,delayed.length/24)*(delayed.length?delayed.filter(([,e])=>e.correct).length/delayed.length:0);
  const timed=observations.filter(e=>e.timed);
  const pace=10*Math.min(1,timed.length/20)*(timed.length?timed.filter(e=>e.correct).length/timed.length:0);
  const total=Math.round(performance+breadth+retention+pace);
  return {version:1,score:total,components:{performance,breadth,retention,pace},domains,n:observations.length,timed:timed.length,delayed:delayed.length,provisional:observations.length<40||domains.some(d=>d.n<4),old:Object.values(state.evidence||{}).filter(e=>e.at<cutoff).length};
 }
 function snapshot(state,questions,skills,now=Date.now(),reason='refresh'){
  const result=score(state,questions,skills,now),last=state.readinessHistory.at(-1);
  if(!last||Math.floor(last.at/DAY)!==Math.floor(now/DAY)||last.score!==result.score||last.n!==result.n||last.timed!==result.timed||last.delayed!==result.delayed){state.readinessHistory.push({at:now,score:result.score,n:result.n,timed:result.timed,delayed:result.delayed,version:1,reason});state.readinessHistory=state.readinessHistory.slice(-1000);}
  return result;
 }
 function clean(data,s,ids){
  const allowed=new Set(ids),finite=x=>Number.isFinite(x)&&x>=0;
  s.exposed={};for(const [id,at]of Object.entries(data.exposed||{}))if(allowed.has(id)&&finite(at))s.exposed[id]=at;
  for(const name of ['evidence','retention']){s[name]={};for(const[id,e]of Object.entries(data[name]||{}))if(allowed.has(id)&&e&&finite(e.at)&&typeof e.correct==='boolean')s[name][id]={at:e.at,correct:e.correct,timed:name==='evidence'&&e.timed===true};}
  s.readinessHistory=Array.isArray(data.readinessHistory)?data.readinessHistory.filter(x=>x&&finite(x.at)&&Number.isInteger(x.score)&&x.score>=0&&x.score<=100&&x.version===1).slice(-1000).map(x=>({at:x.at,score:x.score,version:1,n:Math.max(0,Number(x.n)||0),timed:Math.max(0,Number(x.timed)||0),delayed:Math.max(0,Number(x.delayed)||0),reason:['refresh','practice','assessment'].includes(x.reason)?x.reason:'refresh'})).sort((a,b)=>a.at-b.at):[];
  s.lessons={};for(const[id,l]of Object.entries(data.lessons||{}))if(allowed.has(id)&&l&&typeof l==='object')s.lessons[id]={text:String(l.text||'').slice(0,2000),step:Math.min(3,Math.max(0,Math.floor(Number(l.step)||0))),checked:l.checked===true,transfer:allowed.has(l.transfer)?l.transfer:null,transferExposure:finite(l.transferExposure)?l.transferExposure:0,delayExposure:finite(l.delayExposure)?l.delayExposure:0,transferViewed:l.transferViewed===true,transferFresh:l.transferFresh===true,transferStarted:finite(l.transferStarted)?l.transferStarted:0,delayStarted:finite(l.delayStarted)?l.delayStarted:0,transferCorrect:typeof l.transferCorrect==='boolean'?l.transferCorrect:null,at:finite(l.at)?l.at:0,delayedAt:finite(l.delayedAt)?l.delayedAt:0,delayedCorrect:typeof l.delayedCorrect==='boolean'?l.delayedCorrect:null};
  s.backupAt=finite(data.backupAt)?data.backupAt:0;
  s.assessments=Array.isArray(data.assessments)?data.assessments.filter(a=>a&&finite(a.at)&&Array.isArray(a.items)&&a.items.length>0&&a.items.length<=80&&a.items.every(x=>allowed.has(x.id)&&(x.selected===null||Number.isInteger(x.selected)&&x.selected>=0&&x.selected<=3)&&typeof x.correct==='boolean')).slice(-100).map(a=>({at:a.at,label:String(a.label||'Évaluation').slice(0,100),elapsed:Math.max(0,Number(a.elapsed)||0),items:a.items.map(x=>({id:x.id,selected:x.selected,correct:x.correct,fresh:x.fresh===true}))})):[];
  if(s.session?.assessment){const x=s.session;if(x.type!=='quiz'||!finite(x.deadline)||!finite(x.started)||x.deadline<=x.started||x.deadline-x.started>4*60*60*1000||x.items.length>80)s.session=null;else{x.targetMs=x.deadline-x.started;x.items.forEach(i=>{i.answered=false;i.correct=false;});}}
  return s;
 }
 const api={DAY,WEIGHTS,fresh,score,snapshot,clean};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Readiness=api;
})(typeof window!=='undefined'?window:globalThis);
