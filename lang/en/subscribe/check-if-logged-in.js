(() => {
  const refreshToken = localStorage.getItem("refreshToken") || "";
  const accessToken = sessionStorage.getItem("accessToken") || "";

  function getLang() {
    const lang = window.location.pathname.substring(6, 8);
    return lang;
  }

  async function refreshTokens() {
    return new Promise((resolve, reject) => {
      // TODO:  call API to refresh tokens
      resolve();
    })
  }

  if (!refreshToken.length) {
    const lang = getLang();
    const redirectUrl = `/lang/${lang}/subscribe/logout/`;
    console.log(`No refresh token found.  Redirecting...`);
    // return window.location.href = redirectUrl;
  }

  if (!accessToken) {
    refreshTokens();
  }
})();