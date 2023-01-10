(function(){
  const data = $(fp.view.content);
  const phrase = function(phraseID) {
    const phraseObj = $(data).find('phrase[id=' + phraseID + ']');
    const phraseHTML = fp.phrase(phraseObj);
    return phraseHTML;
  };
  const key = data.find('content')[0].attributes['key'].value;
  const title = phrase(1);
  let mediaHTML = '';
  const media = function() {
    const mediaObj = $(data).find('media');
    mediaHTML = fp.media(mediaObj);
  };
  media();
  const html = `
    <div class="row fpmodule fpmodule_${key}">
      <div class="col xl10 offset-xl1 l8 offset-l2 m8 offset-m2 s12">

        <div class="center hide" id="fpmedia">
          ${mediaHTML}
        </div>

        <p>
          <strong>${phrase(2)}</strong>
        </p>

        <p>
          ${phrase(3)}
        </p>

        <p>
          ${phrase(4)}
        </p>

        <p>
          <strong>${phrase(5)}</strong>
        </p>

        <div class="instructions hide" id="instructions_chrome_android_with_install_button">
          <ol>
            <li>${phrase(6)}</li>
            <li>${phrase(7)}</li>
            <li>${phrase(8)}</li>
          </ol>
        </div>

        <div class="instructions hide" id="instructions_chrome_android_no_install_button">
          <ol>
            <li>
              ${phrase(9)}
              <div class="center mt-1">
                <img src="../_assets/img/icons/kebab-dots.svg" width="48" height="48" />
              </div>
            </li>
            <li>${phrase(10)}</li>
            <li>${phrase(8)}</li>
          </ol>
        </div>

        <div class="instructions hide" id="instructions_safari_ios">
          <ol>
            <li>
              ${phrase(11)}
              <div class="center mt-1">
                <img src="../_assets/img/icons/ios_safari_share_menu_button.png" width="28" height="34" />
              </div>
            </li>
            <li>${phrase(12)}</li>
            <li>${phrase(8)}</li>
          </ol>
        </div>

        <div class="instructions" id="instructions_other">
          <ol>
            <li>${phrase(13)}</li>
            <li>${phrase(14)}</li>
            <li>${phrase(8)}</li>
          </ol>
        </div>

        <br>
        
      </div>
    </div>
  `;
  $('title').text(title);
  $(fp.view.containers.title).html(title);
  $(fp.view.containers.content).html(html);
  if (mediaHTML !== '') $('#fpmedia').removeClass('hide');
})();