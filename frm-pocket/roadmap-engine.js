/* Chapter evidence and adaptive ordering. A study heuristic, never an exam forecast. */
const Roadmap=(()=>{
 'use strict';
 const DAY=86400000,dimensions=['understanding','application','critical'];
 const weights={market:.20,credit:.20,operational:.20,liquidity:.15,investment:.15,current:.10};
 const pending=p=>!!p&&(p.lastCorrect===false||p.mistakeAt>0||p.lapses>0)&&(p.repairDays?.length||0)<2;
 const readingOf=q=>q.objective?.split('.')[0]||q.chapter||null;
 const dimensionOf=q=>dimensions.includes(q.dimension)?q.dimension:'application';
 const defaults=()=>({version:1,self:{},history:[],focus:null});
 function clean(raw,readings,now=Date.now()){
  const out=defaults(),ids=new Set(readings.map(r=>r.id));
  if(!raw||typeof raw!=='object')return out;
  for(const[id,x]of Object.entries(raw.self||{}))if(ids.has(id)&&x&&typeof x==='object'){
   const item={at:Number.isFinite(x.at)?Math.min(now,Math.max(0,x.at)):0,notes:String(x.notes||'').slice(0,2000)};
   for(const d of dimensions)item[d]=[0,1,2,3].includes(x[d])?x[d]:0;
   out.self[id]=item;
  }
  if(ids.has(raw.focus))out.focus=raw.focus;
  out.history=Array.isArray(raw.history)?raw.history.filter(h=>h&&Number.isFinite(h.at)&&h.at>=0&&h.at<=now&&h.scores&&typeof h.scores==='object').slice(-180).map(h=>({at:h.at,score:Math.max(0,Math.min(100,Math.round(h.score||0))),assessed:Math.max(0,Math.min(readings.length,Math.round(h.assessed||0))),stable:Math.max(0,Math.min(readings.length,Math.round(h.stable||0))),scores:Object.fromEntries(Object.entries(h.scores).filter(([id,x])=>ids.has(id)&&(x===null||Number.isInteger(x)&&x>=0&&x<=100))),signature:typeof h.signature==='string'?h.signature.slice(0,4000):''})).sort((a,b)=>a.at-b.at):[];
  return out;
 }
 function rows(state,questions,readings,guides=[],now=Date.now()){
  const groups=new Map(readings.map(r=>[r.id,[]])),cutoff=now-42*DAY,guideMap=new Map(guides.map(g=>[g.readingId,g]));
  for(const q of questions)if(groups.has(readingOf(q)))groups.get(readingOf(q)).push(q);
  const latest=(state.campaign?.mockResults||[]).filter(m=>m.date<=Campaign.dateKey(now)).at(-1),mockWeak=new Set(latest?.weakReadings||[]);
  const result=readings.map(r=>{
   const qs=groups.get(r.id),active=qs.filter(q=>q.tier!=='checkpoint'),attempted=qs.filter(q=>state.quiz?.[q.id]&&state.quiz[q.id].last<=now);
   const evidence=qs.filter(q=>{const e=state.evidence?.[q.id];return e&&e.at>=cutoff&&e.at<=now;}),retained=qs.filter(q=>{const e=state.retention?.[q.id];return e&&e.at>=cutoff&&e.at<=now;});
   const ds=Object.fromEntries(dimensions.map(d=>{const items=evidence.filter(q=>dimensionOf(q)===d),right=items.filter(q=>state.evidence[q.id].correct).length;return[d,{n:items.length,right,accuracy:items.length?right/items.length:null}];}));
   const correct=evidence.filter(q=>state.evidence[q.id].correct).length,retentionRight=retained.filter(q=>state.retention[q.id].correct).length;
   const errors=attempted.filter(q=>pending(state.quiz[q.id])),high=errors.filter(q=>state.quiz[q.id].wrongConfidence==='high'),due=errors.filter(q=>state.quiz[q.id].due<=now),reviewsDue=active.filter(q=>state.quiz?.[q.id]&&state.quiz[q.id].last<=now&&state.quiz[q.id].due<=now&&!pending(state.quiz[q.id]));
   const retainedScore=retained.length?retentionRight/retained.length*Math.min(1,retained.length/2):0;
   const raw=20*(ds.understanding.accuracy||0)+35*(ds.application.accuracy||0)+25*(ds.critical.accuracy||0)+20*retainedScore;
   const score=evidence.length?Math.round(raw*Math.min(1,correct/6)):null;
   const sampled=evidence.length>=6&&dimensions.every(d=>ds[d].n>0)&&retained.length>=2;
   const status=errors.length?'repair':!evidence.length?'unassessed':sampled&&score>=80?'stable':!sampled?'building':'consolidate';
   const fresh=active.filter(q=>!state.quiz?.[q.id]&&!state.cards?.[q.id]&&!state.exposed?.[q.id]);
   const fragileCard=p=>p&&p.lastCorrect===false&&p.last>=cutoff&&p.last<=now;const cardsFragile=qs.filter(q=>fragileCard(state.cards?.[q.id])).length+(fragileCard(state.cards?.['rc-'+r.id])?1:0);
   const self=state.roadmap?.self?.[r.id],selfWeak=dimensions.some(d=>self?.[d]===1),selfHigh=dimensions.some(d=>self?.[d]===3),discrepancy=selfHigh&&errors.length>0;
   const old=qs.filter(q=>state.evidence?.[q.id]?.at<cutoff).length,lastAttempt=attempted.length?Math.max(...attempted.map(q=>state.quiz[q.id].last||0)):0;
   const reasons=[];if(high.length)reasons.push(high.length+' erreur(s) avec certitude');if(errors.length)reasons.push(errors.length+' erreur(s) à consolider');if(due.length)reasons.push(due.length+' rappel(s) arrivé(s) à échéance');if(mockWeak.has(r.id))reasons.push('Signalé faible dans le dernier mock');if(selfWeak)reasons.push('Difficulté déclarée');if(!evidence.length)reasons.push('Aucune réponse inédite observée');else if(!dimensions.every(d=>ds[d].n))reasons.push('Une dimension reste à évaluer');if(!retained.length&&evidence.length)reasons.push('Rétention encore à vérifier');if(old)reasons.push('Preuves anciennes à renouveler');if(!reasons.length)reasons.push(status==='stable'?'Entretien des acquis':'Élargir les preuves');
   if(cardsFragile)reasons.push(cardsFragile+' rappel(s) en carte déclaré(s) difficile(s)');
   if(reviewsDue.length)reasons.push(reviewsDue.length+' rappel(s) de maintien disponible(s)');
   const priority=Math.min(36,errors.length*5)+Math.min(30,high.length*10)+Math.min(12,due.length*3)+Math.min(16,reviewsDue.length*4)+Math.min(12,cardsFragile*4)+(mockWeak.has(r.id)?22:0)+(selfWeak?10:0)+(discrepancy?8:0)+(!evidence.length?22:(100-score)*.20)+(evidence.length&&!retained.length?8:0)+(old?6:0)+(status==='stable'?-18:0);
   const causes={};for(const q of errors){const cause=state.mistakes?.[q.id]?.cause;if(cause)causes[cause]=(causes[cause]||0)+1;}
   const mapped=new Set(qs.map(q=>q.objective)),objectiveMissing=Array.from({length:r.count},(_,i)=>r.id+'.'+(i+1)).filter(id=>!mapped.has(id));
   return {...r,questions:qs.length,practice:active.length,objectiveMapped:r.count-objectiveMissing.length,objectiveMissing,fresh:fresh.length,n:evidence.length,right:correct,accuracy:evidence.length?correct/evidence.length:null,dimensions:ds,retained:retained.length,retentionRight,score,sampled,status,errors:errors.length,high:high.length,due:due.length,reviewsDue:reviewsDue.length,cardsFragile,priority,reasons,causes,lastAttempt,old,discrepancy,guide:guideMap.get(r.id)||null,prerequisites:guideMap.get(r.id)?.prerequisites||[]};
  });
  const map=new Map(result.map(r=>[r.id,r]));for(const r of result){r.weakPrerequisites=r.prerequisites.filter(id=>map.has(id)&&map.get(id).status!=='stable');if(r.weakPrerequisites.length&&r.status!=='stable'){r.reasons.push('Fondations liées : '+r.weakPrerequisites.join(', '));}r.unlocks=result.filter(x=>x.prerequisites.includes(r.id)&&x.status!=='stable').length;r.priority+=Math.min(8,r.unlocks*2);}
  return result;
 }
 function order(rows){const counts={};for(const r of rows)counts[r.topic]=(counts[r.topic]||0)+1;const chosen=[],pending=[...rows],used={};while(pending.length){let best=0,value=-Infinity;for(let i=0;i<pending.length;i++){const r=pending[i],v=r.priority-(used[r.topic]||0)/weights[r.topic]*1.8;if(v>value||(v===value&&r.id.localeCompare(pending[best].id,undefined,{numeric:true})<0)){value=v;best=i;}}const r=pending.splice(best,1)[0];chosen.push(r);used[r.topic]=(used[r.topic]||0)+1;}return chosen;}
 function select(state,questions,readings,guides,{reading=null,count=5,mode='adaptive',now=Date.now()}={}){
  const all=rows(state,questions,readings,guides,now),rank=new Map(order(all).map((r,i)=>[r.id,i])),byReading=new Map(all.map(r=>[r.id,r]));
  const eligible=questions.filter(q=>q.tier&&q.tier!=='checkpoint'&&(mode!=='critical'||dimensionOf(q)==='critical')&&(!reading||readingOf(q)===reading)&&(!state.quiz?.[q.id]||state.quiz[q.id].due<=now));
  const selected=[],dimensionsUsed={},readingsUsed={};while(selected.length<count&&eligible.length){let best=-1,value=-Infinity;for(let i=0;i<eligible.length;i++){const q=eligible[i],id=readingOf(q),row=byReading.get(id),p=state.quiz?.[q.id],d=dimensionOf(q),fresh=!p&&!state.cards?.[q.id]&&!state.exposed?.[q.id];if(mode==='diagnostic'&&!fresh)continue;
    let v=(row?.priority||0)-(rank.get(id)||0)*.15+(p&&pending(p)?35:p?25:0)+(fresh?15:0)+(row&&!row.dimensions[d].n?14:0)-(dimensionsUsed[d]||0)*9-(readingsUsed[id]||0)*(reading?0:18);
    if(mode==='critical')v+=d==='critical'?45:-15;if(mode==='diagnostic')v+=q.tier==='deep'?20:0;
    if(v>value){best=i;value=v;}}
   if(best<0)break;const q=eligible.splice(best,1)[0];selected.push(q);const id=readingOf(q),d=dimensionOf(q);dimensionsUsed[d]=(dimensionsUsed[d]||0)+1;readingsUsed[id]=(readingsUsed[id]||0)+1;
  }return selected;
 }
 function projection(state,rows,{now=Date.now(),limit=7}={}){
  const ranked=order(rows),today=Campaign.dateKey(now),calendar=Campaign.calendar(state.campaign,state.exam,today).filter(d=>d.date>=today&&d.phase!=='exam'&&d.phase!=='finished').slice(0,limit),out=[];let cursor=0;
  for(const day of calendar){if(day.event){out.push({...day,chapters:[],readingMinutes:0});continue;}const readingMinutes=day.phase==='taper'?Math.min(15,day.minutes):Math.max(15,Math.floor(day.minutes*.45)),slots=day.phase==='taper'?1:Math.max(1,Math.min(4,Math.floor(readingMinutes/25)));const chapters=[];if(day.phase==='taper'){const maintenance=ranked.filter(r=>r.n>0);if(maintenance.length)chapters.push(maintenance[0]);}else for(let n=0;n<slots&&cursor<ranked.length;n++,cursor++)chapters.push(ranked[cursor]);out.push({...day,readingMinutes,chapters});}
  return out;
 }
 function snapshot(state,questions,readings,guides=[],now=Date.now()){
  state.roadmap||=defaults();const rs=rows(state,questions,readings,guides,now),scores=Object.fromEntries(rs.map(r=>[r.id,r.score])),assessed=rs.filter(r=>r.n>0).length,stable=rs.filter(r=>r.status==='stable').length;
  const score=Math.round(Object.entries(weights).reduce((sum,[topic,w])=>{const xs=rs.filter(r=>r.topic===topic);return sum+w*xs.reduce((n,r)=>n+(r.score||0),0)/Math.max(1,xs.length);},0));
  const signature=rs.map(r=>[r.id,r.score??'-',r.n,r.retained,r.errors].join(':')).join('|'),history=state.roadmap.history,last=history.at(-1);
  if(typeof window!=='undefined'&&window.CloudBootPending)return {score,assessed,stable,rows:rs,history};
  if(last&&!last.signature&&last.assessed===assessed&&last.stable===stable&&JSON.stringify(last.scores)===JSON.stringify(scores))last.signature=signature;
  if(!last||signature!==last.signature||Campaign.dateKey(last.at)!==Campaign.dateKey(now)){history.push({at:now,score,assessed,stable,scores,signature});state.roadmap.history=history.slice(-180);}
  return {score,assessed,stable,rows:rs,history:state.roadmap.history};
 }
 return {DAY,dimensions,weights,pending,readingOf,dimensionOf,defaults,clean,rows,order,select,projection,snapshot};
})();
if(typeof module!=='undefined')module.exports=Roadmap;
