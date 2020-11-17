fp.scripture = {

  onScriptureClicked: function() {
    $('.fp_pagecontent').on('click', 'a[data-scripturekey][data-modal]', function(evt) {
      evt.preventDefault();
      fp.scripture.showScripture(evt);
    });
  },
  
  onScriptureExpandButtonClicked: function() {
    $('.scripture-expand a').on('click', function(evt) {      
      var url = evt.target.attributes['href'].value;
      evt.preventDefault();
      history.back();
      location.href = url;
    });
  },
  
  preloadScripturesOnPage: function() {
    const scriptureLinks = $('a[data-scripturekey]');
    for (let i = 0; i < scriptureLinks.length; i++) {
      const $tag = $(scriptureLinks[i]);
      const key = $tag.attr('data-scripturekey');
      const url = '../scriptures/' + key + '/content.xml';
      if ((typeof key !== 'string') || (key.length === 0)) continue;
      localforage.getItem(fp.language.current + '-' + key).then(function(data){
        if(! data) {
          $.ajax({
            url: url,
            dataType: 'xml',
            cache: true,
            error: function(err) {
              console.error(err);
            },
            success: function(xml) {
              let xmlSerialized = fp.xml2Str(xml);
              localforage.setItem(fp.language.current + '-' + key, xmlSerialized);
            }
          });
        }
      });
    }
  },

  showScripture: function(evt) {
    const key = evt.currentTarget.attributes['data-scripturekey'].value;
    fp.scripture.renderScripture(key);
  },
  
  renderScripture: async function(key) {
    let storedScripture = '';
    const successHandler = function(data) {
      let html = '';
      const passageTitle = $(data).find('passage').attr('title');
      const book = $(data).find('passage').attr('book');
      const chapter = $(data).find('chapter')[0].attributes['number'].value;
      const verses = $(data).find('verse');
      const version = $(data).find('scripture').attr('version');
      for(let i=0; i<verses.length; i++) {
        const num = $(verses[i]).attr('number');
        const txt = $(verses[i]).html().trim();
        if (txt.length === 0) continue;

        html += `
          <div class="row scripture">
            <div class="col s11">${txt}</div>
            <div class="col s1 right-align verseref">
              <span class="verseref">${num}</span>
            </div>
          </div>
        `;
        if (verses.length === 1) {
          html = html.replace('<div class="row scripture">', '<div class="row scripture scripture_border0">');
          html = html.replace('<div class="col s11">', '<div class="col s12">');
          html = html.replace('class="col s1 right-align verseref"', 'class="col s1 right-align verseref hide"');
        }
      };
      const expandButtonText = fp.language.global.setExpandButton(key, fp.language.current);
      html += `
        <br>
        <div class="right-align scripture-expand">
          <a href="http://www.biblegateway.com/passage/?search=${encodeURI(book + '+' + chapter)}&version=${version}" target="_blank" rel="noreferrer" class="btn blue darken-1 waves-effect waves-light">
            ${expandButtonText} <i class="fas fa-angle-right"></i>
          </a>
        </div>
      `;
      let modalHTML = `
        <div id="scriptureModal" class="modal">
          <div class="modal-content">
            <nav class="center scripture_headline flow-text blue darken-1">
              <div class="scripture_close">
                <a class="modal-close">
                  <svg width=".8em" height=".8em" viewBox="0 0 16 16" class="bi bi-x-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                    <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
                  </svg>
                </a>
              </div>
              ${passageTitle}
            </nav>
            <br>
            ${html}
          </div>
        </div>
      `;
      $('#scriptureModal').remove();
      $('.fp_pagecontent').after(modalHTML);
      $('#scriptureModal').modal({
        onOpenStart: function() {
          window.onhashchange = function() {
            var hashVal = window.location.hash;
            if (hashVal === '') {
              $('#scriptureModal').modal('close');
            }
          }
        },
        onOpenEnd: function() {
          window.location.hash = 'scripture=' + key;
          fp.scripture.onScriptureExpandButtonClicked();
        },
        onCloseEnd: function() {
          var hashVal = window.location.hash;
          if (hashVal !== '') {
            history.back();
          }
        }
      });
      $('#scriptureModal').modal('open');
    };
    $.ajax({
      url: '../scriptures/' + key + '/content.xml',
      cache: true,
      dataType: 'xml',
      error: function(err){
        console.error(err);
      },
      success: function(data) {
        successHandler(data);
      }
    });
  }

}
