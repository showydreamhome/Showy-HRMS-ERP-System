const CACHE_NAME = "showy-hrms-v1";

const urlsToCache = [

"/Showy-HRMS-ERP-System/",
"/Showy-HRMS-ERP-System/index.html",
"/Showy-HRMS-ERP-System/dashboard.html",
"/Showy-HRMS-ERP-System/css/style.css",
"/Showy-HRMS-ERP-System/assets/logo.png"

];

self.addEventListener("install", event => {

event.waitUntil(

caches.open(CACHE_NAME)
.then(cache => {

return cache.addAll(urlsToCache);

})

);

});

self.addEventListener("fetch", event => {

event.respondWith(

caches.match(event.request)
.then(response => {

return response || fetch(event.request);

})

);

});