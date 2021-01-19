function populateMetaData(data) {
  const { num_active, num_expired, num_discontinued, num_redeemed, most_recent_couponcode, most_recent_redemption_date, cumulative_amount } = data;
  
  const numActive = document.querySelector("#numActive");
  const numExpired = document.querySelector("#numExpired");
  const numDiscontinued = document.querySelector("#numDiscontinued");
  const numRedeemed = document.querySelector("#numRedeemed");
  const mostRecentCouponCode = document.querySelected("#mostRecentCouponCode");
  const mostRecentRedemptionDate = document.querySelector("#mostRecentRedemptionDate");
  const cumulativeAmount = document.querySelector("#cumulativeAmount");

  numActive.innerHTML = num_active;
  numExpired.innerHTML = num_expired;
  numDiscontinued.innerHTML = num_discontinued;
  numRedeemed.innerHTML = num_redeemed;
  mostRecentCouponCode.innerHTML = most_recent_couponcode;
  mostRecentRedemptionDate.innerHTML = most_recent_redemption_date;
  cumulativeAmount.innerHTML = cumulative_amount;
}

async function getMetadata() {
  const accessToken = await getAccessToken();
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
      populateMetaData(data.data);
    })
    .catch(err => {
      console.error(err);
    });
}

async function init() {
  await showPhrases();
  getMetadata();
}

init();