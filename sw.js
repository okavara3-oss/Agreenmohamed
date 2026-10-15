const C='agreen-v2',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const store=r=>{if(r&&(r.ok||r.type==='opaque')){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c))}return r};
 if(e.request.mode==='navigate'||/index\.html$/.test(e.request.url)){
  e.respondWith(fetch(e.request).then(store).catch(()=>caches.match(e.request).then(m=>m||caches.match('index.html'))));return}
 e.respondWith(caches.match(e.request).then(m=>m||fetch(e.request).then(store)));
});
