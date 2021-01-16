function clearEverything() {
  caches.keys().then(function (cacheNames) {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("subscriptionToken");
    sessionStorage.removeItem("accessToken");
    return Promise.all(
      cacheNames
        .filter(function (cacheName) {
          return true;
        })
        .map(function (cacheName) {
          return caches.delete(cacheName);
        })
    );
  });
}

function redirect() {
  window.location.href = "../login/";
}

async function init() {
  await clearEverything();
  redirect();
}

init();