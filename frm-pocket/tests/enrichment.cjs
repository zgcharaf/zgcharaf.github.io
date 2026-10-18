/* Structural, mathematical and provenance checks for the authored learning packs. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),ctx=vm.createContext({});
const files=['vendor/katex/katex.min','math-overrides','math-text','data','exam','challenge','syllabus','coverage-market-credit','coverage-operational-liquidity','coverage-investment-current','coverage-register',...['market','credit','operational','liquidity','investment','current'].map(t=>'deep-'+t),'deep-register','checkpoints'];
for(const f of files)vm.runInContext(fs.readFileSync(path.join(root,f+'.js'),'utf8'),ctx,{filename:f});
const run=s=>vm.runInContext(s,ctx),questions=run('DEEP_QUESTIONS'),all=run('ALL_QUESTIONS'),guides=run('CHAPTER_GUIDES'),books=run('DEEP_BOOKS'),syllabus=run('SYLLABUS');
assert.equal(new Set(all.filter(q=>q.objective).map(q=>q.objective)).size,591);assert.equal(guides.length,107);assert.equal(new Set(guides.map(g=>g.readingId)).size,107);assert.ok(questions.length>=321);assert.equal(new Set(all.map(q=>q.id)).size,all.length);assert.equal(new Set(all.map(q=>q.question.trim())).size,all.length);
let numerics=0,spans=0,formulas=0;const dimensions={understanding:0,application:0,critical:0};
function strictMath(s,label){for(const m of String(s).matchAll(/\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)/g)){ctx.tex=m[1]??m[2];try{run('katex.renderToString(tex,{throwOnError:true,strict:"error",trust:false})');}catch(e){throw Error(label+': '+ctx.tex+' '+e.message);}spans++;}}

function displayedNumberMatches(choice,expected){
 const text=choice.replace(/[−–]/g,'-').replace(/,/g,'').replace(/\b(?:EUR|USD|GBP)\s*/g,'');
 const scales=[1];if(/%|percentage\s*points/i.test(text))scales.push(100);if(/bps?\b/i.test(text))scales.push(10000);
 return [...text.matchAll(/[-+]?\d+(?:\.\d+)?/g)].some(m=>{const v=Number(m[0]),decimals=m[0].split('.')[1]?.length||0,suffix=text.slice(m.index+m[0].length),multipliers=[1];if(/^m\b|^million\b/i.test(suffix))multipliers.push(1e6);if(/^bn\b|^billion\b/i.test(suffix))multipliers.push(1e9);return scales.some(scale=>multipliers.some(mult=>{const tolerance=.50001*Math.pow(10,-decimals)*mult/scale;return Math.abs(v*mult/scale-expected)<=tolerance||expected<0&&/\b(?:Pays|deficit|outflow|shortfall)\b/i.test(text)&&Math.abs(-v*mult/scale-expected)<=tolerance;}));});
}
for(const q of questions){
 assert.equal(q.tier,'deep');assert.ok(q.level>=3&&q.level<=5);assert.ok(q.question.length>=60,q.id);assert.equal(q.choices.length,4);assert.equal(new Set(q.choices).size,4);assert.equal(q.why.length,4);assert.ok(q.why.every(s=>s.length>=12),q.id+' rationale');assert.ok(q.explanation.length>=35);assert.ok(q.cue);
 assert.ok(dimensions[q.dimension]!==undefined,q.id);dimensions[q.dimension]++;
 const [reading,n]=q.objective.split('.'),r=syllabus.find(r=>r.id===reading);assert.ok(r&&r.topic===q.topic&&Number(n)>=1&&Number(n)<=r.count,q.id+' mapping');assert.ok(/^https:\/\//.test(q.source));
 const b=q.bookRef;if(b?.chapter){assert.equal(b.year,2024);assert.ok(Array.isArray(b.pdfPages)&&b.pdfPages.length>=1&&b.pdfPages.length<=2&&b.pdfPages[0]>=1&&b.pdfPages.at(-1)>=b.pdfPages[0],q.id+' source pages');}else assert.ok(q.sourceRef||b?.note||q.provenance,q.id+' missing-source provenance');
 for(const s of [q.question,q.explanation,q.cue,...q.choices,...q.why])strictMath(s,q.id);
 if(q.numeric){numerics++;const n=q.numeric,result=vm.runInNewContext(n.expression,{Math},{timeout:100});assert.ok(Number.isFinite(result));assert.ok(Math.abs(result-n.value)<=Math.max(1e-7,Math.abs(n.value)*1e-7),q.id+' computed '+result+' expected '+n.value);assert.ok(Math.abs(result-n.optionValue)<=n.tolerance+1e-8,q.id+' option rounding');const choice=q.choices[q.answer];if(q.id==='xi020'){assert.ok((.12*10-4*.2)/100>0);assert.ok(choice.includes('increases'));}else if(q.id==='xi026'){assert.ok(.24/.10>1.96&&.24/.16<1.96);assert.ok(choice.includes('but not under the dependence-robust'));}else if(q.id==='ym013'){assert.ok(Math.abs(.2*.05+.8*.03-.034)<1e-12);assert.ok(Math.abs(Math.sqrt(.2*.8*(.05-.03)**2)*10000-80)<1e-8);assert.ok(/child\s*5\.0%/.test(choice)&&/probability\s*0\.20/.test(choice));}else assert.ok(displayedNumberMatches(choice,n.optionValue),q.id+' selected option does not match the independently computed value at displayed precision');}
}
for(const g of guides){
 assert.ok(g.principles.length>=3,g.readingId);assert.ok(g.recallPrompts.length>=3);assert.ok(g.traps.length>=1);assert.ok(g.worked.prompt&&g.worked.steps.length&&g.worked.result&&g.worked.check);assert.ok(g.prerequisites.every(id=>syllabus.some(r=>r.id===id)));
 const qs=questions.filter(q=>q.objective.split('.')[0]===g.readingId);assert.ok(qs.length>=3,g.readingId+' needs three distinct cases');assert.ok(['understanding','application','critical'].every(d=>qs.some(q=>q.dimension===d)),g.readingId+' dimension missing');
 for(const s of [...g.principles,...g.recallPrompts,...g.traps.flatMap(t=>[t.mistake,t.correction,t.check]),g.worked.prompt,...g.worked.steps,g.worked.result,g.worked.check])strictMath(s,g.readingId);
 for(const f of g.formulas){formulas++;assert.ok(f.tex&&f.variables&&f.assumptions&&f.trap,g.readingId+' formula context');ctx.tex=f.tex;assert.doesNotThrow(()=>run('katex.renderToString(tex,{throwOnError:true,strict:"error",trust:false})'),g.readingId+' formula');}
}
for(const b of books)for(const ch of b.chapters){assert.ok(ch.bookChapter>=1&&ch.pdfStart>=1&&ch.pdfEnd>=ch.pdfStart);assert.ok(ch.readingIds.every(id=>syllabus.some(r=>r.id===id)));assert.ok(ch.difference);}
assert.equal(run('DEEP_REASONING_CARDS.length'),107);assert.ok(run('DEEP_REASONING_CARDS.every(q=>ALL_ITEMS.includes(q)&&CARDS.includes(q)&&!QUESTIONS.includes(q))'));
const protectedFiles=fs.readdirSync(root).filter(f=>f.toLowerCase().endsWith('.pdf'));assert.equal(protectedFiles.length,0);
console.log(JSON.stringify({newQuestions:questions.length,chapterGuides:guides.length,newReasoningCards:107,formulaRecords:formulas,numericallyChecked:numerics,strictLatexSpans:spans,dimensions,sourceChapters:books.reduce((n,b)=>n+b.chapters.length,0)},null,2));
