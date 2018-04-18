this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/',
        'static/fonts/kowai.otf',
        'static/img/goal.jpeg',
        'static/img/scare.jpeg',
        'static/img/zombie.jpg',
        'static/js/index.js',
        'static/js/type-text.js',
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    // キャッシュの存在チェック
    caches.match(event.request)
      .then(function(response) {
        console.log(response);
        if (response) {
          return response;
        } else {
          return fetch(event.request)
        }
      })
  );
});
