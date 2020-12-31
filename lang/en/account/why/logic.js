function toggleSpinner() {
  const spinner = document.querySelector("#spinner");
  const content = document.querySelector("main");

  hideSpinner(content, spinner);
}

function toggleGoBackLink() {
  const goBackLink = document.querySelector("[href='javascript:history.go(-1)']");
  if (history.length) goBackLink.classList.remove("hide");
}

function toggleRegisterButton() {
  let isRegistered = false;
  const refreshTokenStored = localStorage.getItem("refreshToken") || "";
  const registerButtonEl = document.querySelector("#registerButton");
  const backButtonEl = document.querySelector("#backButton");

  if (refreshTokenStored.length) isRegistered = true;

  // If user is already registered, hide the Register button and style the Back button.
  if (isRegistered) {
    registerButtonEl.classList.add("hide");
    backButtonEl.classList.add("btn");
    backButtonEl.classList.add("btn-account");
  }
}

async function init() {
  await showPhrases();
  toggleSpinner();
  toggleGoBackLink();
  toggleRegisterButton();
}

init();