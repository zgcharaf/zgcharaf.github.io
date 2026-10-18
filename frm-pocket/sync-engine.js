/* Generated from lib/sync-engine.mjs. */
(function(root){'use strict';
/* Three-way progress merge. Local sessions are deliberately device-owned. */
const clone = value => value === undefined ? undefined : JSON.parse(JSON.stringify(value));
const object = x => x !== null && typeof x === 'object' && !Array.isArray(x);
const stable = x => JSON.stringify(x, function (_k, v) {
  return object(v) ? Object.fromEntries(Object.keys(v).sort().map(k => [k, v[k]])) : v;
});
const equal = (a, b) => stable(a) === stable(b);
const unsafe = k => ['__proto__', 'prototype', 'constructor'].includes(k);
const number = x => Number.isFinite(x) ? x : 0;
const limits = {log:2000,history:100,readinessHistory:1000,assessments:100,'roadmap.history':180,'campaign.mockResults':50};
const listKey = (path, x) => path === 'campaign.mockResults' ? x.id : stable(x);
function union(path, a, b) {
  const map = new Map();
  for (const x of [...(a || []), ...(b || [])]) map.set(listKey(path, x), clone(x));
  const xs = [...map.values()];
  xs.sort((a,b) => number(a?.at ?? a?.date) - number(b?.at ?? b?.date) || stable(a).localeCompare(stable(b)));
  if (path === 'campaign.mockResults') xs.sort((a,b) => String(a.date).localeCompare(String(b.date)) || String(a.id).localeCompare(String(b.id)));
  return xs.slice(-(limits[path] || 2000));
}
function mergeSet(base, local, remote) {
  const out = new Set(remote || []), b = new Set(base || []), l = new Set(local || []);
  for (const id of b) if (!l.has(id)) out.delete(id);
  for (const id of l) if (!b.has(id)) out.add(id);
  return [...out].sort();
}
function mergeProgress(base, local, remote, {seed = false} = {}) {
  base ||= {}; local ||= {}; remote ||= {};
  const conflicts = [];
  function merge(b,l,r,path) {
    if (path === 'session') return null;
    if (path === 'version') return 1;
    if (path === 'days' || path === 'quiz' || path === 'cards') return mergeObject(b,l,r,path);
    if (/^days\.[^.]+$/.test(path)) return seed ? Math.max(number(l),number(r)) : number(r) + Math.max(0,number(l)-number(b));
    if (/^(quiz|cards)\.[^.]+$/.test(path)) return progressRow(b,l,r,path);
    if (/^evidence\.[^.]+$/.test(path)) {
      if(equal(l,b))return clone(r);
      if (!l) return clone(r); if (!r) return clone(l);
      return clone(l.at < r.at ? l : r.at < l.at ? r : {...l,correct:l.correct && r.correct,timed:l.timed && r.timed});
    }
    if (/^retention\.[^.]+$/.test(path)) return clone(!l ? r : !r ? l : l.at > r.at ? l : r);
    if (/^exposed\.[^.]+$/.test(path) || path === 'backupAt') return Math.max(number(l),number(r));
    if (path === 'campaign.start') return [l,r].filter(x=>typeof x==='string').sort()[0];
    if (limits[path]) {
      if (path === 'campaign.mockResults') {
        const key = xs => Object.fromEntries((xs || []).map(x=>[x.id,x]));
        return Object.values(mergeObject(key(b),key(l),key(r),path)).filter(Boolean).sort((a,b)=>a.date.localeCompare(b.date)).slice(-50);
      }
      return union(path,l,r);
    }
    if (path === 'bookmarks' || /^campaign\.done\.[^.]+\.reading$/.test(path)) return mergeSet(b,l,r);
    if (equal(l,b)) return clone(r);
    if (equal(r,b) || equal(l,r)) return clone(l);
    if (object(l) && object(r)) return mergeObject(b,l,r,path);
    if ((/^notes\./.test(path) || /\.(notes|reflection|text)$/.test(path)) && typeof l === 'string' && typeof r === 'string') {
      conflicts.push({path,local:l,remote:r});
    }
    // Independent field edits survive. For the same scalar field, the last sync wins.
    return clone(l);
  }
  function mergeObject(b,l,r,path) {
    const out = {};
    for (const key of new Set([...Object.keys(b || {}),...Object.keys(l || {}),...Object.keys(r || {})])) {
      if (unsafe(key)) continue;
      const value = merge(b?.[key],l?.[key],r?.[key],path ? path+'.'+key : key);
      if (value !== undefined) out[key] = value;
    }
    return out;
  }
  function progressRow(b,l,r,path) {
    if (!l) return clone(r); if (!r) return clone(l);
    const latest = number(l.last) > number(r.last) ? l : r;
    const first = [l,r].filter(x=>number(x.firstAt)>0).sort((a,b)=>a.firstAt-b.firstAt)[0];
    const wrong = number(l.mistakeAt) > number(r.mistakeAt) ? l : r;
    const out = clone(latest);
    for (const key of ['attempts','correct','lapses']) {
      out[key] = seed ? Math.max(number(l[key]),number(r[key])) : number(r[key]) + Math.max(0,number(l[key])-number(b?.[key]));
    }
    out.correct = Math.min(out.attempts,out.correct);
    if (first) {out.firstAt=first.firstAt;out.firstCorrect=first.firstCorrect;}
    if([l,r].some(p=>number(p.attempts)>0&&!(number(p.firstAt)>0))){out.firstAt=null;out.firstCorrect=null;}
    if (wrong) {out.mistakeAt=number(wrong.mistakeAt);out.wrongConfidence=wrong.wrongConfidence??null;out.lastWrongChoice=wrong.lastWrongChoice??null;}
    const sameMistake = number(l.mistakeAt) === number(r.mistakeAt);
    out.repairDays = sameMistake ? [...new Set([...(l.repairDays || []),...(r.repairDays || [])])].sort().slice(-2) : clone(wrong.repairDays || []);
    return out;
  }
  const state = mergeObject(base,local,remote,'');
  state.version = 1; state.session = null;
  // Older exports can overlap. Count identifiable distinct logged answers, never sum unknown legacy snapshots.
  if (seed) for (const kind of ['quiz','cards']) {
    const grouped = {};
    for (const x of state.log || []) if (x.kind === kind) (grouped[x.id] ||= []).push(x);
    for (const [id,xs] of Object.entries(grouped)) if (state[kind]?.[id]) {
      const p=state[kind][id];p.attempts=Math.max(p.attempts,xs.length);p.correct=Math.max(p.correct,xs.filter(x=>x.correct).length);
    }
  }
  if(seed){
    // A legacy snapshot with prior practice and no fresh-evidence record cannot establish an unseen answer.
    for(const id of Object.keys(state.evidence||{}))if([local,remote].some(s=>!s.evidence?.[id]&&(s.quiz?.[id]||s.cards?.[id]||s.exposed?.[id])))delete state.evidence[id];
    const logged={};for(const x of state.log||[])if(Number.isFinite(x.at)){
      const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(x.at));
      const key=['year','month','day'].map(p=>parts.find(x=>x.type===p).value).join('-');logged[key]=(logged[key]||0)+1;
    }
    for(const [key,n]of Object.entries(logged))state.days[key]=Math.max(number(state.days[key]),n);
  }
  return {state,conflicts};
}
function cloudState(state) {
  const out=clone(state);out.session=null;delete out._cloudCommit;
  for (const h of out.roadmap?.history || []) delete h.signature;
  return out;
}
function sanitizeState(input) {
  if (!object(input) || input.version !== 1) throw Error('invalid_state');
  const keys=new Set(['version','exam','goal','quiz','cards','bookmarks','notes','days','history','mistakes','log','exposed','evidence','retention','readinessHistory','lessons','assessments','backupAt','campaign','roadmap','session']);
  let entries=0;
  function clean(x,depth=0) {
    if (++entries>150000 || depth>16) throw Error('state_too_complex');
    if (x===null || typeof x==='boolean') return x;
    if (typeof x==='number' && Number.isFinite(x) && Math.abs(x)<=1e16) return x;
    if (typeof x==='string' && x.length<=5000) return x;
    if (Array.isArray(x) && x.length<=5000) return x.map(v=>clean(v,depth+1));
    if (object(x)) return Object.fromEntries(Object.entries(x).filter(([k])=>!unsafe(k)).map(([k,v])=>[k,clean(v,depth+1)]));
    throw Error('invalid_value');
  }
  const out={};for (const [key,value] of Object.entries(input)) if(keys.has(key)) out[key]=clean(value);
  out.session=null;
  if (typeof out.exam!=='string' || !/^\d{4}-\d{2}-\d{2}$/.test(out.exam) || !Number.isFinite(out.goal) || out.goal<1 || out.goal>100) throw Error('invalid_settings');
  for (const field of ['quiz','cards','days','notes','evidence','retention','exposed']) if(!object(out[field])) throw Error('invalid_field');
  for(const kind of ['quiz','cards']) for(const p of Object.values(out[kind])) if(!object(p)||!Number.isFinite(p.attempts)||p.attempts<0||!Number.isFinite(p.correct)||p.correct<0||p.correct>p.attempts||!Number.isFinite(p.due)) throw Error('invalid_progress');
  return cloudState(out);
}



root.SyncEngine={clone,stable,equal,mergeProgress,cloudState,sanitizeState};
})(globalThis);
