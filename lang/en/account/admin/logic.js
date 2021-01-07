function hideDefaultSpinner() {
  const spinner = document.querySelector("#spinner");
  const content = document.querySelector("main");

  hideSpinner(content, spinner);
}

function confirmAccess() {
  const canAccess = canAccessAdministration() || false;
  if (!canAccess) {
    window.location.href = "../";
  }
}

function couponLink() {
  const canCreate = canCreateCoupons() || false;
  const el = document.querySelector("[href='coupons/']");

  if (canCreate) {
    el.classList.remove("hide");
  }
}

function preauthUsersLink() {
  const canCreate = canCreatePreauthorizedUsers() || false;
  const el = document.querySelector("[href='preauth/']");

  if (canCreate) {
    el.classList.remove("hide");
  }
}

async function init() {
  confirmAccess();
  await showPhrases();
  hideDefaultSpinner();
  couponLink();
  preauthUsersLink();
}

init();