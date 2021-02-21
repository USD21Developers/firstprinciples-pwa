function hideDefaultSpinner() {
  const spinner = document.querySelector("#spinnerDefault");
  const content = document.querySelector("main");

  hideSpinner(content, spinner);
  document.querySelector(".breadcrumbs").classList.remove("hide");
}

function renderUsers(data) {
  console.log(data);
}

function renderSubscribers(data) {
  console.log(data);
}

async function getUsers() {
  const endpoint = `${getAPIHost()}/fp/users-list-all`;
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
          break;
      }
    })
    .catch(err => {
      console.error(err);
    });

}

async function getSubscribers() {
  const endpoint = `${getAPIHost()}/fp/users-list-subscribers`;
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
        case "unable to get subscribers":
          showError(4, 3, null, {
            onCloseEnd: () => {
              window.location.href = "../";
            }
          });
          break;
        case "subscribers retrieved":
          renderSubscribers(data.data);
          break;
      }
    })
    .catch(err => {
      console.error(err);
    });

}

function onUserSearched(e) {
  e.preventDefault();
  console.log("onUserSearched");
}

function onEdit(e) {
  e.preventDefault();
  console.log("onEdit");
}

function onBtnListUsersClicked(e) {
  e.preventDefault();
  getUsers();
  console.log("onBtnListUsersClicked");
}

function onBtnListSubscribersClicked(e) {
  e.preventDefault();
  getSubscribers();
  console.log("onBtnListSubscribersClicked");
}

async function showStats(data) {
  const { active_subscribers=0, total_users=0 } = data;
  const numActiveSubscribers = document.querySelector("#numActiveSubscribers");
  const numTotalUsers = document.querySelector("#numTotalUsers");

  numActiveSubscribers.innerHTML = active_subscribers;
  numTotalUsers.innerHTML = total_users;
}

async function populateStats() {
  const accessToken = await getAccessToken();
  const endpoint = `${getAPIHost()}/fp/admin-metadata`;

  fetch(endpoint, {
    mode: "cors",
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    })
  })
    .then(res => res.json())
    .then(data => {
      switch(data.msg) {
        case "user is not authorized for this action":
          window.location.href = "../";
          break;
        case "admin metadata retrieved":
          showStats(data.data);
          break;
        default:
          showError(17, 16, null, {
            onCloseStart: () => {
              window.location.reload();
            }
          });
          break;
      }
    })
    .catch(err => {
      console.log(err);
    });
}

function addEventListeners() {
  document.querySelector("#usersearch").addEventListener("submit", onUserSearched);
  document.querySelector("#btnListUsers").addEventListener("click", onBtnListUsersClicked);
  document.querySelector("#btnListSubscribers").addEventListener("click", onBtnListSubscribersClicked);
}

async function init() {
  checkIfOffline();
  addEventListeners();
  await showPhrases();
  populateStats();
  hideDefaultSpinner();
}

init();