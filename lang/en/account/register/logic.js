function spinner(activate=true) {
  if (activate) {
    document.querySelector(".submitButton").classList.add("hide");
    document.querySelector(".submitButtonSpinner").classList.remove("hide");
  } else {
    document.querySelector(".submitButton").classList.remove("hide");
    document.querySelector(".submitButtonSpinner").classList.add("hide");
  }
}

async function onSubmit(e) {
  e.preventDefault();
  const username = e.target["username"].value.trim();
  const password = e.target["password"].value.trim();
  const firstname = e.target["firstname"].value.trim();
  const lastname = e.target["lastname"].value.trim();
  const fullname = e.target["fullname"].value.trim();
  const email = e.target["email"].value.trim();

  // Set phrase IDs
  const formIncompleteHeadline = 13;
  const usernameRequired = 14;
  const passwordRequired = 15;
  const firstNameRequired = 16;
  const lastNameRequired = 17;
  const fullNameRequired = 17;
  const emailRequired = 19;
  const invalidEmailHeadline = 20;
  const invalidEmail = 21;
  const usernameTakenHeadline = 22;
  const usernameTaken = 23;
  const emailTakenHeadline = 24;
  const emailTaken = 25;
  const passwordNotComplexEnoughHeadline = 26;
  const passwordNotComplexEnoughLine1 = 27;
  const databaseIsDownHeadline = 28;
  const databaseIsDown = 29;

  // Set e-mail content
  const emailSenderText = phrase(30, false);
  const emailSubject = phrase(31, false);
  const emailParagraph1 = phrase(32, false).replace("${fullname}", fullname);
  const emailLinkText = phrase(33, false);
  const emailSignature = phrase(34, false);

  // Close modal if it is open
  $("#modal1").modal("close");

  // Validate
  if (!username.length) return showError(usernameRequired, formIncompleteHeadline, "#username");
  if (!password.length) return showError(passwordRequired, formIncompleteHeadline, "#password");
  if (!lastname.length) return showError(lastNameRequired, formIncompleteHeadline, "#lastname");
  if (!fullname.length) return showError(fullNameRequired, formIncompleteHeadline, "#fullname");
  if (!email.length) return showError(emailRequired, formIncompleteHeadline, "#email");

  spinner(true);

  const endpoint = `${getHost()}/fp/register`;
  fetch(endpoint, {
    mode: "cors",
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      fullname: fullname,
      email: email,
      lang: getLang(),
      emailSenderText: emailSenderText,
      emailSubject: emailSubject,
      emailParagraph1: emailParagraph1,
      emailLinkText: emailLinkText,
      emailSignature: emailSignature
    }),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(res => res.json())
    .then(data => {
      switch(data.msg) {
        case "username missing":
          spinner(false);
          showError(usernameRequired, formIncompleteHeadline, "#username")
          break;
        case "password missing":
          spinner(false);
          showError(passwordRequired, formIncompleteHeadline, "#password");
          break;
        case "last name missing":
          spinner(false);
          showError(lastNameRequired, formIncompleteHeadline, "#lastname");
          break;
        case "full name missing":
          spinner(false);
          showError(fullNameRequired, formIncompleteHeadline, "#fullname");
          break;
        case "e-mail missing":
          spinner(false);
          showError(emailRequired, formIncompleteHeadline, "#email");
          break;
        case "invalid e-mail":
          spinner(false);
          showError(invalidEmail, invalidEmailHeadline, "#email");
          break;
        case "unable to query for duplicate username":
          spinner(false);
          showError(databaseIsDown, databaseIsDownHeadline);
          break;
        case "username already exists":
          spinner(false);
          showError(usernameTaken, usernameTakenHeadline, "#username");
          break;
        case "unable to query for duplicate e-mail address":
          spinner(false);
          showError(databaseIsDown, databaseIsDownHeadline);
          break;
        case "e-mail already exists":
          spinner(false);
          showError(emailTaken, emailTakenHeadline, "#email");
          break;
        case "password not complex enough":
          spinner(false);
          showError(passwordNotComplexEnoughLine1, passwordNotComplexEnoughHeadline, "#password");
          break;
        case "unable to generate password salt":
          spinner(false);
          showError(databaseIsDown, databaseIsDownHeadline);
          break;
        case "unable to generate password hash":
          spinner(false);
          showError(databaseIsDown, databaseIsDownHeadline);
          break;      
        case "unable to insert new record":
          spinner(false);
          showError(databaseIsDown, databaseIsDownHeadline);
          break;
        default:
          onEmailSent(data.data);
        }
    })
    .catch(err => {
      console.error(err);
    });
}

function onEmailSent(data) {
  // Phrase text
  const headline = phrase(35);
  const checkYourEmail = phrase(36);
  const checkYourSpamFolder = phrase(37);

  // Selectors
  const registerForm = document.querySelector("#registerForm");
  const emailSent = document.querySelector("#emailSent");
  const pagehead = document.querySelector(".fp_pagehead");

  // Populate content
  const content = `
    <p>${checkYourEmail}</p>
    <p>${checkYourSpamFolder}</p>
  `;

  pagehead.innerHTML = headline;
  emailSent.innerHTML = content;

  registerForm.classList.add("hide");
  emailSent.classList.remove("hide");
  pagehead.scrollIntoView();
}

function prepopulateFullName() {
  const fullnameEl = document.querySelector("#fullname");
  const firstnameEl = document.querySelector("#firstname");
  const lastnameEl = document.querySelector("#lastname");
  const firstname = firstnameEl.value.trim();
  const lastname = lastnameEl.value.trim();
  const fullname = fullnameEl.value.trim();

  if (!fullname.length) {
    if (firstname.length || lastname.length) {
      const fullnamePrePopulated = `${firstname} ${lastname}`.trim();
      fullnameEl.value = fullnamePrePopulated;
    }
  }
}

function attachListeners() {
  document.querySelector("#registerForm").addEventListener("submit", onSubmit);
  document.querySelector("#fullname").addEventListener("focus", prepopulateFullName);
}

function init() {
  showPhrases();
  attachListeners();
}

init();