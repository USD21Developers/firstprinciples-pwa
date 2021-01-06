function deleteTokens() {
  sessionStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

function redirect() {
  window.location.href = "../login/";
}

function init() {
  checkIfOffline();
  deleteTokens();
  redirect();
}

init();