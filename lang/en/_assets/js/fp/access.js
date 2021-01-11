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

function isSubscriptionActiveInDb() {
  const numMinutes = 1; // Check subscription as often as this
  const timeInterval = 1000 * 60 * numMinutes;
  const endpoint = `${getAPIHost()}/fp/check-subscription`;
  const logoutUrl = `/lang/${getLangFromPath()}/account/logout/`;
  const subscriptionToken = localStorage.getItem("subscriptionToken") || "";
  const isSubscribed = subscriptionToken.length || false;

  setInterval(async () => {
    if (!navigator.onLine) return;
    if (!isSubscribed) return;
    const accessToken = await getAccessToken();
    const controller = new AbortController();

    console.info("Checking subscription...");
    fetch(endpoint, {
      mode: "cors",
      method: "POST",
      signal: controller.signal,
      timeout: timeInterval,
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`
      })
    })
      .then(res => res.json())
      .then(data => {
        switch(data.msg) {
          case "user is not authorized for this action":
            window.location.href = logoutUrl;
            break;
          case "user is not subscribed":
            console.error("Subscription is no longer active. Deleting subscription token...");
            localStorage.removeItem("subscriptionToken");
            break;
          case "user is subscribed":
            console.info("User is still subscribed.");
            break;
          default:
            console.error("Unable to check database to verify subscription");
            break;
        }
      })
      .catch(err => {
        console.error(err);
      })
  }, timeInterval);
}

function isSubscriptionActive() {
  const subscriptionToken = localStorage.getItem("subscriptionToken") || "";

  if (!subscriptionToken.length) return false;

  const expiry = parseInt(JSON.parse(atob(subscriptionToken.split(".")[1])).exp) || 0;
  const now = moment().utc().unix();
  const isSubscribed = (expiry > now) || false;

  isSubscriptionActiveInDb();

  return isSubscribed;
}

function enforceSubscription() {
  const isSubscribed = isSubscriptionActive();
  const accountPage = `/lang/${getLangFromPath()}/account/`;

  if (!isSubscribed) {
    console.error(`Not subscribed. Redirecting to account page...`);
    return window.location.href = accountPage;
  };
}