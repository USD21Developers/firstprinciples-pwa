function onConfirmed(refreshToken, accessToken) {
  const headlineConfirmationSuccessful = phrase(3);
  const loginConfirmed = phrase(8);
  const txtContinue = phrase(9);

  const pageHead = document.querySelector(".fp_pagehead");
  const pageContent = document.querySelector(".fp_pagecontent");

  localStorage.setItem("refreshToken", refreshToken);
  sessionStorage.setItem("accessToken", accessToken);

  // TODO:  maybe store JWT tokens in indexedDB because of iOS problems with scope

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
      <button id="confirmedContinue" class="btn green darken-1 waves-effect waves-light">
        ${txtContinue}
      </button>
    </p>
  `;

  document.querySelector("#confirmedContinue").addEventListener("click", () => {
    window.location.href = "../account/";
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
      const headlineConfirmationFailed = phrase(4);
      const headlineDatabaseIsDown = phrase(10);
      const technicalGlitch = phrase(11);
      const linkExpired = phrase(6);
      const linkNotRecognized = phrase(7);

      switch(data.msg) {
        case "token is missing":
          showError(linkNotRecognized, headlineConfirmationFailed);
          break;
        case "token is invalid":
          showError(linkNotRecognized, headlineConfirmationFailed);
          break;
        case "unable to query for token":
          showError(technicalGlitch, headlineDatabaseIsDown);
          break;
        case "token not found":
          showError(linkNotRecognized, headlineConfirmationFailed);
          break;
        case "token already claimed":
          window.location.href = "../account/login/";
          break;
        case "token expired":
          showError(linkExpired, headlineConfirmationFailed);
          break;
        case "unable to update token record":
          showError(technicalGlitch, headlineDatabaseIsDown);
          break;
        case "unable to query for user":
          showError(technicalGlitch, headlineDatabaseIsDown);
          break;
        case "user not found":
          showError(linkNotRecognized, headlineConfirmationFailed);
          break;
        case "registration confirmed":
          onConfirmed(data.refreshToken, data.accessToken);
          break;
        default:
          showError(technicalGlitch, headlineDatabaseIsDown);
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