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
            <p>${phrase(3)}</p>
            <table class="churchIsBody">
              <tbody>
                <tr>
                  <td><div>${phrase(4)}</div></td>
                  <td class="right"><div class="head"><i class="fa fa-long-arrow-alt-right fa-2x"></i></div></td>
                  <td rowspan="2"><img src="../_assets/img/body.png" width="86" height="187" class="responsive-img"></td>
                  <td><div class="head"><i class="fa fa-long-arrow-alt-left fa-2x"></i></div></td>
                  <td><div class="head">${phrase(5)}</div></td>
                </tr>
                <tr>
                  <td><div class="body">${phrase(6)}</div></td>
                  <td class="right"><div class="body"><i class="fa fa-long-arrow-alt-right fa-2x"></i></div></td>
                  <td><div class="body"><i class="fa fa-long-arrow-alt-left fa-2x"></i></div></td>
                  <td><div class="body">${phrase(7)}</div></td>
                </tr>
              </tbody>
            </table>
          </li>
          <li><strong>${phrase(8)}</strong>
            <ol>
              <li>${phrase(9)}
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
                          <strong>${phrase(10)}</strong><br>
                          ${phrase(11)}
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
                          ${phrase(12)}<br>
                          ${phrase(13)}
                        </div>
                      </td>
                      <td>
                        <div class="center">
                          <i class="fa fa-minus fa-2x"></i>
                        </div>
                      </td>
                      <td>
                        <div class="center">
                          ${phrase(14)}
                        </div>
                      </td>
                      <td>
                        <div class="center">
                          <i class="fa fa-minus fa-2x"></i>
                        </div>
                      </td>
                      <td>
                        <div class="center">
                          ${phrase(15)}<br>
                          ${phrase(16)}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li>${phrase(17)}</li>
              <li>${phrase(18)}</li>
            </ol>
          </li>
          <li><strong>${phrase(19)}</strong>
            <ol>
              <li>${phrase(20)}</li>
              <li>${phrase(21)}
                <ol>
                  <li>${phrase(22)}</li>
                  <li>${phrase(23)}</li>
                </ol>
              </li>
              <li>${phrase(24)}</li>
            </ol>
          </li>
          <li>${phrase(25)}
            <ol>
              <li>${phrase(26)}
                <ol>
                  <li>${phrase(27)}</li>
                  <li>${phrase(28)}</li>
                  <li>${phrase(29)}</li>
                </ol>
              </li>
              <li>${phrase(30)}
                <ol>
                  <li>${phrase(31)}</li>
                  <li>${phrase(32)}</li>
                </ol>
              </li>
              <li>${phrase(33)}
                <ol>
                  <li>${phrase(34)}</li>
                  <li>${phrase(35)}</li>
                  <li>${phrase(36)}</li>
                  <li>${phrase(37)}</li>
                  <li>${phrase(38)}</li>
                  <li>${phrase(39)}</li>
                  <li>${phrase(40)}</li>
                </ol>
              </li>
            </ol>
          </li>
          <li><strong>${phrase(41)}</strong>
            <ol>
              <li>${phrase(42)}</li>
              <li>${phrase(43)}</li>
              <li>${phrase(44)}</li>
              <li>${phrase(45)}</li>
            </ol>
          </li>
          <li><strong>${phrase(46)}</strong>
            <ol>
              <li><strong>${phrase(47)}</strong></li>
              <li>${phrase(48)}</li>
              <li>${phrase(49)}</li>
              <li><strong>${phrase(50)}</strong></li>
              <li>${phrase(51)}</li>
              <li>${phrase(52)}</li>
              <li>${phrase(53)}</li>
            </ol>
          </li>
          <li><strong>${phrase(54)}</strong>
            <ol>
              <li>${phrase(55)}</li>
              <li>${phrase(56)}</li>
            </ol>
          </li>
          <li><strong>${phrase(57)}</strong>
            <ol>
              <li>${phrase(58)}</li>
              <li>${phrase(59)}</li>
              <li>${phrase(60)}</li>
              <li>${phrase(61)}</li>
            </ol>
          </li>
          <li><strong>${phrase(62)}</strong>
            <ol>
              <li>${phrase(63)}</li>
              <li>${phrase(64)}</li>
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
