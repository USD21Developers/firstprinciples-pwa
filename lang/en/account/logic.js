function askToSubscribe() {
  const pleaseSubscribeEl = document.querySelector("#subscription-status-not-subscribed");
  pleaseSubscribeEl.classList.remove("hide");
}

function showSubscriptionInfo() {
  const lang = getLang() || "en";
  const subscriptionToken = JSON.parse(atob(localStorage.getItem("subscriptionToken").split(".")[1]));
  const expiry = subscriptionToken.exp;
  const dateArgs = moment.unix(expiry).utc().format("YYYY, M, D");
  const dateObj = new Date(dateArgs);
  const expiryLS = new Intl.DateTimeFormat(lang, { dateStyle: 'long' }).format(dateObj);
  const subscribeduntil = moment(subscriptionToken.subscribeduntil).utc();
  const daysRemaining = Math.abs(moment().utc().diff(subscribeduntil, "days"));
  const expiryStatement = phrase(5, false).replace("${expiryDate}", `<strong>${expiryLS}</strong>`).replace("${daysRemaining}", daysRemaining);

  document.querySelector("[data-expiry-statement]").innerHTML = expiryStatement;
  document.querySelector("#subscription-status-subscribed").classList.remove("hide");
}

function checkSubscription() {
  if (!isSubscriptionActive()) {
    askToSubscribe();
  } else {
    showSubscriptionInfo();
  }
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
  const accessToken = await getAccessToken() || "";
  const endpoint = `${getAPIHost()}/fp/begin-subscription`;
  const productName = phrase(13, false);
  const productSku = phrase(14, false);
  const productDescription = phrase(15, false);
  const subscribeButtonEl = document.querySelector("#subscribeButton");
  const subscribeButtonSpinnerEl = document.querySelector("#subscribeButtonSpinner");

  subscribeButtonEl.setAttribute("disabled", true);
  subscribeButtonSpinnerEl.classList.remove("hide");

  if (!accessToken.length) {
    return window.location.href = "./logout/";
  }

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

function toggleAdminLink() {
  const adminLink = document.querySelector("#adminlink");
  const usertype = JSON.parse(atob(localStorage.getItem("refreshToken").split(".")[1])).usertype || "user";
  const may = JSON.parse(atob(localStorage.getItem("refreshToken").split(".")[1])).may || [];
  let showLink = false;
  
  if (usertype === "sysadmin") showLink = true;
  if (may.includes("create coupons")) showLink = true;
  if (may.includes("create preauthorized users")) showLink = true;

  if (showLink) adminLink.classList.remove("hide");
}

async function init() {
  await showPhrases();
  toggleSpinner();
  ifJustRegistered();
  checkSubscription();
  toggleAdminLink();
  attachEventListeners();
}

init();