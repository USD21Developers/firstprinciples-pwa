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
      <div class="col xl6 offset-xl3 l8 offset-l2 m8 offset-m2 s12">

        <div class="center hide" id="fpmedia">
          ${mediaHTML}
        </div>

        <ol>
          <li>
            ${phrase(2)}
          </li>
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
          <li>
            ${phrase(7)}
          </li>
        </ul>

        <h5>
          ${phrase(8)}
        </h5>

        <table class="firstColNoWrap">
          <tbody>
            <tr>
              <td>
                ${phrase(9)}
              </td>
              <td>
                ${phrase(10)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(11)}
              </td>
              <td>
                ${phrase(12)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(13)}
              </td>
              <td>
                ${phrase(14)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(15)}
              </td>
              <td>
                ${phrase(16)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(17)}
              </td>
              <td>
                ${phrase(18)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(19)}
              </td>
              <td>
                ${phrase(20)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(21)}
              </td>
              <td>
                ${phrase(22)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(23)}
              </td>
              <td>
                ${phrase(24)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(25)}
              </td>
              <td>
                ${phrase(26)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(27)}
              </td>
              <td>
                ${phrase(28)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(29)}
              </td>
              <td>
                ${phrase(30)}
              </td>
            </tr>
          </tbody>
        </table>

        <h5>
          ${phrase(31)}
        </h5>

        <p>
          ${phrase(32)}
        </p>

        <ul>
          <li>
            ${phrase(33)}
          </li>
          <li>
            ${phrase(34)}
          </li>
          <li>
            ${phrase(35)}
          </li>
          <li>
            ${phrase(36)}
          </li>
          <li>
            ${phrase(37)}
          </li>
          <li>
            ${phrase(38)}
          </li>
          <li>
            ${phrase(39)}
          </li>
        </ul>

        <h5>
          ${phrase(40)}
        </h5>

        <p>
          ${phrase(41)}
        </p>

        <div class="mb-1">
          ${phrase(42)}
          <ul class="compact">
            <li>${phrase(43)}</li>
            <li>${phrase(44)}</li>
          </ul>
        </div>

        <div class="mb-1">
          ${phrase(45)}
          <ul class="compact">
            <li>${phrase(46)}</li>
            <li>${phrase(47)}</li>
          </ul>
        </div>

        <div class="mb-1">
          ${phrase(48)}
          <ul class="compact">
            <li>${phrase(49)}</li>
            <li>${phrase(50)}</li>
          </ul>
        </div>

        <div class="mb-1">
          ${phrase(51)}
          <ul class="compact">
            <li>${phrase(52)}</li>
            <li>${phrase(53)}</li>
          </ul>
        </div>

        <div class="mb-1">
          ${phrase(54)}
          <ul class="compact">
            <li>${phrase(55)}</li>
            <li>${phrase(56)}</li>
          </ul>
        </div>

        <div class="mb-1">
          ${phrase(57)}
          <ul class="compact">
            <li>${phrase(58)}</li>
            <li>${phrase(59)}</li>
          </ul>
        </div>

        <div class="mb-1">
          ${phrase(60)}
          <ul class="compact">
            <li>${phrase(61)}</li>
            <li>${phrase(62)}</li>
          </ul>
        </div>

        <div class="mb-1">
          ${phrase(63)}
          <ul class="compact">
            <li>${phrase(64)}</li>
            <li>${phrase(65)}</li>
          </ul>
        </div>

        <div class="mb-1">
          ${phrase(66)}
          <ul class="compact">
            <li>${phrase(67)}</li>
            <li>${phrase(68)}</li>
          </ul>
        </div>
        
      </div>
    </div>
  `;
  $('title').text(title);
  $(fp.view.containers.title).html(title);
  $(fp.view.containers.content).html(html);
  if (mediaHTML !== '') $('#fpmedia').removeClass('hide');
})();
