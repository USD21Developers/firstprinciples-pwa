function hideDefaultSpinner() {
  const spinner = document.querySelector("#spinnerDefault");
  const content = document.querySelector("main");

  hideSpinner(content, spinner);
}

async function confirmAccess() {
  const canAccess = await canAccessAdministration() || false;
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

async function getCountryNames(abbreviations=[]) {
  const endpoint = "../_assets/json/countries.json";
  return new Promise((resolve, reject) => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const namesArray = data.filter(item => {
          if (abbreviations.includes(item.alpha2)) {
            return item.name;
          }
          return;
        }).map(item2 => item2.name).sort();
        let nameList = "";
        for (let i = 0; i < namesArray.length; i++) {
          const name = namesArray[i];
          nameList += (i < namesArray.length - 1) ? `${name}, ` : `${name}`;
        }
        resolve(nameList.trim());
      })
      .catch(err => {
        console.error(err);
        reject(err);
      });
  });
}

async function showStats(data, country) {
  const { active_subscribers=0, total_users=0, amt_raised=0, countries=[], languages=[] } = data;
  const num_countries = countries.length || 0;
  const num_languages = languages.length || 0;
  const numActiveSubscribers = document.querySelector("#numActiveSubscribers");
  const numTotalUsers = document.querySelector("#numTotalUsers");
  const amtRaised = document.querySelector("#amtRaised");
  const numCountries = document.querySelector("#numCountries");
  const numLanguages = document.querySelector("#numLanguages");

  numActiveSubscribers.innerHTML = active_subscribers;
  numTotalUsers.innerHTML = total_users;
  amtRaised.innerHTML = (country === "us") ? `$${Number(amt_raised || 0).toLocaleString(country)} <span style="font-variant:small-caps;">usd</span>` : `$ ${Number(amt_raised || 0).toLocaleString(country)} <span style="font-variant:small-caps;">usd</span>`;
  
  numCountries.innerHTML = num_countries;
  if (num_countries >= 1) {
    const countryNames = await getCountryNames(countries);

    numCountries.setAttribute("data-tooltip", countryNames);
    numCountries.setAttribute("data-position", "bottom");
  }

  numLanguages.innerHTML = num_languages;
  if (num_languages >= 1) {
    let languageAbbrs = "";
    for (let j = 0; j < num_languages; j++) {
      const languageAbbr = languages[j];
      languageAbbrs += languageAbbr;
      if (j < (num_languages - 1)) {
        languageAbbrs += ", ";
      }
    }
    numLanguages.setAttribute("data-tooltip", languageAbbrs);
    numLanguages.setAttribute("data-position", "bottom");
  }
}

async function populateStats() {
  const accessToken = await getAccessToken();
  const endpoint = `${getAPIHost()}/fp/admin-metadata`;
  const country = JSON.parse(atob(accessToken.split(".")[1])).country || "us";

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
          break;
        case "unable to query for admin metadata":
          break;
        case "no admin metadata available":
          break;
        case "unable to query for user countries":
          break;
        case "no user countries found":
          break;
        case "unable to query for user languages":
          break;
        case "no user languages found":
          break;
        case "admin metadata retrieved":
          showStats(data.data, country);
          break;
      }
    })
    .catch(err => {
      console.log(err);
    });
}

async function init() {
  confirmAccess();
  await showPhrases();
  populateStats();
  hideDefaultSpinner();
  couponLink();
  // preauthUsersLink();
}

init();