const CACHE='frm-pocket-v8';
const ASSETS=['./','./index.html','./vendor/katex/katex.min.css?v=8','./vendor/katex/katex.min.js?v=8','./math-overrides.js?v=8','./math-text.js?v=8','./styles.css?v=8','./data.js?v=8','./exam.js?v=8','./challenge.js?v=8','./engine.js?v=8','./coach.js?v=8','./app.js?v=8','./syllabus.js?v=8','./checkpoints.js?v=8','./readiness.js?v=8','./upgrade.js?v=8','./coverage-market-credit.js?v=8','./coverage-operational-liquidity.js?v=8','./coverage-investment-current.js?v=8','./coverage-register.js?v=8','./deep-market.js?v=8','./deep-credit.js?v=8','./deep-operational.js?v=8','./deep-liquidity.js?v=8','./deep-investment.js?v=8','./deep-current.js?v=8','./deep-register.js?v=8','./roadmap-engine.js?v=8','./roadmap-ui.js?v=8','./campaign.js?v=8','./exam-prep.js?v=8','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
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
