function getAPIHost(forceRemote = false) {
  const local = "http://localhost:4000";
  const remote = "https://api.usd21.org";
  const host = window.location.hostname === "localhost" ? local : remote;
  return forceRemote ? remote : host;
}

function getLangFromPath() {
  const lang = window.location.pathname.substring(6, 8) || "en";
  return lang;
}

function enforceLogin() {
  const refreshToken = localStorage.getItem("refreshToken") || "";
  if (! refreshToken.length) return window.location.href = `/lang/${getLangFromPath()}/account/login/`;
}

function getAccessToken() {
  let needToRefresh = false;
  const accessToken = sessionStorage.getItem("accessToken") || "";
  const now = Date.now().valueOf() / 1000;
  let expiry = now;
  try {
    expiry = JSON.parse(atob(accessToken.split(".")[1])).exp;
    if (expiry < now) needToRefresh = true;
  } catch (err) {
    needToRefresh = true;
  }
  return new Promise((resolve, reject) => {
    if (!needToRefresh) return resolve(accessToken);
    const refreshToken = localStorage.getItem("refreshToken") || "";
    if (!refreshToken.length) return reject("refresh token missing");

    const endpoint = `${getAPIHost()}/refresh-token`;

    fetch(endpoint, {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        switch (data.msg) {
          case "tokens renewed":
            const { accessToken, refreshToken } = data;
            localStorage.setItem("refreshToken", refreshToken);
            sessionStorage.setItem("accessToken", accessToken);
            resolve(accessToken);
            break;
          default:
            window.location.href = `/lang/${getLangFromPath()}/account/logout/`;
            break;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

function enforceSubscription() {
  const refreshToken = JSON.parse(atob(localStorage.getItem("refreshToken").split(".")[1]));
  const now = Date.now().valueOf() / 1000;
  const expiry = refreshToken.fpexp || now;
  const subscriptionExpired = (expiry <= now);

  if (subscriptionExpired) {
    return window.location.href = `/lang/${getLangFromPath()}/account/`;
  };
}

enforceLogin();