const CACHE='frm-pocket-v6';
const ASSETS=['./','./index.html','./styles.css?v=6','./data.js?v=6','./exam.js?v=6','./challenge.js?v=6','./engine.js?v=6','./coach.js?v=6','./app.js?v=6','./syllabus.js?v=6','./checkpoints.js?v=6','./readiness.js?v=6','./upgrade.js?v=6','./coverage-market-credit.js?v=6','./coverage-operational-liquidity.js?v=6','./coverage-investment-current.js?v=6','./coverage-register.js?v=6','./campaign.js?v=6','./exam-prep.js?v=6','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
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
