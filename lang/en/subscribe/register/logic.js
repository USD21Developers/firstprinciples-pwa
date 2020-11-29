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

  // Close modal if it is open
  $("#modal1").modal("close");

  // Validate
  if (!username.length) return showError(usernameRequired, formIncompleteHeadline, "#username");
  if (!password.length) return showError(passwordRequired, formIncompleteHeadline, "#password");
  if (!lastname.length) return showError(lastNameRequired, formIncompleteHeadline, "#lastname");
  if (!fullname.length) return showError(fullNameRequired, formIncompleteHeadline, "#fullname");
  if (!email.length) return showError(emailRequired, formIncompleteHeadline, "#email");

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
      email: email
    }),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(res => res.json())
    .then(data => {
      switch(data.msg) {
        case "username missing":
          showError(usernameRequired, formIncompleteHeadline, "#username")
          break;
        case "password missing":
          showError(passwordRequired, formIncompleteHeadline, "#password");
          break;
        case "last name missing":
          showError(lastNameRequired, formIncompleteHeadline, "#lastname");
          break;
        case "full name missing":
          showError(fullNameRequired, formIncompleteHeadline, "#fullname");
          break;
        case "e-mail missing":
          showError(emailRequired, formIncompleteHeadline, "#email");
          break;
        case "invalid e-mail":
          showError(invalidEmail, invalidEmailHeadline, "#email");
          break;
        case "unable to query for duplicate username":
          showError(databaseIsDown, databaseIsDownHeadline);
          break;
        case "username already exists":
          showError(usernameTaken, usernameTakenHeadline, "#username");
          break;
        case "unable to query for duplicate e-mail address":
          showError(databaseIsDown, databaseIsDownHeadline);
          break;
        case "e-mail already exists":
          showError(emailTaken, emailTakenHeadline, "#email");
          break;
        case "password not complex enough":
          showError(passwordNotComplexEnoughLine1, passwordNotComplexEnoughHeadline, "#password");
          break;
        case "unable to generate password salt":
          showError(databaseIsDown, databaseIsDownHeadline);
          break;
        case "unable to generate password hash":
          showError(databaseIsDown, databaseIsDownHeadline);
          break;      
        case "unable to insert new record":
          showError(databaseIsDown, databaseIsDownHeadline);
          break;
        default:
          onSuccessfullyRegistered(data.data);
      }
    })
    .catch(err => {
      console.error(err);
    });
}

function onSuccessfullyRegistered(data) {
  // TODO:  store refreshToken and accessToken
}

function prepopulateFullName() {
  const fullnameEl = document.querySelector("#fullname");
  const firstnameEl = document.querySelector("#firstname");
  const lastnameEl = document.querySelector("#lastname");
  const firstname = firstnameEl.value.trim();
  const lastname = lastnameEl.value.trim();
  const fullname = fullnameEl.value.trim();
  const fullnamePrePopulated = `${firstname} ${lastname}`;

  if (!fullname.length) {
    if (firstname.length && lastname.length) {
      fullnameEl.value = fullnamePrePopulated;
    }
  }
}

function attachListeners() {
  document.querySelector("#registerForm").addEventListener("submit", onSubmit);
  document.querySelector("#firstname").addEventListener("blur", prepopulateFullName);
  document.querySelector("#lastname").addEventListener("blur", prepopulateFullName);
}

function init() {
  configureModal();
  showPhrases();
  attachListeners();
}

init();