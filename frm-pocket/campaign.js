/* Exam preparation planner. Targets are user study goals, never GARP pass thresholds. */
const Campaign=(()=>{
 const DAY=86400000,weights={market:.2,credit:.2,operational:.2,liquidity:.15,investment:.15,current:.1};
 const dateKey=(now=Date.now())=>{const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(now));return ['year','month','day'].map(key=>parts.find(p=>p.type===key).value).join('-');};
 const validDate=x=>typeof x==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&Number.isFinite(Date.parse(x))&&new Date(x+'T12:00:00Z').toISOString().slice(0,10)===x;
 const shift=(date,n)=>new Date(Date.parse(date+'T12:00:00Z')+n*DAY).toISOString().slice(0,10);
 const distance=(from,to)=>Math.round((Date.parse(to+'T12:00:00Z')-Date.parse(from+'T12:00:00Z'))/DAY);
 const defaults=()=>({start:dateKey(),weekdayMinutes:90,weekendMinutes:180,targetAccuracy:70,readings:{},done:{},assignments:{},mockResults:[]});
 function clean(raw,readings){const c=defaults(),r=raw&&typeof raw==='object'?raw:{};const known=new Set(readings.map(x=>x.id));
  if(validDate(r.start))c.start=r.start;
  for(const [key,min,max]of [['weekdayMinutes',30,240],['weekendMinutes',30,360],['targetAccuracy',50,95]])if(Number.isFinite(r[key]))c[key]=Math.max(min,Math.min(max,Math.round(r[key])));
  for(const [id,x]of Object.entries(r.readings||{}))if(known.has(id)&&x&&['read','revisit'].includes(x.status))c.readings[id]={status:x.status,at:Math.max(0,Number(x.at)||0),notes:String(x.notes||'').slice(0,2000)};
  for(const [date,x]of Object.entries(r.done||{}))if(validDate(date)&&x&&typeof x==='object')c.done[date]={review:x.review===true,reading:Array.isArray(x.reading)?[...new Set(x.reading.filter(id=>known.has(id)))]:[]};
  for(const [date,ids]of Object.entries(r.assignments||{}))if(validDate(date)&&Array.isArray(ids))c.assignments[date]=[...new Set(ids.filter(id=>known.has(id)))].slice(0,4);
  c.mockResults=Array.isArray(r.mockResults)?r.mockResults.filter(m=>m&&validDate(m.date)&&['official1','official2','provider'].includes(m.paper)&&Number.isInteger(m.score)&&m.score>=0&&m.score<=80&&Number.isFinite(m.minutes)&&m.minutes>0&&m.minutes<=720).slice(-50).map((m,i)=>({id:typeof m.id==='string'?m.id.slice(0,80):'import-'+i,paper:m.paper,date:m.date,score:m.score,total:80,minutes:Math.round(m.minutes),conditions:m.conditions===true,firstAttempt:m.firstAttempt===true,sourceName:String(m.sourceName||'').slice(0,120),notes:String(m.notes||'').slice(0,2000),weakReadings:Array.isArray(m.weakReadings)?[...new Set(m.weakReadings.filter(id=>known.has(id)))]:[]})):[];
  c.mockResults.sort((a,b)=>a.date.localeCompare(b.date));return c;
 }
 function phase(left){return left<0?'finished':left===0?'exam':left<=2?'taper':left<=9?'simulate':left<=23?'consolidate':'cover';}
 function event(date,exam){const d=distance(date,exam);return d===23?'mock':d===16?'official1':d===9?'official2':d===30?'checkpoint':d===3?'block20':null;}
 function calendar(c,exam,today=dateKey()){
  if(!validDate(exam))return [];
  const start=c.start<exam?c.start:today;
  const length=Math.max(0,Math.min(370,distance(start,exam)+1));
  return Array.from({length},(_,i)=>{const date=shift(start,i),left=distance(date,exam),part=phase(left),ev=event(date,exam),weekday=new Date(date+'T12:00:00Z').getUTCDay(),budget=weekday===0||weekday===6?c.weekendMinutes:c.weekdayMinutes;return {date,left,phase:part,event:ev,minutes:part==='exam'?0:part==='taper'?Math.min(30,budget):['mock','official1','official2'].includes(ev)?240:budget,reviewDay:['mock','official1','official2'].includes(event(shift(date,-1),exam)),today:date===today};});
 }
 function pending(p){return !!p&&(p.lastCorrect===false||p.mistakeAt>0||p.lapses>0)&&(p.repairDays?.length||0)<2;}
 function coverage(state,questions,readings){const mapped=new Set(questions.filter(q=>q.objective).map(q=>q.objective)),seen=new Set(questions.filter(q=>q.objective&&state.quiz[q.id]).map(q=>q.objective)),evidence=new Set(questions.filter(q=>q.objective&&state.evidence[q.id]).map(q=>q.objective));const seenReadings=new Set([...seen].map(id=>id.split('.')[0]));return {total:readings.reduce((n,r)=>n+r.count,0),mapped:mapped.size,seen:seen.size,evidence:evidence.size,readingSeen:seenReadings.size,readingTotal:readings.length,readingDeclared:Object.values(state.campaign?.readings||{}).filter(r=>r.status==='read').length};}
 function officialSummary(c,today=dateKey()){
  const eligible=c.mockResults.filter(m=>m.date<=today&&m.paper!=='provider'&&m.firstAttempt&&m.conditions&&m.minutes<=240);
  const firstByPaper=new Map();eligible.forEach(m=>{if(!firstByPaper.has(m.paper))firstByPaper.set(m.paper,m);});const valid=[...firstByPaper.values()];return {count:valid.length,meetTarget:valid.filter(m=>m.score/80*100>=c.targetAccuracy).length,results:valid,average:valid.length?valid.reduce((n,m)=>n+m.score/80,0)/valid.length:null};
 }
 const hash=str=>[...str].reduce((n,c)=>(n*31+c.charCodeAt(0))>>>0,0);
 function select(state,questions,{count=12,phase:part='cover',date=dateKey(),now=Date.now()}={}){
  const eligible=questions.filter(q=>q.tier&&q.tier!=='checkpoint'&&(!state.quiz[q.id]||state.quiz[q.id].due<=now)),seenObjectives=new Set(questions.filter(q=>q.objective&&state.quiz[q.id]).map(q=>q.objective));
  const weakReadings=new Set(state.campaign?.mockResults.filter(m=>m.date<=date).at(-1)?.weakReadings||[]);
  const byTopic=Object.fromEntries(Object.keys(weights).map(id=>[id,[]]));
  for(const q of eligible){const p=state.quiz[q.id],isNew=!p&&!state.cards[q.id]&&!state.exposed[q.id],repair=pending(p);let priority=0;if(repair&&p.wrongConfidence==='high')priority+=12;if(repair)priority+=part==='cover'?7:12;if(isNew)priority+=part==='cover'?5:3;if(q.objective&&!seenObjectives.has(q.objective))priority+=part==='cover'?9:4;if(p&&p.due<=now)priority+=3;if(q.tier==='coverage')priority+=1;if(weakReadings.has(q.objective?.split('.')[0]))priority+=9;byTopic[q.topic]?.push({q,priority,tie:hash(date+q.id)});}
  for(const xs of Object.values(byTopic))xs.sort((a,b)=>b.priority-a.priority||a.tie-b.tie);
  const selected=[],counts={},objectiveCounts={};while(selected.length<count){let best=null;for(const [topic,xs]of Object.entries(byTopic)){const candidate=xs[0];if(!candidate)continue;const priority=candidate.priority-(counts[topic]||0)/weights[topic]*1.4-(objectiveCounts[candidate.q.objective]||0)*3;if(!best||priority>best.priority)best={topic,...candidate,priority};}if(!best)break;selected.push(best.q);counts[best.topic]=(counts[best.topic]||0)+1;objectiveCounts[best.q.objective]=(objectiveCounts[best.q.objective]||0)+1;byTopic[best.topic].shift();}return selected;
 }
 function readingQueue(state,questions,readings,{count=2,date=dateKey(),now=Date.now()}={}){
  const seen=new Set(questions.filter(q=>q.objective&&state.quiz[q.id]).map(q=>q.objective.split('.')[0]));const latest=state.campaign.mockResults.filter(m=>m.date<=date).at(-1),weak=new Set(latest?.weakReadings||[]);
  const offset=distance(state.campaign.start,date);
  return readings.map((r,i)=>{const progress=state.campaign.readings[r.id],errors=questions.filter(q=>q.objective?.split('.')[0]===r.id&&pending(state.quiz[q.id])).length;const cycle=(i-Math.max(0,offset)*2+readings.length*100)%readings.length;return {...r,priority:(weak.has(r.id)?20:0)+(errors?12:0)+(!seen.has(r.id)?6:0)+(progress?.status==='revisit'?8:!progress?5:0)-(progress?.status==='read'&&now-progress.at<7*DAY&&!weak.has(r.id)&&!errors?30:0),cycle};}).sort((a,b)=>b.priority-a.priority||a.cycle-b.cycle).slice(0,count);
 }
 function day(state,questions,readings,{date=dateKey(),now=Date.now()}={}){
  const left=distance(date,state.exam),part=phase(left),entry=calendar(state.campaign,state.exam,date).find(x=>x.date===date)||{date,left,phase:part,event:event(date,state.exam),minutes:part==='exam'||part==='finished'?0:30};
  const fresh=questions.filter(q=>q.tier&&q.tier!=='checkpoint'&&!state.quiz[q.id]&&!state.cards[q.id]&&!state.exposed[q.id]).length;
  const questionCount=entry.event?0:part==='taper'?5:part==='exam'||part==='finished'?0:Math.max(5,Math.min(25,Math.floor(entry.minutes*.45/3)));
  const queue=select(state,questions,{count:questionCount,phase:part,date,now});const unread=readings.filter(r=>state.campaign.readings[r.id]?.status!=='read').length;const readingCount=part==='taper'?1:Math.min(4,Math.max(2,Math.ceil(unread/Math.max(1,left-3))));const readingsToReview=state.campaign.assignments[date]?state.campaign.assignments[date].map(id=>readings.find(r=>r.id===id)).filter(Boolean):readingQueue(state,questions,readings,{count:readingCount,date,now});
  const due=questions.filter(q=>pending(state.quiz[q.id])&&state.quiz[q.id].due<=now),high=due.filter(q=>state.quiz[q.id].wrongConfidence==='high');const sessions=state.history.filter(h=>dateKey(h.date)===date&&h.type==='quiz'),completed=sessions.reduce((n,h)=>n+h.total,0);
  return {...entry,queue,readings:readingsToReview,due:due.length,high:high.length,fresh,questionCount,completed,done:state.campaign.done[date]||{reading:[],review:false}};
 }
 function gates(state,questions,readings,{now=Date.now()}={}){const today=dateKey(now),cv=coverage(state,questions,readings),official=officialSummary(state.campaign,today),unresolved=questions.filter(q=>pending(state.quiz[q.id])),high=unresolved.filter(q=>state.quiz[q.id].wrongConfidence==='high');const domains=Object.keys(weights).map(topic=>({topic,n:questions.filter(q=>q.topic===topic&&state.evidence[q.id]&&now-state.evidence[q.id].at<=42*DAY).length}));return {coverage:cv,official,domains,unresolved:unresolved.length,high:high.length,checks:[{id:'domains',ok:domains.every(d=>d.n>=8),label:'Au moins 8 réponses inédites par domaine',detail:domains.filter(d=>d.n>=8).length+'/6 domaines'},{id:'readings',ok:cv.readingSeen===cv.readingTotal,label:'Chaque lecture explorée par une question',detail:cv.readingSeen+'/'+cv.readingTotal+' lectures ; ce n’est pas une maîtrise complète'},{id:'errors',ok:high.length===0,label:'Aucune erreur avec certitude encore ouverte',detail:high.length+' erreur(s) à consolider'},{id:'official',ok:official.count>=2&&official.meetTarget>=2,label:'Deux mocks GARP inédits en 4 h au-dessus de mon objectif',detail:official.meetTarget+'/2 à '+state.campaign.targetAccuracy+' % ; résultats déclarés, objectif personnel'}]};}
 return {DAY,weights,dateKey,validDate,shift,distance,defaults,clean,phase,event,calendar,coverage,officialSummary,select,readingQueue,day,gates};
})();
if(typeof module!=='undefined')module.exports=Campaign;
