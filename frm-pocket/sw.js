const CACHE='frm-pocket-v7';
const ASSETS=['./','./index.html','./vendor/katex/katex.min.css?v=7','./vendor/katex/katex.min.js?v=7','./math-overrides.js?v=7','./math-text.js?v=7','./styles.css?v=7','./data.js?v=7','./exam.js?v=7','./challenge.js?v=7','./engine.js?v=7','./coach.js?v=7','./app.js?v=7','./syllabus.js?v=7','./checkpoints.js?v=7','./readiness.js?v=7','./upgrade.js?v=7','./coverage-market-credit.js?v=7','./coverage-operational-liquidity.js?v=7','./coverage-investment-current.js?v=7','./coverage-register.js?v=7','./campaign.js?v=7','./exam-prep.js?v=7','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('frm-pocket-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==self.location.origin||!url.pathname.startsWith(new URL(self.registration.scope).pathname))return;
 if(event.request.mode==='navigate'){
  event.respondWith(fetch(event.request).then(response=>{if(!response.ok)throw Error('Navigation unavailable');return response;}).catch(()=>caches.match(new URL('./index.html',self.registration.scope).href)));
 }else if(ASSETS.some(path=>new URL(path,self.registration.scope).href===url.href)){
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
 }
});
