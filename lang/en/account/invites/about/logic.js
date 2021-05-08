function showBreadcrumbs() {
  const breadcrumbs = document.querySelector(".breadcrumbs");
  breadcrumbs.classList.remove("hide");
}

async function init() {
  await showPhrases();
  showBreadcrumbs();
}

init();
