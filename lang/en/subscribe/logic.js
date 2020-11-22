(() => {

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
    let changed = translated;
    content.querySelectorAll("change").forEach(item => {
      const isBold = item.getAttribute("bold") === "true" ? true : false;
      const isItalic = item.getAttribute("italic") === "true" ? true : false;
      const href = item.getAttribute("href")?.length? item.getAttribute("href") : false;

      if (href) changed = `<a href="${href}" target="_blank" rel="noreferrer">${changed}</a>`;
      if (isItalic) changed = `<em>${changed}</em>`;
      if (isBold) changed = `<strong>${changed}</strong>`;
    });
    document.querySelectorAll(`[data-p${id}]`).forEach(item => {
      item.innerHTML = changed;
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

  function init() {
    supportsPromises();
    toggleSpinner();
    showPhrases();
  }

  init();

})();