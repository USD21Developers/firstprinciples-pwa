function clearEverything() {
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("subscriptionToken");
  sessionStorage.removeItem("accessToken");
}

function redirect() {
  window.location.href = "../login/";
}

async function init() {
  clearEverything();
  redirect();
}

init();