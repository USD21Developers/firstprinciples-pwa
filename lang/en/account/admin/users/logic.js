function renderUsers(data) {
  //
}

async function toggleContent() {
  const content = document.querySelector("main");
  const spinner = document.querySelector("#spinnerDefault");
  const endpoint = `${getAPIHost()}/fp/get-users`;
  const accessToken = await getAccessToken();

  fetch(endpoint, {
    mode: "cors",
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`
    })
  })
    .then(res => res.json())
    .then(data => {
      switch(data.msg) {
        case "user is not authorized for this action":
          window.location.href = "../";
          break;
        case "unable to get users":
          showError(4, 3, null, {
            onCloseEnd: () => {
              window.location.href = "../";
            }
          });
          break;
        case "users retrieved":
          renderUsers(data.data);
          hideSpinner(content, spinner);
          document.querySelector(".breadcrumbs").classList.remove("hide");
          break;
      }
    })
    .catch(err => {
      console.error(err);
    });

}

async function init() {
  await showPhrases();
  toggleContent();
}

init();