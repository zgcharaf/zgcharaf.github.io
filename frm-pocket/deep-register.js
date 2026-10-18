/* Preserve original IDs, storage, answer keys and reserved checkpoint separation. */
const DEEP_BOOKS=[DEEP_MARKET,DEEP_CREDIT,DEEP_OPERATIONAL,DEEP_LIQUIDITY,DEEP_INVESTMENT,DEEP_CURRENT];
const CHAPTER_GUIDES=DEEP_BOOKS.flatMap(b=>b.guides.map(g=>({...g,topic:b.topic})));
const DEEP_QUESTIONS=DEEP_BOOKS.flatMap(b=>b.questions);
QUESTIONS.push(...DEEP_QUESTIONS);CARDS.push(...DEEP_QUESTIONS);
const DEEP_REASONING_CARDS=CHAPTER_GUIDES.map(g=>({id:'rc-'+g.readingId,chapter:g.readingId,topic:g.topic,skill:DEEP_QUESTIONS.find(q=>q.objective.split('.')[0]===g.readingId)?.skill,reading:g.readingId,concept:g.title,question:'Explain the mechanism of '+g.title+'. State an assumption, a common trap, and a way to check your conclusion.',cardOnly:true,cardAnswer:g.principles.join(' '),explanation:g.traps.map(t=>t.correction+' Contrôle : '+t.check).join(' '),cue:g.recallPrompts.join(' '),choices:['','','',''],answer:0,tier:'deep',level:4}));
CARDS.push(...DEEP_REASONING_CARDS);
const DEEP_FORMULAS=CHAPTER_GUIDES.flatMap(g=>g.formulas.map(f=>({...f,topic:g.topic,readingId:g.readingId})));
DEEP_FORMULAS.forEach(f=>FORMULAS.push([f.topic,f.name,'\\['+f.tex+'\\]',f.variables+' Conditions : '+f.assumptions+' Piège : '+f.trap,f]));
DEEP_QUESTIONS.forEach(q=>{if(!OBJECTIVE_LABELS[q.objective])OBJECTIVE_LABELS[q.objective]=q.concept;});
