async function onSubmit(e) {
  e.preventDefault();
  const username = e.target["username"].value.trim();
  const password = e.target["password"].value.trim();
  const firstname = e.target["firstname"].value.trim();
  const lastname = e.target["lastname"].value.trim();
  const email = e.target["email"].value.trim();

  
}

function attachListeners() {
  document.querySelector("#registerForm").addEventListener("submit", onSubmit);
}

function init() {
  showPhrases();
  attachListeners();
}

init();