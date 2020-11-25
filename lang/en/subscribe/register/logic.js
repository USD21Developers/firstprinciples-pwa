async function onSubmit(e) {
  e.preventDefault();
  const username = e.target["username"].value.trim();
  const password = e.target["password"].value.trim();
  const firstname = e.target["firstname"].value.trim();
  const lastname = e.target["lastname"].value.trim();
  const email = e.target["email"].value.trim();

  // Set phrase IDs
  const formIncomplete = 13;
  const usernameRequired = 14;
  const passwordRequired = 15;
  const firstNameRequired = 16;
  const lastNameRequired = 17;
  const emailRequired = 18;

  // Close modal if it is open
  $("#modal1").modal("close");
  
  if (!username.length) return showError(usernameRequired, formIncomplete);
  if (!password.length) return showError(passwordRequired, formIncomplete);
  if (!firstname.length) return showError(firstNameRequired, formIncomplete);
  if (!lastname.length) return showError(lastNameRequired, formIncomplete);
  if (!email.length) return showError(emailRequired, formIncomplete);
}

function attachListeners() {
  document.querySelector("#registerForm").addEventListener("submit", onSubmit);
}

function init() {
  showPhrases();
  attachListeners();
}

init();