var retrievedContent = "";

function showSpinner(elementToToggle, spinnerElement) {
  elementToToggle.classList.add("hide");
  spinnerElement.classList.remove("hide");
  // console.log("spinner activated", elementToToggle);
}

function hideSpinner(elementToToggle, spinnerElement) {
  elementToToggle.classList.remove("hide");
  spinnerElement.classList.add("hide");
  // console.log("spinner deactivated", elementToToggle);
}

function supportsPromises() {
  let supportsPromises = false;

  if(typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1) {
    supportsPromises = true;
  }

  if (!supportsPromises) {
    console.warn("Promises are required for this app, but are not supported in this browser.  Redirecting...");
    window.location.href = window.location.host;
  }
}

function getContent() {
  return new Promise((resolve, reject) => {
    fetch("content.xml")
    .then(res => res.text())
    .then(data => {
      const xml = new DOMParser().parseFromString(data, "text/xml");
      resolve(xml);
    })
    .catch(err => {
      console.error(err);
      reject(err);
    });
  });
}

function toggleSpinner() {
  const spinner = document.querySelector(".spinner");
  spinner?.classList.toggle("hide");
}

function phrase(id, inject = true) {
  const entries = Object.entries(retrievedContent);
  let item = entries.find(item => item[1].id == `${id}`)[1];
  const original = item.querySelector("original").innerHTML.trim();
  let translated = item.querySelector("translated").innerHTML.trim();
  translated = (!translated.length) ? original : translated.trim();

  item.querySelectorAll("change").forEach(changeItem => {
    const isBold = ( changeItem.hasAttribute("bold") && changeItem.getAttribute("bold") === "true") ? true : false;
    const isItalic = ( changeItem.hasAttribute("italic") && changeItem.getAttribute("italic") === "true") ? true : false;
    const isLink = ( changeItem.hasAttribute("href") && changeItem.getAttribute("href").length) ? true : false;
    
    const changeOriginal = changeItem.querySelector("original").innerHTML.trim();
    let changeTranslated = changeItem.querySelector("translated").innerHTML;
    changeTranslated = (!changeTranslated.length) ? changeOriginal : changeTranslated.trim();

    let change = changeTranslated;
    
    if (isBold) change = `<strong>${change}</strong>`;
    if (isItalic) change = `<em>${change}</em>`;
    if (isLink) {
      const link = changeItem.getAttribute("href");
      const isExternalLink = (link.indexOf("http://") >= 0 || link.indexOf("https://") >= 0) || false;
      if (isExternalLink) {
        change = `<a href="${changeItem.getAttribute('href')}" target="_blank" rel="nofollow">${change}</a>`;
      } else {
        change = `<a href="${changeItem.getAttribute('href')}">${change}</a>`;
      }
    }

    translated = translated.replace(changeTranslated, change);
  });

  if (inject) {
    document.querySelectorAll(`[data-p${id}]`).forEach(item => {
      item.innerHTML = translated;
    });
  }
  
  return translated;
}

async function showPhrases() {
  const parsedXML = await getContent();
  const phrases = parsedXML.querySelectorAll("phrase");

  retrievedContent = phrases;

  toggleSpinner();
  
  phrases.forEach(item => {
    const id = item.getAttribute("id");
    const original = item.querySelector("original").innerHTML.trim();
    let translated = item.querySelector("translated").innerHTML.trim();
    translated = (!translated.length) ? original : translated.trim();

    item.querySelectorAll("change").forEach(changeItem => {
      const isBold = ( changeItem.hasAttribute("bold") && changeItem.getAttribute("bold") === "true") ? true : false;
      const isItalic = ( changeItem.hasAttribute("italic") && changeItem.getAttribute("italic") === "true") ? true : false;
      const isLink = ( changeItem.hasAttribute("href") && changeItem.getAttribute("href").length) ? true : false;
      
      const changeOriginal = changeItem.querySelector("original").innerHTML.trim();
      let changeTranslated = changeItem.querySelector("translated").innerHTML;
      changeTranslated = (!changeTranslated.length) ? changeOriginal : changeTranslated.trim();

      let change = changeTranslated;
      
      if (isBold) change = `<strong>${change}</strong>`;
      if (isItalic) change = `<em>${change}</em>`;
      if (isLink) {
        const link = changeItem.getAttribute("href");
        const isExternalLink = (link.indexOf("http://") >= 0 || link.indexOf("https://") >= 0) || false;
        if (isExternalLink) {
          change = `<a href="${changeItem.getAttribute('href')}" target="_blank" rel="nofollow">${change}</a>`;
        } else {
          change = `<a href="${changeItem.getAttribute('href')}">${change}</a>`;
        }
      }

      translated = translated.replace(changeTranslated, change);
    });

    document.querySelectorAll(`[data-p${id}]`).forEach(item => {
      item.innerHTML = translated;
    });
  });

  return new Promise((resolve, reject) => {
    resolve();
  });
}

function getLang() {
  const lang = window.location.pathname.substring(6, 8);
  return lang;
}

// Function to focus on form field
function focusOnField(selector) {
  console.log("focusOnField");
  const field = document.querySelector(selector);
  try {
    field.scrollIntoView({
      behavior: "smooth"
    });
  } catch(e) {
    field.scrollIntoView();
  }
  field.value = field.value + "";
  field.focus();
  field.select();
  M.updateTextFields();
}

function focusOnFormField(fieldSelector) {
  const modalElems = document.querySelectorAll("#modal1");
  const modalOptions = {
    onCloseEnd: () => {
      const el = document.querySelector(fieldSelector);
      const yOffset = -35;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      el.focus();
      window.scrollTo(0, y);
    }
  }
  M.Modal.init(modalElems, modalOptions);
}

function showError(textId, headlineId, fieldSelector) {
  const h5 = document.querySelector("#modal1 h5");
  const p = document.querySelector("#modal1 p");
  h5.setAttribute(`data-p${headlineId}`, "");
  p.setAttribute(`data-p${textId}`, "");
  phrase(headlineId);
  phrase(textId);
  if (fieldSelector) focusOnFormField(fieldSelector);
  $("#modal1").modal("open");
}

function getHost(forceRemote = false) {
  const local = "http://localhost:4000";
  const remote = "https://api.usd21.org";
  const host = window.location.hostname === "localhost" ? local : remote;
  return forceRemote ? remote : host;
}