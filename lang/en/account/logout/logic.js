function deleteTokens() {
  sessionStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("subscriptionToken");
}

function redirect() {
  window.location.href = "../login/";
}

function init() {
  deleteTokens();
  redirect();
}

init();