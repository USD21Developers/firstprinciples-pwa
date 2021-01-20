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
  mostRecentRedemptionDate.innerHTML = (most_recent_redemption_date) ? moment.utc("2021-01-19 15:31").format("YYYY-MM-DD") : `&mdash;`;
  if (most_recent_couponcode.length) {
    mostRecentRedemptionDate.setAttribute("data-tooltip", most_recent_couponcode);
    mostRecentRedemptionDate.setAttribute("data-position", "bottom");
  }
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
      switch(data.msg) {
        case "user is not authorized for this action":
          showError(22, 21, null, {
            onCloseStart: () => {
              return window.location.href = "../";
            }
          })
          break;
        case "unable to get coupon metadata":
          showError(24, 25);
          return new Promise((resolve, reject) => reject());
        case "no coupon metadata found":
          return new Promise((resolve, reject) => resolve());
        case "coupon metadata retrieved":
          populateMetaData(data.data, country);
          return new Promise((resolve, reject) => resolve());
      }
    })
    .catch(err => {
      console.error(err);
    });
}

function toggleSpinner() {
  const content = document.querySelector("main");
  const spinner = document.querySelector("#spinnerDefault");

  hideSpinner(content, spinner);
}

function showBreadcrumbs() {
  document.querySelector(".breadcrumbs").classList.remove("hide");
}

function resetSearchForm() {
  const form = document.querySelector("#couponsearch");
  const couponcode = document.querySelector("#couponcode");

  couponcode.blur();
  form.reset();
}

async function onSubmit(e) {
  e.preventDefault();
  const couponcode = e.target["couponcode"].value.trim() || "";
  const accessToken = await getAccessToken();
  const endpoint = `${getAPIHost()}/fp/coupon-search`;
  const submitButton = document.querySelector("#couponsearch_submitbutton");
  const loader = document.querySelector("#couponsearch_loader");

  const showLoader = () => {
    submitButton.setAttribute("disabled", true);
    loader.classList.remove("hide");
  }

  const hideLoader = () => {
    submitButton.removeAttribute("disabled");
    loader.classList.add("hide");
  }

  // Validate
  if (!couponcode.length) {
    showError(16, 15, "#couponcode");
  }

  // Fetch
  showLoader();
  fetch(endpoint, {
    mode: "cors",
    method: "POST",
    body: JSON.stringify({
      couponcode: couponcode
    }),
    headers: new Headers({
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`
    })
  })
    .then(res => res.json())
    .then(data => {
      hideLoader();
      switch(data.msg) {
        case "user is not authorized for this action":
          showError(22, 21, null, {
            onCloseEnd: () => {
              window.location.href = "../";
            }
          })
          break;
        case "coupon code must not be blank":
          showError(16, 15, "#couponcode");
          break;
        case "unable to retrieve coupon":
          showError(24, 23);
          break;
        case "coupon not found":
          showError(26, 25, "#couponcode");
          break;
        case "coupon retrieved":
          resetSearchForm();
          showEditCoupon(data.data);
          break;
      }
    })
    .catch(err => {
      console.error(err);
      resetSearchForm();
      hideLoader();
    });
}

async function showEditCoupon(data) {
  const modal = M.Modal.getInstance(document.querySelector("#editcouponmodal"));
  const form = document.querySelector("#editcoupon");
  const couponIdEl = document.querySelector("#editcouponmodal_couponid");
  const issuedByEl = document.querySelector("#editcouponmodal_issuedby")
  const couponCodeEl = document.querySelector("#editcouponmodal_couponcode");
  const discountPctEl = document.querySelector("#editcouponmodal_discountpercent");
  const expiryEl = document.querySelector("#editcouponmodal_expiry");
  const discontinuedNoEl = document.querySelector("#editcouponmodal_discontinued_no");
  const discontinuedYesEl = document.querySelector("#editcouponmodal_discontinued_yes");
  const timezone = moment.tz.guess();

  // Populate
  couponIdEl.value = data.couponid;
  issuedByEl.innerHTML = `<a href="../users/id/#${data.issuedby.userid}">${data.issuedby.name}</a>`;
  couponCodeEl.value = data.couponcode;
  discountPctEl.value = data.discountpercent;
  expiryEl.value = moment(data.expiry).tz(timezone).format("YYYY-MM-DD");
  expiryEl.innerHTML = phrase(30, false);
  discontinuedNoEl.checked = data.isdiscontinued === 0 ? true : false;
  discontinuedYesEl.checked = data.isdiscontinued === 1 ? true : false;

  // Initiate
  M.updateTextFields();
  M.FormSelect.init(document.querySelectorAll('select'));
  resetSearchForm();
  modal.open();
}

async function onEdit(e) {
  e.preventDefault();
  const accessToken = await getAccessToken();
  const endpoint = `${getAPIHost()}/fp/coupon-edit`;
  const couponid = parseInt(e.target["editcouponmodal_couponid"].value.trim()) || "";
  const couponcode = e.target["editcouponmodal_couponcode"].value.trim().toLowerCase() || "";
  const discountpercent = parseInt(e.target["editcouponmodal_discountpercent"].value.trim());
  const expiry = e.target["editcouponmodal_expiry"].value.trim();
  const isdiscontinued = e.target["editcouponmodal_discontinued_yes"].checked ? true : false;
  const timezone = moment.tz.guess();
  const submitButton = document.querySelector("#editcouponmodal_submit");
  const loader = document.querySelector("#editcouponmodal_loader");

  const showLoader = () => {
    submitButton.setAttribute("disabled", true);
    loader.classList.remove("hide");
  }

  const hideLoader = () => {
    submitButton.removeAttribute("disabled");
    loader.classList.add("hide");
  }

  showLoader();
  fetch(endpoint, {
    mode: "cors",
    method: "POST",
    body: JSON.stringify({
      couponid: couponid,
      couponcode: couponcode,
      discountpercent: discountpercent,
      expiry: expiry,
      isdiscontinued: isdiscontinued,
      timezone: timezone
    }),
    headers: new Headers({
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    })
  })
    .then(res => res.json())
    .then(data => {
      hideLoader();
      switch(data.msg) {
        case "user is not authorized for this action":
          showError(22, 21);
          break;
        case "coupon id must not be blank":
          showError(44, 43);
          break;
        case "coupon id must be numeric":
          showError(44, 43);
          break;
        case "coupon code must not be blank":
          showError(16, 15, "#editcouponmodal_couponcode");
          break;
        case "expiry must not be blank":
          showError(36, 15, "#editcouponmodal_expiry");
          break;
        case "invalid expiry date":
          showError(37, 15, "#editcouponmodal_expiry");
          break;
        case "expiry must be in the future":
          showError(38, 15, "#editcouponmodal_expiry");
          break;
        case "discount percent must be numeric":
          showError(44, 43);
          break;
        case "discount must not exceed 100 percent":
          showError(44, 43);
          break;
        case "unable to query for existing coupon":
          showError(44, 43);
          break;
        case "coupon not found":
          showError(39, 25);
          break;
        case "user may not edit another user's coupons":
          showError(40, 21);
          break;
        case "unable to check for duplicate couponcode":
          showError(44, 43);
          break;
        case "coupon code is already in use":
          showError(42, 41);
          break;
        case "unable to update coupon":
          showError(44, 43);
          break;
        case "coupon updated":
          showError(46, 45, null, {
            onCloseStart: () => {
              const modal = M.Modal.getInstance(document.querySelector("#editcouponmodal"));
              modal.close();
            }
          })
          break;
      }
    })
    .catch(err => {
      console.error(err);
      hideLoader();
    });
}

function addEventListeners() {
  document.querySelector("#couponsearch").addEventListener("submit", onSubmit);
  document.querySelector("#editcoupon").addEventListener("submit", onEdit);
}

async function init() {
  checkIfOffline();
  addEventListeners();
  await showPhrases();
  await getMetadata();
  toggleSpinner();
  showBreadcrumbs();
}

init();