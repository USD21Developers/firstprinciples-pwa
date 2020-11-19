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
    <link rel="stylesheet" type="text/css" href="../_assets/css/the-church.css">
    <div class="row fpmodule fpmodule_${key}">
      <div class="col xl10 offset-xl1 l8 offset-l2 m8 offset-m2 s12">

        <div class="center hide" id="fpmedia">
          ${mediaHTML}
        </div>

        <ol>
          <li><strong>${phrase(2)}</strong>
            <ol>
              <li>${phrase(3)}</li>
              <li>${phrase(4)}</li>
              <li>${phrase(5)}</li>
            </ol>
            <img src="../_assets/img/head-body-diagram.svg" class="responsive-img" style="width: 325px; max-width: 100%; height: auto"></td>
          </li>
          <li><strong>${phrase(10)}</strong>
            <ol>
              <li>${phrase(11)}
                <table class="churchIsFamily">
                  <tbody>
                    <tr>
                      <td>
                        &nbsp;
                      </td>
                      <td>
                        &nbsp;
                      </td>
                      <td>
                        <div class="center">
                          <strong>${phrase(12)}</strong><br>
                          ${phrase(13)}
                        </div>
                      </td>
                      <td>
                        &nbsp;
                      </td>
                      <td>
                        &nbsp;
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;
                      </td>
                      <td>
                        <div class="center">
                          <i class="fa fa-minus fa-2x god-christian-left"></i>
                        </div>
                      </td>
                      <td>
                        &nbsp;
                      </td>
                      <td>
                        <div class="center">
                          <i class="fa fa-minus fa-2x god-christian-right"></i>
                        </div>
                      </td>
                      <td>
                        &nbsp;
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="center">
                          ${phrase(14)}<br>
                          ${phrase(15)}
                        </div>
                      </td>
                      <td>
                        <div class="center">
                          <i class="fa fa-minus fa-2x"></i>
                        </div>
                      </td>
                      <td>
                        <div class="center">
                          ${phrase(16)}
                        </div>
                      </td>
                      <td>
                        <div class="center">
                          <i class="fa fa-minus fa-2x"></i>
                        </div>
                      </td>
                      <td>
                        <div class="center">
                          ${phrase(17)}<br>
                          ${phrase(18)}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li>${phrase(19)}</li>
              <li>${phrase(20)}</li>
            </ol>
          </li>
          <li><strong>${phrase(21)}</strong>
            <ol>
              <li>${phrase(22)}</li>
              <li>${phrase(23)}
                <ol>
                  <li>${phrase(24)}</li>
                  <li>${phrase(25)}</li>
                </ol>
              </li>
              <li>${phrase(26)}</li>
            </ol>
          </li>
          <li>${phrase(27)}
            <ol>
              <li>${phrase(28)}
                <ol>
                  <li>${phrase(29)}</li>
                  <li>${phrase(30)}</li>
                  <li>${phrase(31)}</li>
                </ol>
              </li>
              <li>${phrase(32)}
                <ol>
                  <li>${phrase(33)}</li>
                  <li>${phrase(34)}</li>
                </ol>
              </li>
              <li>${phrase(35)}
                <ol>
                  <li>${phrase(36)}</li>
                  <li>${phrase(37)}</li>
                  <li>${phrase(38)}</li>
                  <li>${phrase(39)}</li>
                  <li>${phrase(40)}</li>
                  <li>${phrase(41)}</li>
                  <li>${phrase(42)}</li>
                </ol>
              </li>
            </ol>
          </li>
          <li><strong>${phrase(43)}</strong>
            <ol>
              <li>${phrase(44)}</li>
              <li>${phrase(45)}</li>
              <li>${phrase(46)}</li>
              <li>${phrase(47)}</li>
            </ol>
          </li>
          <li><strong>${phrase(48)}</strong>
            <ol>
              <li>${phrase(49)}</li>
              <li>${phrase(50)}</li>
            </ol>
          </li>
          <li><strong>${phrase(51)}</strong>
            <ol>
              <li>${phrase(52)}</li>
              <li>${phrase(53)}</li>
              <li>${phrase(54)}</li>
              <li>${phrase(55)}</li>
            </ol>
          </li>
          <li><strong>${phrase(56)}</strong>
            <ol>
              <li>${phrase(57)}</li>
              <li>${phrase(58)}</li>
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
