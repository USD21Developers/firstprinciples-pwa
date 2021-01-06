function toggleSpinner() {
  const content = document.querySelector("main");
  const spinner = document.querySelector("#spinner");

  hideSpinner(content, spinner);
}

function loadCountries() {
  const countryEl = document.querySelector("#country");
  const defaultOptionText = phrase(10, false);
  const file = "../_assets/json/countries.json";

  fetch(file)
    .then(res => res.json())
    .then(data => {
      let options = `<option value="">${defaultOptionText}</option>`;
      data.forEach(item => {
        const { name, alpha2 } = item;
        options +=  `<option value="${alpha2}">${name}</option>`;
      });
      countryEl.innerHTML = options;
      M.FormSelect.init(countryEl);
    })
    .catch(err => {
      console.error(err);
    });
}

function populateForm(data) {
  const {
    username = "",
    fullname = "",
    firstname = "",
    lastname = "",
    email = "",
    country = "",
  } = data;
  const usernameEl = document.querySelector("#username");
  const fullnameEl = document.querySelector("#fullname");
  const firstnameEl = document.querySelector("#firstname");
  const lastnameEl = document.querySelector("#lastname");
  const emailEl = document.querySelector("#email");
  const countryEl = document.querySelector("#country");

  usernameEl.value = username;
  fullnameEl.value = fullname;
  firstnameEl.value = firstname;
  lastnameEl.value = lastname;
  emailEl.value = email;
  countryEl.value = country;

  M.updateTextFields();
}

async function onSubmit(e) {
  e.preventDefault();
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();
  const fullname = document.querySelector("#fullname").value.trim();
  const firstname = document.querySelector("#firstname").value.trim();
  const lastname = document.querySelector("#lastname").value.trim();
  const email = document.querySelector("#email").value.trim();
  const country = document.querySelector("#country").value.trim();
  const accessToken = await getAccessToken();
  const endpoint = `${getAPIHost()}/fp/profile-edit`;

  fetch(endpoint, {
    mode: "cors",
    method: "POST",
    body: JSON.stringify({
      username,
      password,
      fullname,
      firstname,
      lastname,
      email,
      country
    }),
    headers: new Headers({
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`
    })
  })
    .then(res => res.json())
    .then(data => {
      switch(data.msg) {
        case "user is not authorized for this action":
          window.location.href = "../logout/";
          break;
        case "username is missing":
          showError(15, 14, "#username");
          break;
        case "full name is missing":
          showError(16, 14, "#fullname");
          break;
        case "first name is missing":
          showError(17, 14, "#firstname");
          break;
        case "last name is missing":
          showError(18, 14, "#lastname");
          break;
        case "email is missing":
          showError(19, 14, "#email");
          break;
        case "invalid email":
          showError(21, 20, "#email");
          break;
        case "country is missing":
          showError(22, 14, "#country");
          break;
        case "username already exists":
          showError(26, 25, "#username");
          break;
        case "e-mail already exists":
          showError(28, 27, "#email");
          break;
        case "password not complex enough":
          showError(30, 29, "#password");
          break;
        case "profile updated":
          showError(32, 31);
          break;
        default:
          showError(24, 23);
          break;
      }
    })
    .catch(err => {
      console.error(err);
    });
}

async function retrieveContent() {
  const accessToken = await getAccessToken();
  const endpoint = `${getAPIHost()}/fp/profile`;

  fetch(endpoint, {
    mode: "cors",
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    })
  })
    .then(res => res.json())
    .then(data => {
      switch(data.msg) {
        case "user is not authorized for this action":
          window.location.href = "../logout/";
          break;
        case "unable to query for user":
          showError(13, 12);
          break;
        case "profile retrieved":
          populateForm(data.data);
          break;
        default:
          window.location.href = "../logout/";
          break;
      }
    })
    .catch(err => {
      console.error(err);
    });
}

function populateFullName() {
  const firstname = document.querySelector("#firstname").value.trim();
  const lastname = document.querySelector("#lastname").value.trim();
  const fullnameEl = document.querySelector("#fullname");
  const fullname = fullnameEl.value.trim();

  if (fullname.length === 0) {
    fullnameEl.value = `${firstname} ${lastname}`;
  }
}

function attachEventListeners() {
  document.querySelector("#editprofile").addEventListener("submit", onSubmit);
  document.querySelector("#fullname").addEventListener("focus", populateFullName);
}

async function init() {
  await showPhrases();
  loadCountries();
  await retrieveContent()
  toggleSpinner();
  attachEventListeners();
}

init();