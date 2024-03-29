function onSubmit(e) {
  e.preventDefault();
  const endpoint = `${getHost()}/fp/reset-password`;
  const token = window.location.hash.substring(1, window.location.hash.length).trim() || "";
  const newPassword = document.querySelector("#password").value.trim();
  const submitButton = document.querySelector("#submit");
  const spinner = document.querySelector("#spinner");
  const main = document.querySelector("#main");

  if (!newPassword.length) return showError(13, 12, "#password");

  showSpinner(submitButton, spinner);

  fetch(endpoint, {
    mode: "cors",
    method: "POST",
    body: JSON.stringify({
      token: token,
      newPassword: newPassword,
    }),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(res => res.json())
    .then(data => {
      switch(data.msg) {
        case "token not found":
          main.classList.add("hide");
          showError(11, 9, null, {
            onCloseEnd: () => {
              window.location.href = "../account/pw-forgot/";
            }
          });
          break;
        case "token is expired":
          main.classList.add("hide");
          showError(10, 9, null, {
            onCloseEnd: () => {
              window.location.href = "../account/pw-forgot/";
            }
          });
          break;
        case "password is missing":
          showError(13, 12, "#password", null, {
            onCloseEnd: () => {
              hideSpinner(submitButton, spinner);
            }
          });
          break;
        case "new password lacks sufficient complexity":
          showError(15, 9, "#password", null, {
            onCloseEnd: () => {
              hideSpinner(submitButton, spinner);
            }
          });
          break;
        case "password updated":
          main.classList.add("hide");
          showError(7, 6, null, {
            onCloseEnd: () => {
              window.location.href = "../account/login/";
            }
          });
          break;
        default:
          showError(16, 9, null, {
            onCloseEnd: () => {
              hideSpinner(submitButton, spinner);
            }
          });
          break;
      }
    })
    .catch(err => {
      console.error(err);
    })
}

function toggleSpinner() {
  const spinner = document.querySelector("#spinnerDefault");
  const main = document.querySelector("#main");

  hideSpinner(main, spinner);
}

function attachEventListeners() {
  document.querySelector("#formResetPassword").addEventListener("submit", onSubmit);
}

async function init() {
  attachEventListeners();
  await showPhrases();
  toggleSpinner();
}

init();