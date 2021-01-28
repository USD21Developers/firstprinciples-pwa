function onConfirmed(refreshToken, accessToken) {
  const headlineConfirmationSuccessful = phrase(3, false);
  const loginConfirmed = phrase(8, false);
  const txtContinue = phrase(9, false);

  const pageHead = document.querySelector(".fp_pagehead");
  const pageContent = document.querySelector(".fp_pagecontent");

  localStorage.removeItem("refreshToken");
  localStorage.removeItem("subscriptionToken");
  sessionStorage.removeItem("accessToken");

  localStorage.setItem("refreshToken", refreshToken);
  sessionStorage.setItem("accessToken", accessToken);
  sessionStorage.setItem("justRegistered", true);

  document.title = headlineConfirmationSuccessful;
  pageHead.innerHTML = headlineConfirmationSuccessful;
  pageContent.innerHTML = `
    <p class="mt-1 center">
      <img src="../account/_assets/img/icons/animated_checkmark.gif" width="164" height="164" alt="" style="margin-left: -30px">
    </p>

    <p class="mt-2 center">
      ${loginConfirmed}
    </p>

    <p class="center">
      <button id="confirmedContinue" class="waves-effect waves-light btn light-blue darken-1">
        ${txtContinue}
      </button>
    </p>
  `;

  document.querySelector("#confirmedContinue").addEventListener("click", () => {
    window.location.href = "../account/";
  });
}

async function handleTokenAlreadyClaimed() {
  const accessToken = await getAccessToken();
  const endpoint = `${getAPIHost()}/fp/check-subscription`;
  const timeZone = moment.tz.guess();

  fetch(endpoint, {
    mode: "cors",
    method: "POST",
    body: JSON.stringify({
      timeZone: timeZone,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    })
  })
    .then(res => res.json())
    .then(data => {
      switch(data.msg) {
        case "user is not authorized for this action":
          window.location.href = "../account/logout/";
          break;
        case "unable to query for subscription":
          showError(11, 10);
          break;
        case "user is not subscribed":
          sessionStorage.setItem("justRegistered", true);
          window.location.href = "../account/login/";
          break;
        case "user is subscribed":
          window.location.href = "../account/login/";
          break;
      }
    })
    .catch(err => {
      console.error(err);
    });
}

function checkConfirmationToken() {
  const hash = document.location.hash.substring(1, document.location.hash.length) || "";
  const endpoint = `${getHost()}/fp/register-confirm`;

  fetch(endpoint, {
    mode: "cors",
    method: "POST",
    body: JSON.stringify({
      token: hash,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    })
  })
    .then(res => res.json())
    .then(data => {
      switch(data.msg) {
        case "token is missing":
          showError(7, 4);
          break;
        case "token is invalid":
          showError(7, 4);
          break;
        case "unable to query for token":
          showError(11, 10);
          break;
        case "token not found":
          showError(7, 4);
          break;
        case "token already claimed":
          handleTokenAlreadyClaimed();
          break;
        case "token expired":
          showError(6, 4);
          break;
        case "unable to update token record":
          showError(11, 10);
          break;
        case "unable to query for user":
          showError(11, 10);
          break;
        case "user not found":
          showError(7, 4);
          break;
        case "registration confirmed":
          onConfirmed(data.refreshToken, data.accessToken);
          break;
        default:
          showError(11, 10);
          break;
      }
    })
    .catch(err => {
      console.error(err);
    });
}

function init() {
  showPhrases();
  checkConfirmationToken();
}

init();