function onEmailSent() {
  const headline = document.querySelector(".fp_pagehead");
  const main = document.querySelector("main");
  
  headline.innerHTML = phrase(17);
  main.innerHTML = phrase(18);
}

function onError() {
  showError(phrase(19), phrase(19));
}

function onSubmit(e) {
  e.preventDefault();
  const email = document.querySelector("#email").value.trim();
  const lang = getLang();
  const endpoint = `${getHost()}/fp/forgot-password`;

  const submitButton = document.querySelector("#submitButton");
  const spinner = document.querySelector(".submitButtonSpinner");

  const inputEmail = 8;
  const headlineFormIncomplete = 9;

  const emailSender = phrase(10, false);
  const emailSubject = phrase(11, false);
  const emailParagraph1 = phrase(12, false);
  const emailParagraph2 = phrase(13, false);
  const emailParagraph3 = phrase(14, false);

  if (email.length === 0) {
    return showError(inputEmail, headlineFormIncomplete, "#email");
  }

  showSpinner(submitButton, spinner);
  fetch(endpoint, {
    mode: "cors",
    method: "POST",
    body: JSON.stringify({
      email: email,
      lang: lang,
      emailSender: emailSender,
      emailSubject: emailSubject,
      emailParagraph1: emailParagraph1,
      emailParagraph2: emailParagraph2,
      emailParagraph3: emailParagraph3,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    })
  })
    .then(res => res.json())
    .then(data => {
      hideSpinner(submitButton, spinner);
      switch(data.msg) {
        case "e-mail is missing":
          showError(inputEmail, headlineFormIncomplete, "#email");
          break;
        case "invalid e-mail format":
          showError(15, headlineFormIncomplete, "#email");
          break;
        case "user not found":
          showError(16, 19, "#email");
          break;
        case "password reset e-mail sent":
          onEmailSent();
          break;
        default:
          break;
      }
    })
    .catch(err => {
      hideSpinner(submitButton, spinner);
      console.error(err);
    });
}

function attachEventListeners() {
  document.querySelector("#formForgottenPasswords").addEventListener("submit", onSubmit);
}

function toggleSpinner() {
  const spinner = document.querySelector("#spinnerDefault");
  const main = document.querySelector("main");

  hideSpinner(main, spinner);
}

async function init() {
  await showPhrases();
  toggleSpinner();
  attachEventListeners();
}

init();