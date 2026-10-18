/* Compile reviewed original learning packs. Never embeds the uploaded reference PDFs. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),dist=fs.existsSync(path.join(root,'public'))?path.join(root,'public'):root;
const topics=['market','credit','operational','liquidity','investment','current'];
const books=topics.map(t=>JSON.parse(fs.readFileSync(path.join(root,'content',t+'-enrichment.json'),'utf8')));
for(const name of fs.readdirSync(path.join(root,'content')).filter(f=>f.endsWith('-supplement.json')).sort()){
 const supplemental=JSON.parse(fs.readFileSync(path.join(root,'content',name),'utf8'));
 for(const q of supplemental.questions){const target=books.find(b=>b.topic===q.topic);if(!target)throw Error('Invalid supplemental topic '+q.topic);target.questions.push(q);}
}
const ctx=vm.createContext({});for(const f of ['data','exam','challenge','syllabus'])vm.runInContext(fs.readFileSync(path.join(dist,f+'.js'),'utf8'),ctx);
const syllabus=vm.runInContext('SYLLABUS',ctx),skills=vm.runInContext('SKILLS',ctx),known=new Map(syllabus.map(r=>[r.id,r]));
const qs=[],guides=[],ids=new Set();
for(const b of books){
 for(const g of b.guides){if(!known.has(g.readingId))throw Error('Unknown reading '+g.readingId);g.topic=known.get(g.readingId).topic;if(g.readingId==='CI-1')g.reviewNote='Le chapitre IMF complet n’était pas accessible lors de la revue. Ce guide et ses cas s’appuient sur les objectifs 2026 et le résumé publié par ses auteurs ; vérifie le chapitre assigné dans ton support officiel.';g.formulas||=[];g.prerequisites=(g.prerequisites||[]).filter(id=>known.has(id)&&id!==g.readingId);guides.push(g);}
 for(const q of b.questions){delete q.objectiveText;const reading=q.objective?.split('.')[0],n=Number(q.objective?.split('.')[1]);if(!known.has(reading)||n<1||n>known.get(reading).count)throw Error('Invalid objective '+q.id);if(!skills.some(s=>s.id===q.skill&&s.topic===q.topic))throw Error('Invalid skill '+q.id+' '+q.skill);if(ids.has(q.id))throw Error('Duplicate ID '+q.id);ids.add(q.id);if(q.choices.length!==4||q.why.length!==4||new Set(q.choices).size!==4||![0,1,2,3].includes(q.answer))throw Error('Invalid choices '+q.id);if(!['understanding','application','critical'].includes(q.dimension))throw Error('Invalid dimension '+q.id);qs.push(q);}
 fs.writeFileSync(path.join(dist,'deep-'+b.topic+'.js'),'/* Reviewed original learning content; source provenance is recorded separately. */\nconst DEEP_'+b.topic.toUpperCase()+'='+JSON.stringify(b,null,1)+';\n');
}
if(guides.length!==syllabus.length||new Set(guides.map(g=>g.readingId)).size!==syllabus.length)throw Error('Every current reading needs one guide');
const registry=`/* Preserve original IDs, storage, answer keys and reserved checkpoint separation. */
const DEEP_BOOKS=[${topics.map(t=>'DEEP_'+t.toUpperCase()).join(',')}];
const CHAPTER_GUIDES=DEEP_BOOKS.flatMap(b=>b.guides.map(g=>({...g,topic:b.topic})));
const DEEP_QUESTIONS=DEEP_BOOKS.flatMap(b=>b.questions);
QUESTIONS.push(...DEEP_QUESTIONS);CARDS.push(...DEEP_QUESTIONS);
const DEEP_REASONING_CARDS=CHAPTER_GUIDES.map(g=>({id:'rc-'+g.readingId,chapter:g.readingId,topic:g.topic,skill:DEEP_QUESTIONS.find(q=>q.objective.split('.')[0]===g.readingId)?.skill,reading:g.readingId,concept:g.title,question:'Explain the mechanism of '+g.title+'. State an assumption, a common trap, and a way to check your conclusion.',cardOnly:true,cardAnswer:g.principles.join(' '),explanation:g.traps.map(t=>t.correction+' Contrôle : '+t.check).join(' '),cue:g.recallPrompts.join(' '),choices:['','','',''],answer:0,tier:'deep',level:4}));
CARDS.push(...DEEP_REASONING_CARDS);
const DEEP_FORMULAS=CHAPTER_GUIDES.flatMap(g=>g.formulas.map(f=>({...f,topic:g.topic,readingId:g.readingId})));
DEEP_FORMULAS.forEach(f=>FORMULAS.push([f.topic,f.name,'\\\\['+f.tex+'\\\\]',f.variables+' Conditions : '+f.assumptions+' Piège : '+f.trap,f]));
DEEP_QUESTIONS.forEach(q=>{if(!OBJECTIVE_LABELS[q.objective])OBJECTIVE_LABELS[q.objective]=q.concept;});
`;
fs.writeFileSync(path.join(dist,'deep-register.js'),registry);
console.log(JSON.stringify({guides:guides.length,newQuestions:qs.length,newCards:guides.length,newFormulaRecords:guides.reduce((n,g)=>n+g.formulas.length,0),bookChapters:books.reduce((n,b)=>n+b.chapters.length,0)}));
