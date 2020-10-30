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

        <ol>
          <li><strong>${phrase(2)}</strong>
            <ol>
              <li><strong>${phrase(3)}</strong>
                <ol>
                  <li>${phrase(4)} &mdash; ${phrase(5)}</li>
                  <li>${phrase(6)} &mdash; ${phrase(7)}</li>
                  <li>${phrase(8)} &mdash; ${phrase(9)}</li>
                  <li>
                    ${phrase(10)} &mdash; ${phrase(11)}<br>
                    ${phrase(12)} &mdash; ${phrase(13)}
                  </li>
                  <li>${phrase(14)} &mdash; ${phrase(15)}</li>
                  <li>${phrase(16)} &mdash; ${phrase(17)}</li>
                </ol>
              </li>
              <li>
                <strong>${phrase(18)}</strong><br>
                <strong>${phrase(19)}</strong>
                <ol>
                  <li>${phrase(20)}</li>
                  <li>${phrase(21)}</li>
                  <li>${phrase(22)}</li>
                  <li>${phrase(23)}</li>
                </ol>
              </li>
            </ol>
          </li>
          <li><strong>${phrase(24)}</strong>
            <ol>
              <li>
                ${phrase(25)}<br>
                <br>
                ${phrase(26)}
              </li>
              <li>
                ${phrase(27)}<br>
                <br>
                ${phrase(28)}
              </li>
              <li>${phrase(29)}</li>
              <li>${phrase(30)}</li>
              <li>${phrase(31)}</li>
              <li>${phrase(32)}</li>
              <li>${phrase(33)}</li>
              <li>${phrase(34)}</li>
            </ol>
          </li>
        </ol>

      </div>
    </div>
  `;
  $('title').text(title);
  $(fp.view.containers.title).html(title);
  $(fp.view.containers.content).html(html);
  if (mediaHTML !== '') $('#fpmedia').removeClass('hide');
})();
