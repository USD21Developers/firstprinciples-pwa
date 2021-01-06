function onSuccess(data) {
  const pageTitle = phrase(3, false);
  const pageTitleEl = document.querySelector(".fp_pagehead");
  const content = document.querySelector("main");
  const spinner = document.querySelector("#spinner");
  const subscriptionToken = data.subscriptionToken || "";

  subscriptionToken.length && localStorage.setItem("subscriptionToken", subscriptionToken);

  document.title = pageTitle;
  pageTitleEl.innerHTML = pageTitle;
  hideSpinner(content, spinner);
}

async function executeSubscription() {
  const accessToken = await getAccessToken();
  const endpoint = `${getAPIHost()}/fp/activate-subscription`;
  let paymentId = "";
  let token = "";
  let PayerID = "";

  // Extract URL variables
  window.location.search.substring(1, window.location.search.length).split("&").forEach(item => {
    const pair = item.split("=");
    const key = pair[0];
    const value = pair[1];
    if (key === "paymentId") paymentId = value;
    if (key === "token") token = value;
    if (key === "PayerID") PayerID = value;
  });

  // Execute subscription
  fetch(endpoint, {
    mode: "cors",
    method: "POST",
    body: JSON.stringify({
      paymentId: paymentId,
      token: token,
      PayerID: PayerID,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`
    })
  })
    .then(res => res.json())
    .then(data => {
      switch(data.msg) {
        case "subscription activated":
          onSuccess(data);
          break;
        case "already recorded successful payment":
          onSuccess();
          break;
        default:
          showError(6, 4)
          break;
      }
    })
    .catch(err => {
      console.error(err);
    });
}

async function init() {
  checkIfOffline();
  await showPhrases();
  executeSubscription();
}

init();