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

        <ol>
          <li>
            ${phrase(3)}
          </li>
          <li>
            ${phrase(4)}
          </li>
          <li>
            ${phrase(5)}
          </li>
          <li>
            ${phrase(6)}
          </li>
        </ol>

        <p>
          <strong>
            ${phrase(7)}
          </strong>
        </p>

        <ol>

          <li>
            ${phrase(8)}
            <ol>
              <li>
                ${phrase(9)}
              </li>
              <li>
                ${phrase(10)}
              </li>
              <li>
                ${phrase(11)}
              </li>
              <li>
                ${phrase(12)}
              </li>
            </ol>
          </li>

          <li>
            ${phrase(13)}
            <ol>
              <li>
                ${phrase(14)}
              </li>
              <li>
                ${phrase(15)}
              </li>
              <li>
                ${phrase(16)}
              </li>
              <li>
                ${phrase(17)}
              </li>
            </ol>
          </li>

          <li>
            ${phrase(18)}
            <ol>
              <li>
                ${phrase(19)}
              </li>
              <li>
                ${phrase(20)}
              </li>
              <li>
                ${phrase(21)}
              </li>
              <li>
                ${phrase(22)}
              </li>
              <li>
                ${phrase(23)}
              </li>
              <li>
                ${phrase(24)}
              </li>
            </ol>
          </li>

          <li>
            ${phrase(25)}
            <ol>
              <li>
                ${phrase(26)}
              </li>
              <li>
                ${phrase(27)}
              </li>
            </ol>
          </li>

          <li>
            ${phrase(28)}
            <ol>
              <li>
                ${phrase(29)}
              </li>
              <li>
                ${phrase(30)}
              </li>
            </ol>
          </li>

          <li>
            ${phrase(31)}
            <ol>
              <li>
                ${phrase(32)}
              </li>
              <li>
                ${phrase(33)}
              </li>
              <li>
                ${phrase(34)}
              </li>
              <li>
                ${phrase(35)}
              </li>
            </ol>
          </li>

        </ol>

        <table>
          <thead>
            <tr>
              <th>${phrase(36)}</th>
              <th>${phrase(37)}</th>
              <th>${phrase(38)}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${phrase(39)}</td>
              <td>${phrase(40)}</td>
              <td>${phrase(41)}</td>
            </tr>
            <tr>
              <td>${phrase(42)}</td>
              <td>${phrase(43)}</td>
              <td>${phrase(44)}</td>
            </tr>
            <tr>
              <td>${phrase(45)}</td>
              <td>${phrase(46)}</td>
              <td>${phrase(47)}</td>
            </tr>
            <tr>
              <td>${phrase(48)}</td>
              <td>${phrase(49)}</td>
              <td>${phrase(50)}</td>
            </tr>
            <tr>
              <td>${phrase(51)}</td>
              <td>${phrase(52)}</td>
              <td>${phrase(53)}</td>
            </tr>
          </tbody>
        </table>

        <br>

        <p>
          ${phrase(54)}
        </p>
        
      </div>
    </div>
  `;
  $('title').text(title);
  $(fp.view.containers.title).html(title);
  $(fp.view.containers.content).html(html);
  if (mediaHTML !== '') $('#fpmedia').removeClass('hide');
})();