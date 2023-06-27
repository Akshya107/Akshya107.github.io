'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "12481ed665e76f12267e9aff8cb08c2c",
"index.html": "4f37150caa4ded2fa41dad59fb493684",
"/": "4f37150caa4ded2fa41dad59fb493684",
"main.dart.js": "a9d74fcfee74787dbe8df5a03f983d21",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "4d0c4cbb65d1db8fba0ba6231840391b",
"assets/AssetManifest.json": "24d64e3ec895d7ec6de3e78ac8aac76d",
"assets/NOTICES": "86d625b13cc6de099716e56b2086f7f5",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/assets/images/Yes.svg": "b8230da698907cc7c760602962125f32",
"assets/assets/images/loss.svg": "76db5d7795e2e10694113d2f344fc784",
"assets/assets/images/Eth.svg": "dfbd5155694ab36a5db4ccf00ecd2d0b",
"assets/assets/images/Lthm.svg": "ff5726d6b5e2ecc3a036ceac482f1fef",
"assets/assets/images/bitwoarrow.svg": "0594c26f18399d9e9fb3e22c3a5a8a11",
"assets/assets/images/creditCard.svg": "58b1c15c01fe10e4251e739c09cf5e44",
"assets/assets/images/Binance.svg": "1a1257ffa3fbe9bc8e83b828fc1954af",
"assets/assets/images/down.svg": "a3346ec3c095d57f69651f07324efd61",
"assets/assets/images/up.svg": "32c85faa6283030ca8b81eaedcbb4c73",
"assets/assets/images/marketGraph.svg": "0df1b48186677ecc711409dfa15d23a7",
"assets/assets/images/creditCard.png": "c6539a73afeb0011bee265720749abbb",
"assets/assets/images/No.svg": "a4b3ed55a9a8c962c0177ad51b4a84d1",
"assets/assets/images/user.png": "d1c8c315ad9872812e4b240632e691ff",
"assets/assets/images/balanceGraph.svg": "4de23c801c9279bde5b091998ba08657",
"assets/assets/images/plus.svg": "0f510398e043756d59bd2f188449553c",
"assets/assets/images/growthGraph.svg": "b8230da698907cc7c760602962125f32",
"assets/assets/images/profit.svg": "db768ded781c0b3a7d50ecfa6b8629a6",
"assets/assets/images/Bit_Coin.svg": "bdce6bb0d7296c9fb5115e253090a89c",
"assets/assets/images/lossGraph.svg": "a4b3ed55a9a8c962c0177ad51b4a84d1",
"assets/assets/images/bidirectional.svg": "bf42bce53403f17399a4eba9964f5b1d",
"assets/assets/logo/logo.png": "8a91208e23cd848a77748c633f8744e7",
"assets/assets/icons/search.svg": "a466fa127bba4ab596a2952833801b6a",
"assets/assets/icons/safe.svg": "8ff97eca4e9efea98a56350f2c82149e",
"assets/assets/icons/library.svg": "5d7781e09b62c6db90e33da66d1e7fb0",
"assets/assets/icons/drawer.svg": "9121c12926796db9b834d6e88b396232",
"assets/assets/icons/settings.svg": "5d14392249cd8f44cfdef79ac6db651f",
"assets/assets/icons/bell.svg": "bae98cf1331be17fb8c62a03f0fb4fe4",
"assets/assets/icons/dashboard.svg": "d949a6deb18eb41ac33b227684e8fed0",
"assets/assets/icons/exchange.svg": "ea5f0ee951f4164c89b6d8fa967d371d",
"assets/assets/icons/team.svg": "202244a295e7277c34119bc74d62c291",
"assets/assets/icons/payouts.svg": "3932fa462c21e1687227982bc5249b74",
"assets/assets/icons/admin.svg": "fa1c14ed271d8bfc4d993b61366d8d9e",
"assets/assets/icons/schedules.svg": "e8868554218f6ba19c60701a37960de8",
"assets/assets/icons/Icons.svg": "4213f7a241ce3549f2e04ea128a31a87",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
