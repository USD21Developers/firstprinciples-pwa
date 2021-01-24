function askToSubscribe() {
  const pleaseSubscribeEl = document.querySelector("#subscription-status-not-subscribed");
  pleaseSubscribeEl.classList.remove("hide");
}

async function showSubscriptionInfo() {
  const subscriptionToken = JSON.parse(atob(localStorage.getItem("subscriptionToken").split(".")[1]));
  const accessToken = await getAccessToken();
  const country = JSON.parse(atob(accessToken.split(".")[1])).country || "us";
  const expiry = moment.unix(subscriptionToken.exp).format("YYYY/MM/DD");
  const lsExpiry = new Intl.DateTimeFormat(country, { dateStyle: "long" }).format(new Date(expiry));
  const expiryStatement = phrase(5, false).replace("${expiryDate}", `<strong class="nowrap">${lsExpiry}</strong>`);

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

function disableSubmitButton() {
  const subscribeButtonEl = document.querySelector("#subscribeButton");
  const subscribeButtonSpinnerEl = document.querySelector("#subscribeButtonSpinner");
  subscribeButtonEl.setAttribute("disabled", true);
  subscribeButtonSpinnerEl.classList.remove("hide");
}

function enableSubmitButton() {
  const subscribeButtonEl = document.querySelector("#subscribeButton");
  const subscribeButtonSpinnerEl = document.querySelector("#subscribeButtonSpinner");
  subscribeButtonEl.removeAttribute("disabled");
  subscribeButtonSpinnerEl.classList.add("hide");
}

async function onSubmit(e) {
  e.preventDefault();
  const accessToken = await getAccessToken() || "";
  const endpoint = `${getAPIHost()}/fp/begin-subscription`;
  const productName = phrase(13, false);
  const productSku = phrase(14, false);
  const productDescription = phrase(15, false);
  const couponCode = document.querySelector("#couponcode").value.trim() || "";
  const appName = phrase(1, false) || "First Principles";

  disableSubmitButton();

  if (!accessToken.length) {
    return window.location.href = "./logout/";
  }

  fetch(endpoint, {
    mode: "cors",
    method: "POST",
    body: JSON.stringify({
      couponCode: couponCode,
      productName: productName,
      productSku: productSku,
      productDescription: productDescription,
      lang: getLang(),
      appname: appName
    }),
    headers: new Headers({
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`
    })
  })
    .then(res => res.json())
    .then(data => {
      switch(data.msg) {
        case "coupon not found":
          enableSubmitButton();
          showError(30, 29, "#couponcode");
          break;
        case "coupon expired":
          enableSubmitButton();
          showError(33, 35, "#couponcode", {
            onOpenStart: () => {
              const timeZone = moment.tz.guess();
              const expiryText = moment(data.couponExpiry).tz(timeZone).format("MMMM D, YYYY");
              const p = document.querySelector("#modal1 p");
              const newContent = p.innerHTML.replace("${expiry}", expiryText);

              p.innerHTML = newContent;
            }
          });
          break;
        case "coupon already used":
          enableSubmitButton();
          showError(37, 31, "#couponcode");
          break;
        case "coupon discontinued":
          enableSubmitButton();
          showError(32, 31, "#couponcode");
          break;
        case "total discount applied":
          showError(36, 34, null, {
            onOpenStart: () => {
              disableSubmitButton();
              localStorage.setItem("subscriptionToken", data.subscriptionToken);
            },
            onCloseEnd: () => {
              window.location.reload();
            }
          });
          break;
        case "paypal payment created":
          const { paypalURL, paypalpaymentid, price } = data;
          const isPriceModified = (price == "9.99") ? false : true;

          if (isPriceModified) {
            showError(40, 39, null, {
              onOpenStart: () => {
                const p = document.querySelector("#modal1 p");
                const formattedPrice = Number(price.replace(/[^0-9.-]+/g,"")).toFixed(2);
                const newContent = p.innerHTML.replace("${newprice}", `<strong>$${formattedPrice}</strong>`);
                p.innerHTML = newContent;

                disableSubmitButton();
              },
              onCloseEnd: () => {
                window.location.href = paypalURL;
              }
            });
          } else {
            window.location.href = paypalURL;
          }
          break;
        default:
          enableSubmitButton();
          showError(17, 16);
          break;
      }
      
    })
    .catch(err => {
      console.error(err);
      enableSubmitButton();
    });
}

function toggleSpinner() {
  const content = document.querySelector("main");
  const spinner = document.querySelector("#spinner");

  hideSpinner(content, spinner);
}

function onCouponApplied(e) {
  e.preventDefault();
}

function attachEventListeners() {
  document.querySelector("#subscribeform").addEventListener("submit", onSubmit);
}

async function toggleAdminLink() {
  const adminLink = document.querySelector("#adminlink");
  const showLink = await canAccessAdministration() || false;
  
  if (showLink === true) adminLink.classList.remove("hide");
}

async function init() {
  await showPhrases();
  toggleSpinner();
  M.updateTextFields();
  ifJustRegistered();
  checkSubscription();
  toggleAdminLink();
  attachEventListeners();
}

init();