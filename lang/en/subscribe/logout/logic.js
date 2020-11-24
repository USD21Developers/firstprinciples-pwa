function deleteTokens() {
  sessionStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

function redirect() {
  window.location.href = "../";
}

function init() {
  deleteTokens();
  redirect();
}

init();