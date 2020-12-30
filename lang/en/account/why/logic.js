function toggleGoBackLink() {
  const goBackLink = document.querySelector("[href='javascript:history.go(-1)']");
  if (history.length) goBackLink.classList.remove("hide");
}

async function init() {
  await showPhrases();
  toggleGoBackLink();
}

init();