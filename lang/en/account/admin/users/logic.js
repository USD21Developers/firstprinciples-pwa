function hideDefaultSpinner() {
  const spinner = document.querySelector("#spinnerDefault");
  const content = document.querySelector("main");

  hideSpinner(content, spinner);
  document.querySelector(".breadcrumbs").classList.remove("hide");
}

function renderUsers(data) {
  const userlist = document.querySelector("#userlist");
  const timezone = moment.tz.guess();
  const txtSubscribedUntil = phrase(66, false);
  const headlineUsers = phrase(67, false);
  let html = "";

  data.forEach(item => {
    const { userid, subscribeduntil, userstatus, usertype, fullname } = item;
    const isSysadmin = (usertype === "sysadmin") ? true : false;
    const isFrozen = (userstatus === "frozen") ? true : false;
    const isSubscribed = moment(subscribeduntil) > moment.utc() || false;
    let userhtml = "";

    userhtml += `
      <li class="collection-item userlist-item ${isSubscribed ? 'white userlist-subscribed' : 'grey lighten-2'} data-userid="${userid}" data-subscribeduntil="${subscribeduntil}" data-userstatus="${userstatus}" data-usertype="${usertype}">`;
    if (isSubscribed) {
      userhtml += `<strong>${fullname}</strong>`;
    } else {
      userhtml += `${fullname}`
    }
    if (isSysadmin) {
      userhtml += `<div><span class="smallcaps green-text"><strong>${usertype.toLowerCase()}</strong></div>`;
    }
    if (isFrozen) {
      userhtml += `<div><span class="smallcaps red-text"><strong>${userstatus.toLowerCase()}</strong></div>`;
    }
    if (isSubscribed) {
      userhtml += `<div>${txtSubscribedUntil} ${moment(subscribeduntil).tz(timezone).format("LL")}</div>`;
    }
    userhtml += `</li>`;
    html += userhtml;
  });
  html = `
    <div class="row">
      <div class="col s12 m4 offset-m4">
        <h5 class="center-align">${headlineUsers}</h5>
        <ul class="collection userlist z-depth-1">${html}</ul>
      </div>
    </div>
  `;
  userlist.innerHTML = html;
  userlist.classList.remove("hide");
  try {
    userlist.scrollIntoView({behavior: "smooth"})
  } catch(e) {
    userlist.scrollIntoView();
  }
}

function renderSubscribers(data) {
  const userlist = document.querySelector("#userlist");
  const timezone = moment.tz.guess();
  const txtSubscribedUntil = phrase(66, false);
  const headlineSubscribers = phrase(68, false);
  let html = "";

  data.forEach(item => {
    const { userid, subscribeduntil, userstatus, usertype, fullname } = item;
    const isSysadmin = (usertype === "sysadmin") ? true : false;
    const isFrozen = (userstatus === "frozen") ? true : false;
    let userhtml = "";

    userhtml += `
      <li class="collection-item userlist-item white userlist-subscribed data-userid="${userid}" data-subscribeduntil="${subscribeduntil}" data-userstatus="${userstatus}" data-usertype="${usertype}">
        <strong>${fullname}</strong>
    `;
    if (isSysadmin) {
      userhtml += `<div><span class="smallcaps green-text"><strong>${usertype.toLowerCase()}</strong></div>`;
    }
    if (isFrozen) {
      userhtml += `<div><span class="smallcaps red-text"><strong>${userstatus.toLowerCase()}</strong></div>`;
    }
    userhtml += `<div>${txtSubscribedUntil} ${moment(subscribeduntil).tz(timezone).format("LL")}</div>`;
    userhtml += `</li>`;
    html += userhtml;
  });
  html = `
    <div class="row">
      <div class="col s12 m4 offset-m4">
        <h5 class="center-align">${headlineSubscribers}</h5>
        <ul class="collection userlist z-depth-1">${html}</ul>
      </div>
    </div>
  `;
  userlist.innerHTML = html;
  userlist.classList.remove("hide");
  try {
    userlist.scrollIntoView({behavior: "smooth"})
  } catch(e) {
    userlist.scrollIntoView();
  }
}

async function getUsers() {
  const endpoint = `${getAPIHost()}/fp/users-list-all`;
  const accessToken = await getAccessToken();

  localforage.getItem("users", (storedUsers) => {
    if (storedUsers && storedUsers.length) {
      renderUsers(storedUsers);
    } else {
      localforage.removeItem("users");
    }
  });

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
          localforage.setItem("users", data.data);
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

  localforage.getItem("subscribers", (storedSubscribers) => {
    if (storedSubscribers && storedSubscribers.length) {
      renderUsers(storedSubscribers);
    } else {
      localforage.removeItem("subscribers");
    }
  });

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
          localforage.setItem("subscribers", data.data);
          break;
      }
    })
    .catch(err => {
      console.error(err);
    });

}

function onUserSearched(e) {
  e.preventDefault();
}

function onEdit(e) {
  e.preventDefault();
}

function onBtnListUsersClicked(e) {
  e.preventDefault();
  getUsers();
}

function onBtnListSubscribersClicked(e) {
  e.preventDefault();
  getSubscribers();
}

function showAutomatically() {
  const showusers = sessionStorage.getItem("showusers") || "";
  sessionStorage.removeItem("showusers");

  switch(showusers) {
    case "all":
      document.querySelector("#btnListUsers").click();
      break;
    case "subscribers":
      document.querySelector("#btnListSubscribers").click();
      break;
  }
}

async function showStats(data) {
  const { active_subscribers=0, total_users=0 } = data;
  const numActiveSubscribers = document.querySelector("#numActiveSubscribers");
  const numTotalUsers = document.querySelector("#numTotalUsers");

  numActiveSubscribers.innerHTML = active_subscribers;
  numTotalUsers.innerHTML = total_users;

  showAutomatically();
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