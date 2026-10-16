/* Local, transparent learning heuristics. Not a predictor of exam results. */
const Coach=(()=>{
 const pending=p=>!!p&&((p.mistakeAt>0||p.lastCorrect===false||p.lapses>0)&&(!Array.isArray(p.repairDays)||p.repairDays.length<2));
 function annotate(previous,correct,{now,day,confidence=null,choice=null}={}){
  const p=previous||{},failureAt=Number(p.mistakeAt)||(p.lastCorrect===false?Number(p.last)||now:0);
  let days=Array.isArray(p.repairDays)?[...p.repairDays]:[];
  if(!correct)days=[];
  else if(pending(p)&&failureAt>0&&now-failureAt>=600000&&!days.includes(day))days.push(day);
  return {firstCorrect:previous?(typeof p.firstCorrect==='boolean'?p.firstCorrect:null):correct,firstAt:previous?Number(p.firstAt)||null:now,lapses:(Number(p.lapses)||0)+(correct?0:1),mistakeAt:correct?failureAt:now,repairDays:days.slice(-2),lastConfidence:confidence,wrongConfidence:correct?(p.wrongConfidence||null):confidence,lastWrongChoice:correct?(p.lastWrongChoice??null):choice};
 }
 function summary(questions,progress,skills){return skills.map(skill=>{
  const qs=questions.filter(q=>q.skill===skill.id),seen=qs.filter(q=>progress[q.id]),known=seen.filter(q=>typeof progress[q.id].firstCorrect==='boolean'),firstRight=known.filter(q=>progress[q.id].firstCorrect).length;
  const unresolved=seen.filter(q=>pending(progress[q.id])).length,confidentWrong=seen.filter(q=>pending(progress[q.id])&&progress[q.id].wrongConfidence==='high').length;
  const firstAccuracy=known.length?firstRight/known.length:null,weak=unresolved>0||(known.length>=3&&firstAccuracy<.7);
  const evidence=known.length>=3?'sampled':seen.length?'limited':'unassessed';
  return {...skill,total:qs.length,seen:seen.length,firstCount:known.length,firstRight,firstAccuracy,unresolved,confidentWrong,weak,evidence,priority:unresolved*3+confidentWrong*4+(known.length>=3?(1-firstAccuracy)*3:0)};
 });}
 function select(questions,progress,skills,{count=10,skill=null,diagnostic=false,evidence=questions,now=Date.now(),rng=Math.random}={}){
  const rows=summary(evidence,progress,skills),map=Object.fromEntries(rows.map(r=>[r.id,r]));
  const eligible=questions.filter(q=>(!skill||q.skill===skill)&&(!progress[q.id]||progress[q.id].due<=now));
  const shuffled=questions.length?shuffle(eligible,rng):[],out=[],usedTopics={},usedSkills={};
  while(out.length<count&&shuffled.length){
   let best=0,score=Infinity;
   for(let i=0;i<shuffled.length;i++){const q=shuffled[i],p=progress[q.id],r=map[q.skill];let base;
    if(diagnostic)base=p?12:0;
    else base=p&&pending(p)?0:!p&&r?.weak?1:!p?4:7;
    const s=base-(q.tier==='challenge'?.25:0)+(usedTopics[q.topic]||0)*(diagnostic?5:1.5)+(usedSkills[q.skill]||0)*4;
    if(s<score){score=s;best=i;}
   }
   const q=shuffled.splice(best,1)[0];out.push(q);usedTopics[q.topic]=(usedTopics[q.topic]||0)+1;usedSkills[q.skill]=(usedSkills[q.skill]||0)+1;
  }
  return out;
 }
 function shuffle(items,rng){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
 return {pending,annotate,summary,select};
})();
if(typeof module!=='undefined')module.exports=Coach;
