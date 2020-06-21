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
          ${phrase(2)}
        </p>

        <p>
          ${phrase(3)}
        </p>

        <ol>

          <li>${phrase(4)}
            <ol>
              <li>${phrase(5)}
                <ol>
                  <li>${phrase(6)}</li>
                  <li>${phrase(8)}</li>
                  <li>${phrase(9)}</li>
                </ol>
              </li>
              <li>${phrase(10)}
                <ol>
                  <li>${phrase(12)}</li>
                  <li>${phrase(13)}
                    <ol>
                      <li>${phrase(14)}</li>
                      <li>${phrase(15)}</li>
                      <li>${phrase(16)}</li>
                      <li>${phrase(17)}</li>
                    </ol>
                  </li>
                  <li>${phrase(18)}</li>
                  <li>${phrase(19)}</li>
                  <li>${phrase(20)}</li>
                </ol>
              </li>
            </ol>
          </li>

          <li><strong>${phrase(21)}</strong>
            <ol>
              <li>${phrase(22)}
                <ol>
                  <li>${phrase(23)}</li>
                </ol>
              </li>
              <li>${phrase(24)}
                <ol>
                  <li>${phrase(25)}</li>
                  <li>${phrase(26)}</li>
                  <li>${phrase(27)}</li>
                  <li>${phrase(28)}</li>
                  <li>${phrase(29)}</li>
                  <li>${phrase(30)}</li>
                  <li>${phrase(31)}</li>
                  <li>${phrase(32)}</li>
                </ol>
              </li>
            </ol>
          </li>

          <li><strong>${phrase(33)}</strong>
            <ol>
              <li>${phrase(34)}
                <ol>
                  <li>${phrase(35)}</li>
                </ol>
              </li>
              <li>${phrase(36)}
                <ol>
                  <li>${phrase(37)}</li>
                  <li>${phrase(38)}</li>
                </ol>
              </li>
              <li>${phrase(39)}
                <ol>
                  <li>${phrase(40)}</li>
                  <li>${phrase(41)}</li>
                </ol>
              </li>
              <li>${phrase(42)}
                <ol>
                  <li>${phrase(43)}</li>
                </ol>
              </li>
              <li>${phrase(44)}
                <ol>
                  <li>${phrase(45)}</li>
                  <li>${phrase(46)}</li>
                  <li>${phrase(47)}</li>
                </ol>
              </li>
              <li>${phrase(48)}
                <ol>
                  <li>${phrase(49)}</li>
                  <li>${phrase(50)}</li>
                </ol>
              </li>
              <li>${phrase(51)}
                <ol>
                  <li>${phrase(52)}</li>
                </ol>
              </li>
              <li>${phrase(53)}
                <ol>
                  <li>${phrase(54)}</li>
                </ol>
              </li>
              <li>${phrase(55)}
                <ol>
                  <li>${phrase(56)}</li>
                </ol>
              </li>
              <li>${phrase(57)}
                <ol>
                  <li>${phrase(58)}</li>
                </ol>
              </li>
              <li>${phrase(59)}
                <ol>
                  <li>${phrase(60)}</li>
                </ol>
              </li>
            </ol>
          </li>
          <li><strong>${phrase(61)}</strong>
            <ol>
              <li>${phrase(62)}</li>
              <li>${phrase(63)}
                <ol>
                  <li>${phrase(64)}</li>
                  <li>${phrase(65)}</li>
                  <li>${phrase(66)}</li>
                  <li>${phrase(67)}</li>
                </ol>
              </li>
              <li>${phrase(68)}</li>
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