const loginForm = document.querySelector("#login");
const spinnerDefault = document.querySelector("#spinnerDefault");

const submitButton = document.querySelector("#submitButton");
const submitButtonProgress = document.querySelector("#submitButtonProgress");

function onSubmit(e) {
  e.preventDefault();
  const username = e.target["username"].value.trim();
  const password = e.target["password"].value.trim();

  localStorage.removeItem("refreshToken");
  localStorage.removeItem("subscriptionToken");
  sessionStorage.removeItem("accessToken");

  inputUsername = 8;
  inputPassword = 9;
  systemCantVerifyLogin = 10;
  headlineSystemIsDown = 11;
  haventRegistered = 12;
  headlineNotRegistered = 13;
  checkUsernamePassword = 14;
  headlineUnableToSignIn = 15;
  headlineLoginNotRecognized = 16;

  if (username === "")
    return showError(
      inputUsername,
      headlineUnableToSignIn,
      "#username"
    );
  if (password === "")
    return showError(
      inputPassword,
      headlineUnableToSignIn,
      "#password"
    );

  const endpoint = `${getHost()}/fp/login`;

  showSpinner(submitButton, submitButtonProgress);
  fetch(endpoint, {
    mode: "cors",
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      switch (data.msg) {
        case "unable to query for user":
          hideSpinner(submitButton, submitButtonProgress);
          showError(
            systemCantVerifyLogin,
            headlineSystemIsDown
          );
          break;
        case "unable to verify login":
          hideSpinner(submitButton, submitButtonProgress);
          showError(
            systemCantVerifyLogin,
            headlineSystemIsDown
          );
          break;
        case "user status is not registered":
          hideSpinner(submitButton, submitButtonProgress);
          showError(
            haventRegistered,
            headlineNotRegistered
          );
          break;
        case "invalid login":
          hideSpinner(submitButton, submitButtonProgress);
          showError(
            checkUsernamePassword,
            headlineLoginNotRecognized
          );
          break;
        case "user authenticated":
          const refreshToken = data.refreshToken;
          const accessToken = data.accessToken;
          const subscriptionToken = data.subscriptionToken || "";
          let passwordmustchange = false;
          try {
            passwordmustchange = JSON.parse(atob(accessToken.split(".")[1]))
              .passwordmustchange;
          } catch (err) {
            console.error(err);
          }
          if (typeof passwordmustchange !== "boolean") {
            passwordmustchange = false;
          }
          localStorage.setItem("refreshToken", refreshToken);
          sessionStorage.setItem("accessToken", accessToken);
          if (subscriptionToken.length) {
            localStorage.setItem("subscriptionToken", subscriptionToken);
          } else {
            localStorage.removeItem("subscriptionToken");
          }

          const accountPage = "../";
          const dashboardPage = `/lang/${getLang()}/`;
          const passwordMustChangePage = "../password-must-change/";
          const subscriptionIsActive = isSubscriptionActive();
          let redirectURL = dashboardPage;
          
          if (!subscriptionIsActive) redirectURL = accountPage;
          if (passwordmustchange) redirectURL = passwordMustChangePage;

          window.location.href = redirectURL;
          break;
        default:
          hideSpinner(submitButton, submitButtonProgress);
          showError(
            checkUsernamePassword,
            headlineUnableToSignIn
          );
          break;
      }
    })
    .catch((error) => {
      hideSpinner(submitButton, submitButtonProgress);
      return {
        msg: error,
        msgType: "error",
      };
    });
}

function attachListeners() {
  document.querySelector("#login").addEventListener("submit", onSubmit);
}

async function init() {
  checkIfOffline();
  supportsPromises();
  await showPhrases();
  hideSpinner(loginForm, spinnerDefault);
  attachListeners();
}

init();