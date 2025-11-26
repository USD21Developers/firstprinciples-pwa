const fp = {};

fp.sendMessageToSW = msg => {
  return new Promise((resolve, reject) => {
    const msg_chan = new MessageChannel();
    msg_chan.port1.onmessage = event => {
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
    };
    navigator.serviceWorker.controller.postMessage(`Client 1 says ${msg}`, [msg_chan.port2]);
  });
};

fp.getPath = (fromKey, lang) => {
  let path;
  if (fromKey === 'index') {
    path = 'lang/' + lang + '/';
  } else if (fromKey === 'dashboard') {
    path = './';
  } else {
    path = '../';
  }
  return path;
};

fp.loadKeys = async fromKey => {
  let url;
  let lang;
  let keys;
  let absoluteUrl;
  if (fromKey === 'dashboard') {
    url = './keys.json';
  } else {
    url = '../keys.json';
  }
  lang = await fp.language.get();
  keys = await $.ajax({url: url});
  return new Promise(async function(resolve, reject){
    if (! keys) reject("Keys not found.");
    fp.language.set(keys.lang);
    resolve(keys);
  });
};

fp.showFooter = (key, lang) => {
  const urlPrefix = fp.getPath(key, lang);
  const urlContent = urlPrefix + 'global/footer/content.xml';
  const urlLogic = urlPrefix + 'global/footer/logic.js';
  return new Promise((resolve, reject) => {
    $.ajax({
      url: urlContent,
      error: err => {
        console.error(err);
        reject(error);
      },
      success: content => {
        fp.view.footer = content;
        $.ajax({
          url: urlLogic,
          dataType: 'script',
          cache: true,
          error: err => {
            console.error(err);
          },
          success: () => {
            $('.page-footer').removeClass('hide');
            resolve();
          }
        });
      }
    });  
  });
};

fp.showContent = (key, lang, selector, cb) => {
  if (! selector) selector = '.fp_pagecontent';
  let urlPrefix = fp.getPath(key, lang);
  const urlContent = urlPrefix + key + '/content.xml';
  const urlLogic = urlPrefix + key + '/logic.js';
  fp.view = {
    key: key,
    containers: {
      title: $('.fp_pagehead'),
      content: $('.fp_pagecontent')
    },
    content: ''
  };
  $.ajax({
    url: urlContent,
    error: err => {
      console.error(err);
    },
    success: content => {
      fp.view.content = content;
      $.ajax({
        url: urlLogic,
        dataType: 'script',
        cache: true,
        error: err => {
          console.error(err);
        },
        success: () => {
          fp.showFooter(fp.view.key, fp.language.current).then(() => {
            fp.enableInstall();
            fp.onInstall();
            fp.enableShare();
            if (cb) cb();
          });
          if (fp.view.key === 'light-darkness') {
            setTimeout(() => {
              $('.light-darkness_baptism-earth').first().css('height', $('.light-darkness_baptism-water').first().outerHeight());
            }, 500);
          }
        }
      });
    }
  });
};

fp.phrase = phraseObj => {
  let phraseHTML;
  if (fp.language.current === 'en') {
    phraseHTML = $(phraseObj).find('original')[0].innerHTML.trim();
  } else {
    phraseHTML = $(phraseObj).find('translated')[0].innerHTML.trim();
  }
  const changes = $(phraseObj).find('change');
  const changesLength = changes.length;
  let i;
  if (changesLength === 0) return phraseHTML;
  for (i = 0; i < changesLength; i++) {
    const change = changes[i];
    let changeHTMLBefore;
    if (fp.language.current === 'en') {
      changeHTMLBefore = $(change).find('original')[0].innerHTML.trim();
    } else {
      changeHTMLBefore = $(change).find('translated')[0].innerHTML.trim();
    }
    let changeHTMLAfter = changeHTMLBefore;
    let bold = 'false';
    let italic = 'false';
    let modal = 'false';
    let scripturekey = '';
    let href = '';
    if (change.attributes.hasOwnProperty('bold')) {
      bold = change.attributes['bold'].value;
    }
    if (change.attributes.hasOwnProperty('italic')) {
      italic = change.attributes['italic'].value;
    }
    if (change.attributes.hasOwnProperty('modal')) {
      modal = change.attributes['modal'].value;
    }
    if (change.attributes.hasOwnProperty('scripturekey')) {
      scripturekey = change.attributes['scripturekey'].value;
    }
    if (change.attributes.hasOwnProperty('href')) {
      href = change.attributes['href'].value;
    }
    if (changeHTMLAfter.length === 0) continue;
    if (bold === 'true') {
      changeHTMLAfter = '<strong>' + changeHTMLAfter + '</strong>';
    }
    if (italic === 'true') {
      changeHTMLAfter = '<em>' + changeHTMLAfter + '</em>';
    }
    if (scripturekey.length > 0) {
      if (modal === 'true') {
        changeHTMLAfter = '<a href="#" data-scripturekey="' + scripturekey + '" data-modal="true">' + changeHTMLAfter + '</a>';
      } else {
        if ((scripturekey.substr(0,8) === 'https://') || (scripturekey.substr(0,7) === 'http://')) {
          changeHTMLAfter = '<a href="' + scripturekey + '">' + changeHTMLAfter + '</a>';
        } else {
          changeHTMLAfter = '<a href="#" data-scripturekey="' + scripturekey + '">' + changeHTMLAfter + '</a>';
        }
      }
    }
    if (href.length > 0) {
      const isLinkExternal = ((href.indexOf('http://')>=0) || (href.indexOf('https://')>=0));
      if (isLinkExternal) {
        changeHTMLAfter = '<a href="' + href + '" target="_blank" rel="noreferrer">' + changeHTMLAfter + '</a>';
      } else {
        changeHTMLAfter = '<a href="' + href + '">' + changeHTMLAfter + '</a>';
      }
    }
    phraseHTML = phraseHTML.replace(changeHTMLBefore, changeHTMLAfter);
  }
  return phraseHTML;
};

fp.media = mediaObj => {
  let mediaHTML = '';
  if (mediaObj.length === 0) return mediaHTML;
  const recordings = mediaObj.find('recording');
  if (recordings.length === 0) return mediaHTML;
  let recordingsLength = recordings.length;
  for(let i=0; i<recordingsLength; i++) {
    const recording = $(recordings[i]);
    const recordingID = recording.attr('uuid');
    const recordingLabel = recording.attr('label');
    const embeds = recording.find('embed');
    if (embeds.length > 0) {
      let embedHTML = '';
      const embed = embeds[0];
      const embedType = embed.attributes['type'].value;
      const sources = $(embed).find('source');
      if (sources.length > 0) {
        if (embedType === 'audio') {
          embedHTML += `
            <audio 
              controls 
              crossorigin="anonymous" 
              id="recording-${recordingID}"
            >`;
          for (let j=0; j<sources.length; j++) {
            let source = sources[j];
            embedHTML += `<source crossorigin="anonymous" type="${source.attributes['type'].value}" src="${source.attributes['url'].value}">`;
          }
          embedHTML += `</audio>`;
        } else if (embedType === 'video') {
          const poster = $(recording).find('poster');
          const posterWidth = poster[0].attributes['width'].value.trim();
          const posterHeight = poster[0].attributes['height'].value.trim();
          const posterUrl = poster[0].attributes['url'].value.trim();
          if ( 
            (poster.length > 0) && 
            (posterUrl !== '') && 
            (posterWidth !== '') && 
            (posterHeight !== '') 
          ) {
            let videoHTML = `
              <video 
                controls 
                crossorigin="anonymous" 
                poster="${posterUrl}" 
                width="${parseInt(posterWidth)}" 
                height="${parseInt(posterHeight)}" 
                id="recording-${recordingID}" 
                style="width: 67%; max-width: ${parseInt(posterWidth)}px; height: auto"
              >
            `;
            embedHTML += videoHTML;
          } else {
            let videoHTML = `
              <video 
                controls 
                crossorigin="anonymous" 
                id="recording-${recordingID}"
              >
            `;
            embedHTML += videoHTML;
          }
          for (let j=0; j<sources.length; j++) {
            let source = sources[j];
            embedHTML += `<source crossorigin="anonymous" type="${source.attributes['type'].value}" src="${source.attributes['url'].value}">`;
          }
          embedHTML += `</video>`;
        }
        if (recordingLabel !== '') {
          const isLastRecording = (i === (recordingsLength - 1) );
          mediaHTML += `
            <p class="center">
              <strong>
                ${recordingLabel}
              </strong>
            </p>
            <div class="center">
              ${embedHTML}
            </div>
          `;
          if (! isLastRecording) {
            mediaHTML += `<hr>`;
          }
        } else {
          mediaHTML += embedHTML;
        }
      }
    }
  }
  return mediaHTML;
};

fp.events = {
  listeners: {
    attach: function() {
      fp.scripture.onScriptureClicked();
      fp.scripture.onScriptureExpandButtonClicked();
    }
  }
};

fp.xml2Str = xmlNode => {
  try {
    // Gecko- and Webkit-based browsers (Firefox, Chrome), Opera.
    return (new XMLSerializer()).serializeToString(xmlNode);
  }
  catch (e) {
    try {
      // Internet Explorer.
      return xmlNode.xml;
    }
    catch (e) {  
      //Other browsers without XML Serializer
      console.log('XMLSerializer not supported');
    }
  }
  return false;
};

fp.isMobileDevice = () => {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

fp.enableInstall = () => {
  const isMobileDevice = fp.isMobileDevice();

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    fp.installPromptEvent = e;
    if (isMobileDevice) {
      $('#install-button-container').show();
    }
  });

  document.querySelector('#install-button').addEventListener('click', () => {
    if (!! fp.installPromptEvent) fp.installPromptEvent.prompt();
  });
}

fp.onInstall = () => {
  window.addEventListener('appinstalled', (evt) => {
    const installDate = new Date().toJSON();
    localStorage.setItem('installDate', installDate);
    $('#install-button-container').hide();
  });
}

fp.enableShare = () => {
  const shareButtonContainer = document.querySelector('#share-button-container');
  const shareButton = document.querySelector('#share-button');
  if (navigator.share) {
    shareButtonContainer.style.display = 'block';
    shareButton.addEventListener('click', fp.onShare, false);
  }
}

fp.onShare = () => {
  let appTitle = document.querySelector('.brand-logo').innerText;
  let appURL = 'https://firstprinciples.mobi/';
  if (document.location.host === 'staging.firstprinciples.mobi') {
    appURL = 'https://staging.firstprinciples.mobi/';
  }
  let hasHighASCIICharacters = false;
  const appTitleCheck = appTitle.split('').map(character => {
    const characterCode = character.charCodeAt(0);
    if ((characterCode < 32) || (characterCode > 127)) {
      hasHighASCIICharacters = true;
    }
  });
  if (hasHighASCIICharacters) {
    appTitle = appTitle.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }
  navigator.share({
    url: appURL,
    text: appTitle + '\n',
    title: appTitle
  }).then(() => console.log('fp.onShare')).catch(error => console.error(error));
}

fp.registerServiceWorker = fromKey => {
  const lang = fp.language.current;
  const basePath = fp.getPath(fromKey, lang);
  let pathToSW = basePath + 'sw.js';
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(pathToSW).then(reg => {
      const newAppUrl = 'https://usd21.app/';

      if (reg.installing) {
        reg.installing.postMessage({type: 'SKIP_WAITING'});
      }
                
      const checkUnregister = setInterval(() => {
        navigator.serviceWorker.getRegistration().then(finalReg => {
          if (!finalReg) {
            clearInterval(checkUnregister);
            console.log('Service Worker unregistered. Redirecting...');
            window.location.replace(newAppUrl);
          }
        });
      }, 100); // Check every 100ms
    }).catch(error => {
      console.error('Error in registering First Principles service worker:', error);
    });
  }  
}

function isRunningStandalone() {
  return (window.matchMedia('(display-mode: standalone)').matches);
}

fp.showSplashScreen = (fromKey) => {
  const splashshown = sessionStorage.getItem("splashshown") || false;
  const timeToWait = 2000;
  const standalone = isRunningStandalone();

  if (!standalone && !splashshown) {
    $("#splash").removeClass("hide");
    setTimeout(() => {
      sessionStorage.setItem("splashshown", true);
      $("#splash").addClass("hide");
      $("#nonsplash").removeClass("hide");
    }, timeToWait);
  } else {
    $("#splash").addClass("hide");
    $("#nonsplash").removeClass("hide");
  }
}

fp.framebuster = () => {
  const isFramed = (top.location === self.location) ? false : true;

  if (isFramed) {
    top.location = self.location;
  }
}


fp.init = async (fromKey, cb) => {
  window.fp = {};
  fp.framebuster();
  fromKey === "dashboard" && fp.showSplashScreen(fromKey);
  $.ajaxSetup({
    cache: true
  });
  if (fromKey === 'index') {
    fp.language.current = await fp.language.get();
    fp.language.indexPage.loadTitle();
    fp.language.indexPage.loadContent();
    return;
  }
  fp.keys = await fp.loadKeys(fromKey);
  fp.language.set(fp.keys.lang);
  fp.language.global.setAppTitle(fromKey, fp.language.current);
  fp.language.global.setExpandButton(fromKey, fp.language.current);
  await fp.showContent(fromKey, fp.language.current, null, cb);
  fp.events.listeners.attach();
  fp.registerServiceWorker(fromKey, fp.language.current);
};
