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

fp.showContent = (key, lang, selector) => {
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
          if (fp.view.key === 'light-darkness') {
            setTimeout(() => {
              $('.light-darkness_baptism-earth').first().css('height', $('.light-darkness_baptism-water').first().outerHeight());
            }, 500);
          }
          // fp.scripture.preloadScripturesOnPage();
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
      changeHTMLAfter = '<a href="' + href + '">' + changeHTMLAfter + '</a>';
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

fp.onShare = () => {
  let appTitle = document.querySelector('.brand-logo').innerText;
  let appURL = 'https://firstprinciples.mobi/';
  if (document.location.host === 'firstprinciples-materialdesign.herokuapp.com') {
    appURL = 'https://firstprinciples-materialdesign.herokuapp.com/';
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

fp.enableInstall = () => {
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
  });
}

fp.onInstall = () => {
  window.addEventListener('appinstalled', (evt) => {
    const installDate = new Date().toJSON();
    localStorage.setItem('installDate', installDate);
    $('#install-button-container').hide();
  });
}

fp.events = {
  listeners: {
    attach: function() {
      fp.scripture.onScriptureClicked();
      fp.scripture.onScriptureExpandButtonClicked();
      fp.onShare();
      fp.enableInstall();
      fp.onInstall();
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

fp.prePopulateTitles = () => {
  let appTitle = 'First Principles';
  let pageTitle = 'Select Language';
  const appTitleContainer = document.querySelector('.brand-logo');
  const pageTitleContainer = document.querySelector('title');
  const appTitleSaved = localStorage.getItem('indexAppTitle');
  const pageTitleSaved = localStorage.getItem('indexPageTitle');
  if (appTitleSaved) appTitle = appTitleSaved;
  if (pageTitleSaved) pageTitle = pageTitleSaved;
  appTitleContainer.innerText = appTitle;
  pageTitleContainer.innerText = pageTitle;
};

fp.init = async fromKey => {
  window.fp = {};
  $.ajaxSetup({
    cache: true
  });
  fp.prePopulateTitles();
  await $.ajax({
    url: '../../../languages.json',
    fileType: 'json',
    error: function(err) {
      console.error('Failed to load languages.json', err);
    },
    success: function(languages) {
      fp.language.available = [];
      languages.map(language => {
        fp.language.available.push(language);
      });
    }
  });
  if (fromKey === 'index') {
    fp.language.current = await fp.language.get();
    fp.language.indexPage.loadTitle();
    fp.language.indexPage.loadContent();
    return;
  }
  fp.language.set(fp.language.current);
  fp.language.global.setAppTitle(fromKey, fp.language.current);
  fp.language.global.setExpandButton(fromKey, fp.language.current);
  await fp.showContent(fromKey, fp.language.current);
  fp.events.listeners.attach();
};
