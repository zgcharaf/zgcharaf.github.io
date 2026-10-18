/* Safe, local mathematical typography. Original bank strings and answer keys stay unchanged. */
const MathText=(()=>{
 'use strict';
 const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const greek={α:'alpha',β:'beta',γ:'gamma',δ:'delta',ε:'varepsilon',ζ:'zeta',η:'eta',θ:'theta',κ:'kappa',λ:'lambda',μ:'mu',ν:'nu',ξ:'xi',π:'pi',ρ:'rho',σ:'sigma',τ:'tau',φ:'phi',χ:'chi',ψ:'psi',ω:'omega',Γ:'Gamma',Δ:'Delta',Θ:'Theta',Λ:'Lambda',Ξ:'Xi',Π:'Pi',Σ:'Sigma',Φ:'Phi',Ψ:'Psi',Ω:'Omega'};
 const names={alpha:'\\alpha',beta:'\\beta',gamma:'\\gamma',delta:'\\delta',theta:'\\theta',lambda:'\\lambda',mu:'\\mu',xi:'\\xi',rho:'\\rho',sigma:'\\sigma',phi:'\\phi',omega:'\\omega',VaR:'\\operatorname{VaR}',ES:'\\operatorname{ES}',Cov:'\\operatorname{Cov}',cov:'\\operatorname{Cov}',Var:'\\operatorname{Var}',var:'\\operatorname{Var}',corr:'\\operatorname{Corr}',ln:'\\ln',log:'\\log',exp:'\\exp',min:'\\min',max:'\\max',sqrt:'\\sqrt',abs:'\\operatorname{abs}',Pr:'\\Pr',P:'P',E:'\\mathbb{E}',Rp:'R_p',Rb:'R_b',Rf:'R_f',Rm:'R_m',Dmod:'D_{\\mathrm{mod}}',DA:'D_A',DL:'D_L',ET:'E_T',VT:'V_T',zalpha:'z_{\\alpha}',M2:'M^2'};
 const words=new Set(('VaR ES CVaR CVA DVA BCVA UCVA UDVA EL UL PD LGD EAD EPE ENE EE PFE DF CCF CSA HQLA ASF RSF LCR NSFR RSA RSL NII EVE IR SR IC BR TC TE DD LR PV FV RAROC RWA BIC BI LC ILM RC EC IM VM NAV IRR TWR MWR DPI RVPI TVPI PME DV01 CS01 BPV M2 PIT PDcum PDcond PDat ybar bar N A B C D E F G H I J K L M O P Q R S T U V W X Y Z').split(' '));
 const supers={'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','⁻':'-','⁺':'+'};
 const subs={'₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9','ₜ':'t','ᵢ':'i','ⱼ':'j'};
 const functions=new Set(['sqrt','exp','ln','log','min','max','Cov','cov','Var','var','corr','abs','P','Pr','E','N','S','f','g','Φ','φ','σ']);
 const known=id=>id.length===1&&/[A-Za-zα-ωΑ-Ω]/.test(id)||/^[A-Za-zα-ωΑ-Ω][0-9]+$/.test(id)||words.has(id)||id in names||/^[α-ωΑ-Ω]/.test(id)||/^[A-Za-z]+_/.test(id)||/^(?:VaR|ES|PD|EE|DF|RC|z|r|R|w|V|D|P|σ|μ)[α-ωᵢ₀-₉]/.test(id);
 const subTex=s=>s.split(',').map(x=>x.replace(/[α-ωΑ-Ω]/g,c=>'\\'+(greek[c]||c)+' ').replace(/[−–]/g,'-').replace(/[A-Za-z]{2,}/g,w=>'\\mathrm{'+w+'}')).join(',');
 function identifier(id){
  if(names[id])return names[id];
  const indexed=id.match(/^([A-Za-zα-ωΑ-Ω])(\d+)$/);if(indexed)return identifier(indexed[1]).trim()+'_{'+indexed[2]+'}';
  const u=id.indexOf('_');if(u>=0)return identifier(id.slice(0,u))+'_{'+subTex(id.slice(u+1))+'}';
  const tail=id.match(/[₀-₉ₜᵢⱼ]+$/);if(tail)return identifier(id.slice(0,-tail[0].length))+'_{'+[...tail[0]].map(c=>subs[c]).join('')+'}';
  if(/^[α-ωΑ-Ω][A-Za-z]+$/.test(id)){const [first,...rest]=id,tail=rest.join('');return ['L','p','FX','asset','quanto','foreign'].includes(tail)?'\\'+greek[first]+'_{'+subTex(tail)+'}':'\\'+greek[first]+'\\,'+tail;}
  const suffix=id.match(/^(VaR|ES|PD|EE|DF|RC|z)([α-ωΑ-Ω])$/);if(suffix)return identifier(suffix[1])+'_{\\'+greek[suffix[2]]+'}';
  return [...id].map(c=>greek[c]?'\\'+greek[c]+' ':c).join('').replace(/^[A-Z]{2,}\d*$/,s=>'\\mathrm{'+s+'}');
 }
 function tokenAt(s,pos){
  const rest=s.slice(pos),space=rest.match(/^\s*/)[0].length;pos+=space;const str=s.slice(pos);let m;
  if(!str)return null;
  if((m=str.match(/^(?:EUR|USD|GBP)\s*[−-]?\d+(?:[.,]\d+)?\s*(?:bn|m|billion|million)?\b/))){const unit=m[0].match(/^(EUR|USD|GBP)\s*([−-]?\d+(?:[.,]\d+)?)\s*(.*)$/);return {kind:'atom',tex:'\\mathrm{'+unit[1]+'}\\,'+unit[2].replace('−','-').replace(',','{,}')+(unit[3]?'\\,\\mathrm{'+unit[3]+'}':''),start:pos,end:pos+m[0].length,mark:false};}
  if((m=str.match(/^(?:(?:\d{1,3}(?:[ \u00a0\u202f]\d{3})+|\d+)(?:[.,]\d+)?|\.\d+)(?:[eE][+−-]?\d+)?(?:\s*%|\s*bps?\b)?/))){return {kind:'atom',tex:m[0].replace(',','{,}').replace(/[ \u00a0\u202f](?=\d)/g,'\\,').replace(/%/g,'\\%').replace(/\s*(bps?)$/,'\\,\\mathrm{$1}').replace(/−/g,'-'),start:pos,end:pos+m[0].length,mark:false};}
  if((m=str.match(/^[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]+/)))return {kind:'super',tex:[...m[0]].map(c=>supers[c]).join(''),start:pos,end:pos+m[0].length,mark:true};
  if((m=str.match(/^[A-Za-zα-ωΑ-Ω]+[0-9]*(?:[₀-₉ₜᵢⱼ]+|_(?:[A-Za-z0-9]+(?:,[A-Za-z0-9]+(?:[−-]\d+)?)?))?/))&&known(m[0]))return {kind:'atom',id:m[0],tex:identifier(m[0]),start:pos,end:pos+m[0].length,mark:/[α-ωΑ-Ω₀-₉ₜᵢⱼ_]/.test(m[0])};
  if((m=str.match(/^[=≈≃<>≤≥+−–×·÷/*^()\[\]|√∂]/))){let ch=m[0];if(ch==='–'||ch==='−')ch='-';return {kind:ch,tex:ch,start:pos,end:pos+1,mark:!['(',')','[',']'].includes(ch)};}
  if(str[0]==='-')return {kind:'-',tex:'-',start:pos,end:pos+1,mark:true};
  return null;
 }
 // A small expression parser preserves precedence when turning division into stacked fractions.
 function parseAt(s,start){
  let position=start,operations=0,marked=false,terms=0,depth=0;
  const peek=()=>tokenAt(s,position);
  const take=()=>{const t=peek();if(t){position=t.end;marked||=t.mark;}return t;};
  const node=(tex,extra={})=>({tex,...extra});
  function atom(){if(++depth>28)throw Error('deep');let t=peek();if(!t)throw Error('atom');let out;
   if(t.kind==='-'||t.kind==='+'){take();const child=atom();out=node(t.kind+child.tex);operations++;}
   else if(t.kind==='√'){take();out=node('\\sqrt{'+atom().tex+'}');operations++;}
   else if(t.kind==='('||t.kind==='['){take();const closing=t.kind==='('?')':']',inner=relation();if(peek()?.kind!==closing)throw Error('group');take();out=node((closing===')'?'\\left(':'\\left[')+inner.tex+(closing===')'?'\\right)':'\\right]'),{inner:inner.tex,group:true});}
   else if(t.kind==='atom'){take();out=node(t.tex,{id:t.id});terms++;
    if(t.id&&['P','Pr','E'].includes(t.id)&&['(','['].includes(peek()?.kind)){const begin=peek(),close=begin.kind==='('?')':']';let end=begin.start+1,level=1;while(end<s.length&&level){if(s[end]===begin.kind)level++;if(s[end]===close)level--;end++;}const inside=s.slice(begin.start+1,end-1);if(level===0&&/[A-Za-z]{2,}/.test(inside)&&!parseAt(s,begin.start)){position=end;out=node(t.tex+(close===')'?'\\left(':'\\left[')+inside.split('|').map(part=>'\\text{'+part.trim().replace(/[{}%$#&_]/g,c=>'\\'+c)+'}').join('\\mid ')+(close===')'?'\\right)':'\\right]'));operations++;marked=true;depth--;return out;}}
    if(t.id&&functions.has(t.id)&&['(','['].includes(peek()?.kind)){const group=atom();out=node(t.id==='sqrt'?'\\sqrt{'+(group.inner||group.tex)+'}':t.tex+group.tex);operations++;}
   }else throw Error('atom');
   let next=peek();if(next?.kind==='super'){take();out=node('{'+out.tex+'}^{'+next.tex+'}');operations++;}
   else if(next?.kind==='^'){take();const exponent=atom();out=node('{'+out.tex+'}^{'+(exponent.group?exponent.inner:exponent.tex)+'}');operations++;}
   depth--;return out;
  }
  function product(){let left=atom();while(true){const t=peek();if(t&&['×','·','*','/','÷'].includes(t.kind)){take();const right=atom();left=node(t.kind==='/'||t.kind==='÷'?'\\frac{'+(left.group?left.inner:left.tex)+'}{'+(right.group?right.inner:right.tex)+'}':left.tex+'\\times '+right.tex);operations++;}else if(t&&(!(t.kind==='atom')||t.start===position)&&(t.kind==='atom'||t.kind==='('||t.kind==='['||t.kind==='√')){const right=atom();left=node(left.tex+'\\,'+right.tex);operations++;}else break;}return left;}
  function sum(){let left=product();while(peek()&&['+','-'].includes(peek().kind)){const op=take().kind,right=product();left=node(left.tex+op+right.tex);operations++;}return left;}
  function relation(){let left=sum();while(peek()&&['=','≈','≃','<','>','≤','≥','|'].includes(peek().kind)){const op=take().kind,right=sum();left=node(left.tex+({'≈':'\\approx ','≃':'\\simeq ','≤':'\\le ','≥':'\\ge ','|':'\\mid '}[op]||op)+right.tex);operations++;}return left;}
  try{const result=relation();return {start,end:position,tex:result.tex,worth:marked||operations>0&&terms>1};}catch{return null;}
 }
 const rendered=new Map(),failures=[];let engine=null;
 function getEngine(){return engine||(typeof katex!=='undefined'?katex:typeof module!=='undefined'&&module.exports?require('./vendor/katex/katex.min.js'):null);}
 function equation(tex,display=false,source=tex){const key=(display?'D':'I')+tex;if(rendered.has(key))return rendered.get(key);let html;try{const renderer=getEngine();if(!renderer)return escape(source);const body=renderer.renderToString(tex,{displayMode:display,output:'htmlAndMathml',throwOnError:true,strict:'ignore',trust:false,maxExpand:500,maxSize:12,macros:{}});html='<span class="math-'+(display?'display':'inline')+'" data-math="true">'+body+'</span>';}catch(error){failures.push({tex,error:String(error)});html='<span class="math-fallback">'+escape(source)+'</span>';}
  if(rendered.size>=800)rendered.delete(rendered.keys().next().value);rendered.set(key,html);return html;
 }
 function spans(text){const s=String(text??''),out=[];let plain=0,i=0;while(i<s.length){const date=s.slice(i).match(/^\d{4}-\d{2}-\d{2}\b/);if(date){i+=date[0].length;continue;}if(i&&/[\p{L}\p{N}_’']/u.test(s[i-1])){i++;continue;}if(!/[A-Za-z0-9α-ωΑ-Ω(\[√∂−-]/.test(s[i])){i++;continue;}const p=parseAt(s,i);if(p?.worth&&p.end>i&&!(p.end<s.length&&/[\p{L}_’']/u.test(s[p.end]))){if(i>plain)out.push({text:s.slice(plain,i)});out.push({tex:p.tex,text:s.slice(i,p.end)});plain=p.end;i=p.end;}else i++;}if(plain<s.length)out.push({text:s.slice(plain)});return out;}
 function html(value,{display=false,auto=true}={}){const original=String(value??''),overrides=typeof MATH_OVERRIDES!=='undefined'?MATH_OVERRIDES:{},text=overrides[original]||original;const pattern=/\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)|\$\$([\s\S]*?)\$\$/g;let result='',last=0,match;const plain=s=>auto?spans(s).map(p=>p.tex?equation(p.tex,display,p.text):escape(p.text)).join(''):escape(s);
  while((match=pattern.exec(text))){result+=plain(text.slice(last,match.index));result+=equation(match[1]??match[2]??match[3],match[1]!==undefined||match[3]!==undefined,match[0]);last=pattern.lastIndex;}result+=plain(text.slice(last));return result;
 }
 function updatePreview(textarea){const preview=textarea.nextElementSibling;if(!preview?.classList?.contains('math-editor-preview'))return;const body=html(textarea.value);preview.hidden=!body.includes('data-math');preview.innerHTML='<span class="micro">Aperçu mathématique</span><div>'+body+'</div>';}
 function previewEditors(root){if(!root?.querySelectorAll||typeof document==='undefined')return;for(const textarea of root.querySelectorAll('textarea.notearea')){if(!textarea.nextElementSibling?.classList?.contains('math-editor-preview')){const preview=document.createElement('div');preview.className='math-editor-preview';textarea.insertAdjacentElement('afterend',preview);}updatePreview(textarea);}}
 return {html,equation,spans,identifier,failures,previewEditors,updatePreview,setEngine:value=>{engine=value;rendered.clear();},escape};
})();
if(typeof module!=='undefined')module.exports=MathText;
