function onSubmit(e) {
  e.preventDefault();
  const endpoint = `${getHost()}/fp/reset-password`;
  const token = window.location.hash.substring(1, window.location.hash.length).trim() || "";
  const newPassword = document.querySelector("#password").value.trim();

  if (!newPassword.length) return showError(13, 12, "#password");

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
          showError(11, 9, null, {
            onCloseEnd: () => {
              window.location.href = "../account/pw-forgot/";
            }
          });
          break;
        case "token is expired":
          showError(10, 9, null, {
            onCloseEnd: () => {
              window.location.href = "../account/pw-forgot/";
            }
          });
          break;
        case "password is missing":
          showError(13, 12, "#password");
          break;
        case "new password lacks sufficient complexity":
          showError(15, 9, "#password");
          break;
        case "password updated":
          showError(7, 6, null, {
            onCloseEnd: () => {
              window.location.href = "../account/login/";
            }
          });
          break;
        default:
          showError(16, 9);
          break;
      }
    })
    .catch(err => {
      console.error(err);
    })
}

function attachEventListeners() {
  document.querySelector("#formResetPassword").addEventListener("submit", onSubmit);
}

function init() {
  attachEventListeners();
  showPhrases();
}

init();