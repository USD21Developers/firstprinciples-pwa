function checkConfirmationToken() {
  const hash = document.location.hash.substring(1, document.location.hash.length) || "";
  const endpoint = `${getHost()}/fp/register-confirm`;

  fetch(endpoint, {
    mode: "cors",
    method: "POST",
    body: JSON.stringify({
      token: hash,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    })
  })
    .then(res => res.json())
    .then(data => {
      //
    })
    .catch(err => {
      console.error(err);
    });
}

function init() {
  showPhrases();
  checkConfirmationToken();
}

init();