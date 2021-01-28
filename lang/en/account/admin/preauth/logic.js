function confirmAccess() {
  const canAccess = canCreatePreauthorizedUsers() || false;
  if (!canAccess) {
    window.location.href = "../../";
  }
}

function hideDefaultSpinner() {
  const spinner = document.querySelector("#spinner");
  const content = document.querySelector("main");

  hideSpinner(content, spinner);
}

async function init() {
  confirmAccess();
  await showPhrases();
  hideDefaultSpinner();
}

init();