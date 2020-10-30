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

        <p>${phrase(2)}</p>

        <ol>
          <li><strong>${phrase(3)}</strong>
            <ol>
              <li>${phrase(5)}</li>
            </ol>
          </li>
          <li><strong>${phrase(6)}</strong>
            <ol>
              <li>${phrase(7)}
                <ol>
                  <li>${phrase(8)}
                  <li>${phrase(9)}</li>
                  <li>${phrase(10)}</li>
                  <li>${phrase(11)}</li>
                  <li>${phrase(12)}</li>
                </ol>
              </li>
              <li>${phrase(13)}
                <ol>
                  <li>${phrase(14)}</li>
                  <li>${phrase(15)}
                    <ol>
                      <li>${phrase(16)}</li>
                      <li>${phrase(17)}</li>
                      <li>${phrase(18)}</li>
                      <li>${phrase(19)}</li>
                    </ol>
                  </li>
                </ol>
              </li>
              <li>${phrase(20)}
                <ol>
                  <li>${phrase(21)}</li>
                  <li>${phrase(22)}</li>
                  <li>${phrase(23)}
                    <ol>
                      <li>${phrase(24)}</li>
                      <li>${phrase(25)}</li>
                      <li>${phrase(26)}</li>
                    </ol>
                  </li>
                </ol>
              </li>
            </ol>
          </li>
          <li><strong>${phrase(27)}</strong>
            <ol>
              <li>${phrase(28)}</li>
              <li>${phrase(29)}</li>
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
