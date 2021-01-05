function toggleSpinner() {
  const content = document.querySelector("main");
  const spinner = document.querySelector("#spinnerDefault");

  hideSpinner(content, spinner);
}

async function init() {
  await showPhrases();
  toggleSpinner();
}

init();