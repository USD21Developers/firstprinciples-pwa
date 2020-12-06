function onSubmit(e) {
  e.preventDefault();
  const username = e.target["username"].value.trim();
  const password = e.target["password"].value.trim();
}

function attachListeners() {
  document.querySelector("#login").addEventListener("submit", onSubmit);
}

function init() {
  supportsPromises();
  toggleSpinner();
  showPhrases();
  attachListeners();
}

init();