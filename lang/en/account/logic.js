function askToSubscribe() {
  const pleaseSubscribeEl = document.querySelector("#subscription-status-not-subscribed");
  pleaseSubscribeEl.classList.remove("hide");
}

function showSubscriptionInfo() {
  const lang = getLang() || "en";
  const expiry = JSON.parse(atob(localStorage.getItem("subscriptionToken").split(".")[1])).exp;
  const dateArgs = moment.unix(expiry).utc().format("YYYY, M, D");
  const dateObj = new Date(dateArgs);
  const expiryLS = new Intl.DateTimeFormat(lang, { dateStyle: 'long' }).format(dateObj);
  const daysRemaining = data.daysRemaining;
  const expiryStatement = phrase(5, false).replace("${expiryDate}", `<strong>${expiryLS}</strong>`).replace("${daysRemaining}", daysRemaining);

  document.querySelector("[data-expiry-statement]").innerHTML = expiryStatement;
  document.querySelector("#subscription-status-subscribed").classList.remove("hide");
}

async function checkSubscription() {
  let isSubscriptionActive = false;
  isSubscriptionActive = isSubscriptionActive() || false;
  if (!isSubscriptionActive) {
    askToSubscribe(data);
  } else {
    showSubscriptionInfo(data);
  }

  /* 
  const accessToken = await getAccessToken();
  const endpoint = `${getHost()}/fp/check-subscription`;
  const timeZone = moment.tz.guess();

  fetch(endpoint, {
    mode: "cors",
    method: "POST",
    body: JSON.stringify({
      timeZone: timeZone
    }),
    headers: new Headers({
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`
    })
  })
    .then(res => res.json())
    .then(data => {
      switch(data.msg) {
        case "user is not subscribed":
          askToSubscribe(data);
          break;
        case "user is subscribed":
          showSubscriptionInfo(data);
          break;
      }
    })
    .catch(err => {
      console.error(err);
    }); */
}

function ifJustRegistered() {
  const justRegisteredEl = document.querySelector("#just-registered");
  const justRegistered = sessionStorage.getItem("justRegistered") || "";

  if (justRegistered.length > 0) {
    justRegisteredEl.classList.remove("hide");
  }
}

async function onSubscribeClicked(e) {
  e.preventDefault();
  const accessToken = await getAccessToken();
  const endpoint = `${getAPIHost()}/fp/begin-subscription`;
  const productName = phrase(13, false);
  const productSku = phrase(14, false);
  const productDescription = phrase(15, false);
  const subscribeButtonEl = document.querySelector("#subscribeButton");
  const subscribeButtonSpinnerEl = document.querySelector("#subscribeButtonSpinner");

  subscribeButtonEl.setAttribute("disabled", true);
  subscribeButtonSpinnerEl.classList.remove("hide");

  fetch(endpoint, {
    mode: "cors",
    method: "POST",
    body: JSON.stringify({
      productName: productName,
      productSku: productSku,
      productDescription: productDescription,
      lang: getLang()
    }),
    headers: new Headers({
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`
    })
  })
    .then(res => res.json())
    .then(data => {
      switch(data.msg) {
        case "paypal payment created":
          const { paypalURL } = data;
          window.location.href = paypalURL;
          break;
        default:
          showError(17, 16);
      }
      
    })
    .catch(err => {
      console.error(err);
      subscribeButtonEl.removeAttribute("disabled", true);
      subscribeButtonSpinnerEl.classList.add("hide");
    });
}

function toggleSpinner() {
  const content = document.querySelector("main");
  const spinner = document.querySelector("#spinner");

  hideSpinner(content, spinner);
}

function attachEventListeners() {
  document.querySelector("#subscribeButton").addEventListener("click", onSubscribeClicked);
}

async function init() {
  await showPhrases();
  toggleSpinner();
  ifJustRegistered();
  checkSubscription();
  attachEventListeners();
}

init();