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
              <li>${phrase(3)}
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
              <li>${phrase(18)}
                <ol>
                  <li>${phrase(19)}</li>
                  <li>${phrase(20)}</li>
                  <li>${phrase(21)}</li>
                  <li>${phrase(22)}</li>
                </ol>
              </li>
            </ol>
          </li>
          <li><strong>${phrase(23)}</strong>
            <ol>
              <li>
                <p><strong>${phrase(24)}</strong></p>
                ${phrase(25)}
              </li>
              <li>
                <p><strong>${phrase(26)}</strong></p>
                ${phrase(27)}
              </li>
              <li>
                <p><strong>${phrase(28)}</strong></p>
                ${phrase(29)}
              </li>
              <li>
                <p><strong>${phrase(30)}</strong></p>
                ${phrase(31)}
              </li>
              <li>
                <p><strong>${phrase(32)}</strong></p>
                ${phrase(33)}
              </li>
              <li>
                <p><strong>${phrase(34)}</strong></p>
                ${phrase(35)}
              </li>
              <li>
                <p><strong>${phrase(36)}</strong></p>
                ${phrase(37)}
              </li>
              <li>
                <p><strong>${phrase(38)}</strong></p>
                ${phrase(39)}
              </li>
              <li>
                <p><strong>${phrase(40)}</strong></p>
                ${phrase(41)}
              </li>
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
