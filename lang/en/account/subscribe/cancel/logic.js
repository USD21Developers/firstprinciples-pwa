function toggleSpinner() {
  const content = document.querySelector("main");
  const spinner = document.querySelector("#spinner");
  hideSpinner(content, spinner);
}

async function init() {
  checkIfOffline();
  await showPhrases();
  toggleSpinner();
}

init();