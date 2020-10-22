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

        <ul class="collection">
          <li class="collection-item">
            ${phrase(2)}
          </li>
          <li class="collection-item">
            ${phrase(3)}
          </li>
          <li class="collection-item">
            ${phrase(4)}
          </li>
          <li class="collection-item">
            ${phrase(5)}
          </li>
          <li class="collection-item">
            ${phrase(6)}
          </li>
          <li class="collection-item">
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
            <tr>
              <td>
                ${phrase(31)}
              </td>
              <td>
                ${phrase(32)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(33)}
              </td>
              <td>
                ${phrase(34)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(35)}
              </td>
              <td>
                ${phrase(36)}
              </td>
            </tr>
          </tbody>
        </table>

        <h5>
          ${phrase(37)}
        </h5>

        <p>
          ${phrase(38)}
        </p>

        <ul class="showdiscs">
          <li>
            ${phrase(39)} &mdash; ${phrase(40)}
          </li>
          <li>
            ${phrase(41)} &mdash; ${phrase(42)} &mdash; ${phrase(43)}
          </li>
          <li>
            ${phrase(44)} &mdash; ${phrase(45)} &mdash; ${phrase(46)}
          </li>
          <li>
            ${phrase(47)} &mdash; ${phrase(48)} &mdash; ${phrase(49)}
          </li>
          <li>
            ${phrase(50)} &mdash; ${phrase(51)}
          </li>
          <li>
            ${phrase(52)} &mdash; ${phrase(53)}
          </li>
          <li>
            ${phrase(54)} &mdash; ${phrase(55)}
          </li>
        </ul>

        <h5>
          ${phrase(56)}
        </h5>

        <table>
          <tbody>
            <tr>
              <td>
                ${phrase(57)}
              </td>
              <td>
                ${phrase(58)}
              </td>
              <td>
                ${phrase(59)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(60)}
              </td>
              <td>
                ${phrase(61)}
              </td>
              <td>
                ${phrase(62)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(63)}
              </td>
              <td>
                ${phrase(64)}
              </td>
              <td>
                ${phrase(65)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(66)}
              </td>
              <td>
                ${phrase(67)}
              </td>
              <td>
                ${phrase(68)}
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    </div>
  `;
  $('title').text(title);
  $(fp.view.containers.title).html(title);
  $(fp.view.containers.content).html(html);
  if (mediaHTML !== '') $('#fpmedia').removeClass('hide');
})();
