const CACHE='frm-pocket-v9';
const ASSETS=['./sync-boot.js?v=9','./sync-engine.js?v=9','./sync-controller.js?v=9','./sync-ui.js?v=9','./','./index.html','./vendor/katex/katex.min.css?v=9','./vendor/katex/katex.min.js?v=9','./math-overrides.js?v=9','./math-text.js?v=9','./styles.css?v=9','./data.js?v=9','./exam.js?v=9','./challenge.js?v=9','./engine.js?v=9','./coach.js?v=9','./app.js?v=9','./syllabus.js?v=9','./checkpoints.js?v=9','./readiness.js?v=9','./upgrade.js?v=9','./coverage-market-credit.js?v=9','./coverage-operational-liquidity.js?v=9','./coverage-investment-current.js?v=9','./coverage-register.js?v=9','./deep-market.js?v=9','./deep-credit.js?v=9','./deep-operational.js?v=9','./deep-liquidity.js?v=9','./deep-investment.js?v=9','./deep-current.js?v=9','./deep-register.js?v=9','./roadmap-engine.js?v=9','./roadmap-ui.js?v=9','./campaign.js?v=9','./exam-prep.js?v=9','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('frm-pocket-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(url.pathname.startsWith('/api/')||['/signin-with-chatgpt','/signout-with-chatgpt','/callback'].includes(url.pathname))return;
 if(event.request.method!=='GET'||url.origin!==self.location.origin||!url.pathname.startsWith(new URL(self.registration.scope).pathname))return;
 if(event.request.mode==='navigate'){
  event.respondWith(fetch(event.request).then(response=>{if(!response.ok)throw Error('Navigation unavailable');return response;}).catch(()=>caches.match(new URL('./index.html',self.registration.scope).href)));
 }else if(ASSETS.some(path=>new URL(path,self.registration.scope).href===url.href)){
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
 }
});
