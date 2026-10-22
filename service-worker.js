'use strict';
// v1.9: versioned app assets avoid mixed old/new releases in installed PWAs.
// Only public app files are cached. Student quiz responses and private bookmarks remain outside the worker.
const CACHE_NAME='tai2me-v1-15-0';
const STATIC_FILES=[
  './', './index.html', './styles.css?v=1.15.0', './app.js?v=1.15.0',
  './manifest.webmanifest', './assets/icon-192.png', './assets/icon-512.png'
];
const STATIC_URLS=new Set(STATIC_FILES.map(p=>new URL(p,self.registration.scope).href));
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME)
    .then(cache=>cache.addAll(STATIC_FILES))
    .then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(
    keys.filter(k=>k.startsWith('tai2me-')&&k!==CACHE_NAME).map(k=>caches.delete(k))
  )).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin)return;
  if(req.mode==='navigate'){
    event.respondWith(fetch(req,{cache:'no-store'}).catch(()=>caches.match('./index.html')));
    return;
  }
  if(!STATIC_URLS.has(url.href))return;
  event.respondWith(fetch(req,{cache:'no-store'}).then(res=>{
    if(res.ok){
      const copy=res.clone();
      event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.put(req,copy)));
    }
    return res;
  }).catch(()=>caches.match(req)));
});
