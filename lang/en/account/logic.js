function askToSubscribe() {
  const pleaseSubscribeEl = document.querySelector("#subscription-status-not-subscribed");
  pleaseSubscribeEl.classList.remove("hide");
}

function showSubscriptionInfo() {
  const lang = getLang() || "en";
  const subscriptionToken = JSON.parse(atob(localStorage.getItem("subscriptionToken").split(".")[1]));
  const expiry = subscriptionToken.exp;
  const now = moment.unix(expiry).utc();
  const lsDateArgs = now.format("YYYY, M, D");
  const lsDateObj = new Date(lsDateArgs);
  const lsExpiry = new Intl.DateTimeFormat(lang, { dateStyle: 'long' }).format(lsDateObj);
  const expiryStatement = phrase(5, false).replace("${expiryDate}", `<strong>${lsExpiry}</strong>`);

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
  const showLink = canAccessAdministration() || false;
  
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