function toggleSpinner() {
  const content = document.querySelector("main");
  const spinner = document.querySelector("#spinnerDefault");

  hideSpinner(content, spinner);
}

function goBack() {
  const cameFromAnAccountPage = (document.referrer.indexOf("/account/") >= 0) || false;
  if (cameFromAnAccountPage) {
    window.location.href = document.referrer;
  } else {
    window.location.href = e.target.href;
  }
}

function attachEventListeners() {
  document.querySelectorAll(".continuelink").forEach(item => {
    item.addEventListener("click", goBack);
  });
}

async function init() {
  await showPhrases();
  toggleSpinner();
  attachEventListeners();
}

init();