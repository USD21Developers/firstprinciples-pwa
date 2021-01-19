function populateMetaData(data, country="us") {
  const { num_active, num_expired, num_discontinued, num_redeemed, most_recent_couponcode, most_recent_redemption_date, cumulative_amount } = data;
  
  const numActive = document.querySelector("#numActive");
  const numExpired = document.querySelector("#numExpired");
  const numDiscontinued = document.querySelector("#numDiscontinued");
  const numRedeemed = document.querySelector("#numRedeemed");
  const mostRecentCouponCode = document.querySelector("#mostRecentCouponCode");
  const mostRecentRedemptionDate = document.querySelector("#mostRecentRedemptionDate");
  const cumulativeAmount = document.querySelector("#cumulativeAmount");

  numActive.innerHTML = (num_active.toString().length) ? num_active : `&mdash;`;
  numExpired.innerHTML = (num_expired.toString().length) ? num_expired : `&mdash;`;
  numDiscontinued.innerHTML = (num_discontinued.toString().length) ? num_discontinued : `&mdash;`;
  numRedeemed.innerHTML = (num_redeemed.toString().length) ? num_redeemed : `&mdash;`;
  cumulativeAmount.innerHTML = (country === "us") ? `$${Number(cumulative_amount || 0).toLocaleString(country)} <span style="font-variant:small-caps;">usd</span>` : `$ ${Number(cumulative_amount || 0).toLocaleString(country)} <span style="font-variant:small-caps;">usd</span>`;
  mostRecentCouponCode.innerHTML = mostRecentCouponCode.length ? `"${most_recent_couponcode}"` : `&mdash;`;
  mostRecentRedemptionDate.innerHTML = (most_recent_redemption_date) ? moment.utc("2021-01-19 15:31").format("YYYY-MM-DD") : "";
}

async function getMetadata() {
  const accessToken = await getAccessToken();
  const parsed = JSON.parse(atob(accessToken.split(".")[1]));
  const country = parsed.country;
  const endpoint = `${getAPIHost()}/fp/coupon-metadata`;

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
      populateMetaData(data.data, country);
    })
    .catch(err => {
      console.error(err);
    });
}

function onSubmit(e) {
  e.preventDefault();
  const couponcode = e.target["couponcode"].value.trim() || "";
  // TODO:  build this out
}

function addEventListeners() {
  document.querySelector("#couponsearch").addEventListener("submit", onSubmit);
}

async function init() {
  checkIfOffline();
  addEventListeners();
  await showPhrases();
  getMetadata();
}

init();