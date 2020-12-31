function askToSubscribe(data) {
  const pleaseSubscribeEl = document.querySelector("#subscription-status-not-subscribed");
  pleaseSubscribeEl.classList.remove("hide");
}

function showSubscriptionInfo(data) {
  const lang = getLang() || "en";
  const dateArgs = moment(data.expiry).format("YYYY, M, D");
  const dateObj = new Date(dateArgs);
  const expiryLS = new Intl.DateTimeFormat(lang, { dateStyle: 'long' }).format(dateObj);
  const daysRemaining = data.daysRemaining;
  const expiryStatement = phrase(5, false).replace("${expiryDate}", `<strong>${expiryLS}</strong>`).replace("${daysRemaining}", daysRemaining);

  document.querySelector("[data-expiry-statement]").innerHTML = expiryStatement;
  document.querySelector("#subscription-status-subscribed").classList.remove("hide");
}

async function checkSubscription() {
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
    });
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

  fetch(endpoint, {
    mode: "cors",
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.error(err);
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