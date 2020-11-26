async function onSubmit(e) {
  e.preventDefault();
  const username = e.target["username"].value.trim();
  const password = e.target["password"].value.trim();
  const firstname = e.target["firstname"].value.trim();
  const lastname = e.target["lastname"].value.trim();
  const fullname = e.target["fullname"].value.trim();
  const email = e.target["email"].value.trim();

  // Set phrase IDs
  const formIncomplete = 13;
  const usernameRequired = 14;
  const passwordRequired = 15;
  const firstNameRequired = 16;
  const lastNameRequired = 17;
  const fullNameRequired = 17;
  const emailRequired = 19;

  // Close modal if it is open
  $("#modal1").modal("close");
  
  // Validate
  if (!username.length) return showError(usernameRequired, formIncomplete);
  if (!password.length) return showError(passwordRequired, formIncomplete);
  if (!firstname.length) return showError(firstNameRequired, formIncomplete);
  if (!lastname.length) return showError(lastNameRequired, formIncomplete);
  if (!fullname.length) return showError(fullNameRequired, formIncomplete);
  if (!email.length) return showError(emailRequired, formIncomplete);

  const endpoint = window.location.hostname === "localhost" ? "http://localhost:4000/fp/register" : "https://api.usd21.org/fp/register";
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
      console.log(data);
    })
    .catch(err => {
      console.error(err);
    });
}

function attachListeners() {
  document.querySelector("#registerForm").addEventListener("submit", onSubmit);
}

function init() {
  showPhrases();
  attachListeners();
}

init();