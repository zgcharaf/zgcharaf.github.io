const CACHE='frm-pocket-v4';
const ASSETS=['./','./index.html','./styles.css?v=4','./data.js?v=4','./exam.js?v=4','./challenge.js?v=4','./engine.js?v=4','./coach.js?v=4','./app.js?v=4','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
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
