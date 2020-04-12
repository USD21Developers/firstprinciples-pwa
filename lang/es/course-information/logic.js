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
            ${phrase(8)}
          </li>
        </ul>

        <h5>
          ${phrase(9)}
        </h5>

        <table class="firstColNoWrap">
          <tbody>
            <tr>
              <td>
                ${phrase(10)}
              </td>
              <td>
                ${phrase(11)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(12)}
              </td>
              <td>
                ${phrase(13)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(14)}
              </td>
              <td>
                ${phrase(15)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(16)}
              </td>
              <td>
                ${phrase(17)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(18)}
              </td>
              <td>
                ${phrase(19)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(20)}
              </td>
              <td>
                ${phrase(21)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(22)}
              </td>
              <td>
                ${phrase(23)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(24)}
              </td>
              <td>
                ${phrase(25)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(26)}
              </td>
              <td>
                ${phrase(27)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(28)}
              </td>
              <td>
                ${phrase(29)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(30)}
              </td>
              <td>
                ${phrase(31)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(32)}
              </td>
              <td>
                ${phrase(33)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(34)}
              </td>
              <td>
                ${phrase(35)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(36)}
              </td>
              <td>
                ${phrase(37)}
              </td>
            </tr>
          </tbody>
        </table>

        <h5>
          ${phrase(38)}
        </h5>

        <p>
          ${phrase(39)}
        </p>

        <ul class="showdiscs">
          <li>
            <em>${phrase(40)}</em> ${phrase(41)}
          </li>
          <li>
            <em>${phrase(42)}</em> ${phrase(43)}
          </li>
          <li>
          <em>${phrase(44)}</em> ${phrase(45)}
          </li>
          <li>
            <em>${phrase(46)}</em> ${phrase(47)}
          </li>
          <li>
            <em>${phrase(48)}</em> ${phrase(49)}
          </li>
          <li>
            <em>${phrase(50)}</em> ${phrase(51)}
          </li>
        </ul>

      </div>
    </div>
  `;
  $('title').text(title);
  $(fp.view.containers.title).html(title);
  $(fp.view.containers.content).html(html);
  if (mediaHTML !== '') $('#fpmedia').removeClass('hide');
})();
