fp.language = {

  default: 'en',

  current: '',

  available: [
    {
      iso: 'en',
      name: {
        native: 'English',
        en: 'English'
      }
    }
  ],

  isAvailable: function(iso) {
    let isAvailable = false;
    if(! iso) return isAvailable;
    if(typeof iso !== 'string') return isAvailable;
    if(iso.length !== 2) return isAvailable;
    fp.language.available.map(lang => {
      if(lang.iso === iso) {
        isAvailable = true;
        return;
      }
    });
    return isAvailable;
  },

  detect: function() {
    let lang = navigator.language || navigator.browserLanguage;
    lang = lang.substring(0,2);
    lang = lang.toLowerCase();
    return lang;
  },

  get: function() {
    return new Promise(function(resolve, reject) {
      let lang = fp.language.detect();
      if(! fp.language.isAvailable(lang)) lang = fp.language.default;
      fp.language.set(lang);
      resolve(lang);
    });
  },

  set: function(lang) {
    fp.language.current = lang;
  },

  global: {
    setAppTitle: function(fromKey, lang) {
      return new Promise(async function(resolve, reject) {
        let url = fp.getPath(fromKey, lang) + 'global/content.xml';
        $.ajax({
          url: url,
          error: function(err) {
            console.error(err);
          },
          success: function(data) {
            let $data = $(data);
            let text = {
              appTitle: $data.find('phrase[id=1] translated')[0].textContent.trim(),
              pageTitle: $data.find('phrase[id=3] translated')[0].textContent.trim(),
              expandButton: $data.find('phrase[id=2] translated')[0].textContent.trim()
            };
            fp.$global = $data;
            $('html')
              .find('.brand-logo').text(text.appTitle).end()
              .find('title').text(text.appTitle).end()
            ;
            localStorage.setItem('indexAppTitle', text.appTitle);
            localStorage.setItem('indexPageTitle', text.pageTitle);
          }
        })
      });
    },
    setExpandButton: function(fromKey, lang) {
      return new Promise(async function(resolve, reject) {
        const expandText = $(fp.$global).find('phrase[id=2] translated').text().trim();
        $('html').find('.scripture-expand .btn').html(expandText + '<i class="fas fa-angle-right"></i>').end();
        resolve(expandText);
      });
    }
  },

  indexPage: {
    loadTitle: function() {
      fromKey = 'index';
      lang = fp.language.current;
      path = fp.getPath(fromKey, lang);
      url = path + 'global/content.xml';
      $.ajax({
        url: url,
        error: function(err) {
          console.error(err);
        },
        success: function(data) {
          const $data = $(data);
          const appTitle = $data.find('phrase[id=1] translated')[0].innerHTML.trim();
          const pageTitle = $data.find('phrase[id=3] translated')[0].innerHTML.trim();
          $('title').text(appTitle);
          $('.brand-logo').html(appTitle);
          $('.fp_pagehead').html(pageTitle);
          localStorage.setItem('indexAppTitle', appTitle);
          localStorage.setItem('indexPageTitle', pageTitle);
        }
      });
    },

    loadContent: function() {
      let html = '';
      html += `
        <div class="row fpmodule fpmodule_index">
          <div class="col xl4 offset-xl4 l4 offset-l4 m4 offset-m4 s12">
            <div class="collection">
      `;
      fp.language.available.forEach(function(language){
        html += `
          <a href="/lang/${language.iso}/" class="collection-item center">
            ${language.name.native}
          </a>
        `;
      });
      html += `
            </div>
          </div>
        </div>
      `;
      $('.fp_pagecontent').html(html);
    }

  }

};
