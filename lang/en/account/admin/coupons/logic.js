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

  const mostRecentRedemptionDateFormatted = (most_recent_redemption_date) ? moment(most_recent_redemption_date).format("YYYY/MM/DD") : null;
  const lsDateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const mostRecentRedemptionDateLs = (mostRecentRedemptionDateFormatted) ? new Intl.DateTimeFormat(country, lsDateOptions).format(new Date(mostRecentRedemptionDateFormatted)) : `&mdash;`;
  mostRecentRedemptionDate.innerHTML = (mostRecentRedemptionDateLs.length) ? mostRecentRedemptionDateLs : `&mdash;`;
  if (most_recent_couponcode && most_recent_couponcode.length) {
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

async function onCouponSearched(e, couponClicked="") {
  e.preventDefault();
  let couponcode = (couponClicked.length) ? couponClicked : e.target["couponcode"].value.trim();
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
    return showError(16, 15, "#couponcode");
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
  issuedByEl.innerHTML = `<a href="mailto:${data.issuedby.name} &lt;${data.issuedby.email}&gt;" data-userid="${data.issuedby.userid}">${data.issuedby.name}</a>`;
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
  document.querySelector(".closeButton").scrollIntoView();
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
          showError(42, 41, "#editcouponmodal_couponcode");
          break;
        case "unable to update coupon":
          showError(44, 43);
          break;
        case "coupon updated":
          showError(46, 45, null, {
            onCloseStart: () => {
              /* const modal = M.Modal.getInstance(document.querySelector("#editcouponmodal"));
              modal.close(); */
              window.location.reload();
            }
          });
          break;
      }
    })
    .catch(err => {
      console.error(err);
      hideLoader();
    });
}

function onBtnAddCouponClicked(e) {
  e.preventDefault();
  const modal = M.Modal.getInstance(document.querySelector("#addcouponmodal"));
  const addForm = document.querySelector("#addcoupon");
  addForm.reset();
  modal.open();
  document.querySelector(".closeButton").scrollIntoView();
}

async function onAdd(e) {
  e.preventDefault();
  const discountpercent = parseInt(e.target["addcouponmodal_discountpercent"].value) || 100;
  const couponcode = e.target["addcouponmodal_couponcode"].value.trim().toLowerCase() || "";
  const expiry = e.target["addcouponmodal_expiry"].value.trim();
  const accessToken = await getAccessToken();
  const endpoint = `${getAPIHost()}/fp/coupon-add`;

  const submitButton = document.querySelector("#addcouponmodal_submit");
  const loader = document.querySelector("#addcouponmodal_loader");

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
      discountpercent: discountpercent,
      couponcode: couponcode,
      expiry: expiry,
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
          showError(22, 21, null, {
            onCloseEnd: () => {
              window.location.href = "../";
            }
          });
          break;
        case "coupon code must not be blank":
          showError(16, 15, "#addcouponmodal_couponcode");
          break;
        case "coupon code length must not exceed 255 characters":
          showError(49, 15, "#addcouponmodal_couponcode");
          break;
        case "expiry must not be blank":
          showError(36, 15, "#addcouponmodal_expiry");
          break;
        case "invalid expiry date":
          showError(37, 15, "#addcouponmodal_expiry");
          break;
        case "expiry must be in the future":
          showError(38, 15, "#addcouponmodal_expiry");
          break;
        case "discount percent must be numeric":
          showError(44, 23);
          break;
        case "discount must not exceed 100 percent":
          showError(44, 23);
          break;
        case "unable to query for existing coupon":
          showError(44, 23);
          break;
        case "coupon code already in use":
          showError(42, 41, "#addcouponmodal_couponcode");
          break;
        case "unable to insert coupon":
          showError(44, 23);
          break;
        case "coupon added":
          showError(51, 50, null, {
            onCloseStart: () => {
              /* const modal = M.Modal.getInstance(document.querySelector("#addcouponmodal"));
              modal.close(); */
              window.location.reload();
            }
          });
          break;
      }
    })
    .catch(err => {
      console.error(err);
      hideLoader();
    });
}

function showCouponList(data, country="us") {
  const couponlist = document.querySelector("#couponlist");
  let html = "";
  
  data.forEach(item => {
    const { couponid, couponcode, expiry, discountpercent, isdiscontinued, issuer } = item;
    const { userid, name } = issuer;
    const formattedExpiry = moment(expiry).format("YYYY/MM/DD");
    const lsDateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const lsExpiry = new Intl.DateTimeFormat(country, lsDateOptions).format(new Date(formattedExpiry));

    html += `
      <li>
        <div class="collapsible-header">${couponcode}</div>
        <div class="collapsible-body">
          <p>
            <strong>${phrase(11, false)}:</strong><br>
            <code>${couponcode}</code>
          </p>

          ${isdiscontinued ? '<p><strong class="red-text">' + phrase(55, false) + '</strong></p>' : ""}
          
          <p>
            <strong>${phrase(57, false)}</strong><br>
            ${discountpercent}%
          </p>
          
          <p>
            <strong>${phrase(54, false)}</strong><br>
            ${lsExpiry}
          </p>

          <p>
            <strong>${phrase(56, false)}</strong><br>
            ${name}
          </p>

          <p class="mt-2">
            <a class="btn editFromList" data-couponcode="${couponcode}">${phrase(58, false)}</a>
          </p>
        </div>
      </li>
    `;
  });

  html = `
    <div class="row">
      <div class="col s12 m4 offset-m4">
        <p class="center-align">
          <strong>${phrase(59, null)}</strong>
          <div class="mb-1 center-align">
            ${phrase(60, null)}
          </div>
        </p>
        <ul class="collapsible">
          ${html}
        </ul>
      </div>
    </div>
  `;

  couponlist.innerHTML = html;
  $('.collapsible').collapsible();
  document.querySelectorAll(".editFromList").forEach(item => {
    item.addEventListener("click", onListItemClicked);
  });
}

function onListItemClicked(e) {
  const couponcode = e.target.dataset.couponcode || "";
  onCouponSearched(e, couponcode);
}

async function onBtnListCouponsClicked(e) {
  e.preventDefault();
  const accessToken = await getAccessToken();
  const endpoint = `${getAPIHost()}/fp/coupon-list`;
  const button = document.querySelector("#btnListCoupons");
  const buttonContainer = document.querySelector("#btnListCoupons_container");
  const loader = document.querySelector("#couponlist_loader");
  const couponlist = document.querySelector("#couponlist");
  const country = JSON.parse(atob(accessToken.split(".")[1])).country || "us";

  const showLoader = () => {
    button.setAttribute("disabled", true);
    loader.classList.remove("hide");
    couponlist.classList.add("hide");
  }

  const hideLoader = () => {
    button.removeAttribute("disabled");
    loader.classList.add("hide");
  }

  showLoader();
  fetch(endpoint, {
    mode: "cors",
    method: "POST",
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
          });
          break;
        case "unable to retrieve coupons":
          showError(44, 23);
          break;
        case "no coupons found":
          showError(53, 52);
          break;
        case "coupons retrieved":
          showCouponList(data.data, country);
          buttonContainer.classList.add("hide");
          couponlist.classList.remove("hide");
          couponlist.scrollIntoView();
          break;
      }
    })
    .catch(err => {
      console.error(err);
      hideLoader();
    });
}

function addEventListeners() {
  document.querySelector("#couponsearch").addEventListener("submit", onCouponSearched);
  document.querySelector("#editcoupon").addEventListener("submit", onEdit);
  document.querySelector("#btnAddCoupon").addEventListener("click", onBtnAddCouponClicked)
  document.querySelector("#addcoupon").addEventListener("submit", onAdd);
  document.querySelector("#btnListCoupons").addEventListener("click", onBtnListCouponsClicked);
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