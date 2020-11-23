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

function phrase(id, content) {
  const phrase = content.querySelector(`phrase[id='${id}']`);
  const original = phrase.querySelector("original").innerHTML.trim();
  let translated = phrase.querySelector("translated").innerHTML.trim();

  if (translated.length === 0) translated = original;
  
  content.querySelectorAll("change").forEach(item => {
    const c_original = item.querySelector("original").innerHTML.trim();
    const c_translated = item.querySelector("translated").innerHTML.trim();
    const isBold = item.getAttribute("bold") === "true" ? true : false;
    const isItalic = item.getAttribute("italic") === "true" ? true : false;
    const href = item.getAttribute("href")?.length? item.getAttribute("href") : false;

    if (c_translated.length === 0) c_translated = c_original;

    let changed = c_translated;

    if (href) changed = `<a href="${href}" target="_blank" rel="noreferrer">${changed}</a>`;
    if (isItalic) changed = `<em>${changed}</em>`;
    if (isBold) changed = `<strong>${changed}</strong>`;

    translated = translated.replace(c_translated, changed);
  });
  document.querySelectorAll(`[data-p${id}]`).forEach(item => {
    item.innerHTML = translated;
  });
}

function toggleSpinner() {
  const spinner = document.querySelector(".spinner");
  spinner.classList.toggle("hide");
}

async function showPhrases() {
  const content = await getContent();
  const phrases = content.querySelectorAll("phrase");
  
  phrases.forEach(item => {
    const id = item.getAttribute("id");
    phrase(id, content);
  })
}

function getLang() {
  const lang = window.location.pathname.substring(6, 8);
  return lang;
}