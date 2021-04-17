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
            const country = JSON.parse(atob(accessToken.split(".")[1])).country || "us";
            setCountry(country);
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

function setCountry(country) {
  localStorage.setItem("country", country);
}

async function getPermissions() {
  const accessToken = await getAccessToken();
  const claims = JSON.parse(atob(accessToken.split(".")[1]));
  const permissions = [];

  if (claims.may_redeem_coupons) permissions.push("redeem coupons");
  if (claims.may_create_coupons) permissions.push("create coupons");
  if (claims.may_create_preauthorized_users) permissions.push("create preauthorized users");

  return permissions;
}

async function isSysadmin() {
  const accessToken = await getAccessToken();
  const claims = JSON.parse(atob(accessToken.split(".")[1]));
  const usertype = claims.usertype || "user";
  return (usertype === "sysadmin") ? true : false;
}

async function canCreateCoupons() {
  let hasPermission = false;
  const permissions = await getPermissions();
  const sysadmin = await isSysadmin();

  if (sysadmin) hasPermission = true;
  if (permissions.includes("create coupons")) hasPermission = true;

  return hasPermission;
}

async function canCreatePreauthorizedUsers() {
  let hasPermission = false;
  const permissions = await getPermissions();
  const sysadmin = await isSysadmin() || false;

  if (sysadmin) hasPermission = true;
  if (permissions.includes("create preauthorized users")) hasPermission = true;

  return hasPermission;
}

async function canAccessAdministration() {
  let canAccess = false;

  if (await isSysadmin()) canAccess = true;
  if (await canCreateCoupons()) canAccess = true;
  if (await canCreatePreauthorizedUsers()) canAccess = true;

  return canAccess;
}

function verifyRefreshToken() {
  const logoutUrl = `/lang/${getLang()}/account/logout/`;
  const refreshToken = localStorage.getItem("refreshToken") || "";
  const isAuthorized = refreshToken.length;
  if (!isAuthorized) window.location.href = logoutUrl;
}

function framebuster() {
  let hostname = "";
  let pathname = "/";
  try {
    hostname = window.parent.location.hostname;
    pathname = window.parent.location.pathname;
  } catch(err) {
    console.error(err);
  }
  const validHostNames = ["localhost", "staging.firstprinciples.mobi", "firstprinciples.mobi"];

  if (! validHostNames.includes(hostname)) {
    const newURL = `https://firstprinciples.mobi${pathname}`
    window.parent.location.href = newURL;
  }
}

framebuster();
verifyRefreshToken();
