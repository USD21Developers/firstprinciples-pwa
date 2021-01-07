function getAPIHost(forceRemote = false) {
  const local = "http://localhost:4000";
  const remote = "https://api.usd21.org";
  const host = window.location.hostname === "localhost" ? local : remote;
  return forceRemote ? remote : host;
}

function getLang() {
  const lang = window.location.pathname.substring(6, 8);
  return lang;
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

    const endpoint = `${getAPIHost()}/fp/refresh-token`;

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
        const logoutUrl = `/lang/${getLang()}/account/logout/`;
        switch (data.msg) {
          case "tokens renewed":
            const { accessToken, refreshToken } = data;
            localStorage.setItem("refreshToken", refreshToken);
            sessionStorage.setItem("accessToken", accessToken);
            resolve(accessToken);
            break;
          default:
            window.location.href = logoutUrl;
            break;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

function getPermissions() {
  return JSON.parse(atob(localStorage.getItem("refreshToken").split(".")[1])).may || [];
}

function isSysadmin() {
  const usertype = JSON.parse(atob(localStorage.getItem("refreshToken").split(".")[1])).usertype || "user";
  return (usertype === "sysadmin") ? true : false;
}

function canCreateCoupons() {
  let hasPermission = false;
  const permissions = getPermissions();
  const sysadmin = isSysadmin();

  if (sysadmin) hasPermission = true;
  if (permissions.includes("create coupons")) hasPermission = true;

  return hasPermission;
}

function canCreatePreauthorizedUsers() {
  let hasPermission = false;
  const permissions = getPermissions();
  const sysadmin = isSysadmin();

  if (sysadmin) hasPermission = true;
  if (permissions.includes("create preauthorized users")) hasPermission = true;

  return hasPermission;
}

function canAccessAdministration() {
  let canAccess = false;

  if (isSysadmin()) canAccess = true;
  if (canCreateCoupons()) canAccess = true;
  if (canCreatePreauthorizedUsers()) canAccess = true;

  return canAccess;
}

function verifyRefreshToken() {
  const logoutUrl = `/lang/${getLang()}/account/logout/`;
  const refreshToken = localStorage.getItem("refreshToken") || "";
  const isAuthorized = refreshToken.length;
  if (!isAuthorized) window.location.href = logoutUrl;
}

verifyRefreshToken();
