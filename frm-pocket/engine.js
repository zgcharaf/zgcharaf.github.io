/* Shared pure revision logic; no DOM or network dependency. */
const Engine = (()=>{
 const DAY=86400000;
 function shuffle(items,rng=Math.random){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
 function schedule(previous,quality,now=Date.now()){
  const p=previous||{streak:0,interval:0,ease:2.5,attempts:0,correct:0};
  const good=quality>0, streak=good?p.streak+1:0;
  const interval=!good?0:quality===1?1:streak===1?1:streak===2?3:Math.max(1,Math.round(p.interval*p.ease));
  return {attempts:p.attempts+1,correct:p.correct+(good?1:0),streak,interval,ease:Math.min(3,Math.max(1.3,p.ease+(quality===2?.1:quality===1?-.1:-.2))),due:now+(good?interval*DAY:10*60000),last:now,lastCorrect:good};
 }
 function pool(questions,progress,{topic='all',mode='mixed',bookmarks=[],now=Date.now()}={}){
  let list=questions.filter(q=>topic==='all'||q.topic===topic);
  if(mode==='errors')list=list.filter(q=>progress[q.id]&&progress[q.id].lastCorrect===false);
  if(mode==='due')list=list.filter(q=>progress[q.id]&&progress[q.id].due<=now);
  if(mode==='saved')list=list.filter(q=>bookmarks.includes(q.id));
  return shuffle(list).sort((a,b)=>priority(a)-priority(b));
  function priority(q){const p=progress[q.id];return !p?1:p.due<=now?0:2;}
 }
 function balanced(questions, quotas, rng=Math.random){const out=[];for(const [topic,n]of Object.entries(quotas)){const choices=shuffle(questions.filter(q=>q.topic===topic),rng);if(choices.length<n)throw Error('Not enough questions for '+topic);out.push(...choices.slice(0,n));}return shuffle(out,rng);}
 function accuracy(progress){const p=Object.values(progress);const n=p.reduce((s,x)=>s+x.attempts,0);return n?Math.round(100*p.reduce((s,x)=>s+x.correct,0)/n):null;}
 return {DAY,shuffle,schedule,pool,accuracy,balanced};
})();
if(typeof module!=='undefined')module.exports=Engine;
