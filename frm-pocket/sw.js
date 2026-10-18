const CACHE='frm-pocket-v9.1';
const ASSETS=['./sync-boot.js?v=9.1','./sync-engine.js?v=9.1','./sync-controller.js?v=9.1','./sync-ui.js?v=9.1','./','./index.html','./vendor/katex/katex.min.css?v=9.1','./vendor/katex/katex.min.js?v=9.1','./math-overrides.js?v=9.1','./math-text.js?v=9.1','./styles.css?v=9.1','./data.js?v=9.1','./exam.js?v=9.1','./challenge.js?v=9.1','./engine.js?v=9.1','./coach.js?v=9.1','./app.js?v=9.1','./syllabus.js?v=9.1','./checkpoints.js?v=9.1','./readiness.js?v=9.1','./upgrade.js?v=9.1','./coverage-market-credit.js?v=9.1','./coverage-operational-liquidity.js?v=9.1','./coverage-investment-current.js?v=9.1','./coverage-register.js?v=9.1','./deep-market.js?v=9.1','./deep-credit.js?v=9.1','./deep-operational.js?v=9.1','./deep-liquidity.js?v=9.1','./deep-investment.js?v=9.1','./deep-current.js?v=9.1','./deep-register.js?v=9.1','./roadmap-engine.js?v=9.1','./roadmap-ui.js?v=9.1','./campaign.js?v=9.1','./exam-prep.js?v=9.1','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
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
