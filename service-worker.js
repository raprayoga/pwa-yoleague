const CACHE_NAME = "yoLeague";
var urlsToCache = [
  "/",
  "asset/Rokkitt-SemiBold.ttf",
  "css/materialize.min.css",
  "css/style.css",
  "img/icons/icon-72x72.png",
  "img/icons/icon-96x96.png",
  "img/icons/icon-128x128.png",
  "img/icons/icon-144x144.png",
  "img/icons/icon-152x152.png",
  "img/icons/icon-192x192.png",
  "img/icons/icon-512x512.png",
  "img/illustration/undraw_charts_jj6t.svg",
  "img/illustration/undraw_opened_tabs_ly11.svg",
  "img/illustration/undraw_team_ih79.svg",
  "img/logo/logo1.png",
  "img/logo/logo2.png",
  "img/support/champions-league.png",
  "img/support/dicoding.png",
  "img/support/football-data.jpg",
  "img/cloud.svg",
  "img/Confetti-Doodles.svg",
  "img/Profil.jpeg",
  "img/squad.svg",
  "js/jquery.js",
  "js/loadTeam.js",
  "js/loadTeamDetail.js",
  "js/materialize.min.js",
  "js/script.js",
  "js/sWRegister.js",
  "pages/favorite.html",
  "pages/home.html",
  "pages/match.html",
  "pages/team.html",
  "favicon.ico",
  "index.html",
  "manifest.json",
  
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});


self.addEventListener("fetch", function(event) {
  var base_url = "https://api.football-data.org/v2/";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function(response) {
        return response || fetch (event.request);
    })
    )
  }
});


self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});