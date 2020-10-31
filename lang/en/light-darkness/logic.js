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
    <link rel="stylesheet" href="../_assets/css/light-darkness.css">
    <div class="row fpmodule fpmodule_${key}">
      <div class="col xl10 offset-xl1 l8 offset-l2 m8 offset-m2 s12">

        <div class="center hide" id="fpmedia">
          ${mediaHTML}
        </div>

        <p>
          ${phrase(3)}
        </p>

        <table class="light-darkness_fourcorners">
          <tbody>
            <tr>
              <td>
                ${phrase(4)}<br>
                ${phrase(5)}<br>
                ${phrase(6)}<br>
              </td>
              <td>
                ${phrase(7)}<br>
                ${phrase(8)}<br>
                ${phrase(9)}<br>
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(10)}<br>
                ${phrase(11)}<br>
                ${phrase(12)}<br>
              </td>
              <td>
                ${phrase(13)}<br>
                ${phrase(14)}<br>
                ${phrase(15)}<br>
              </td>
            </tr>
          </tbody>
        </table>

        <ol>
          <li>${phrase(16)}</li>
          <li>${phrase(17)}</li>
        </ol>

        <br>

        <ol>
          <li><strong>${phrase(18)}</strong>
            <ol>
              <li>${phrase(19)}
                <ol>
                  <li>
                    ${phrase(20)}

                      <table class="wall-of-sin">
                        <thead>
                          <tr>
                            <th colspan="3">
                              ${phrase(21)}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              ${phrase(22)}<br>
                              <br>
                              ${phrase(23)}<br>
                            </td>
                            <td>
                              ${phrase(24)}<br>
                              <br>
                              ${phrase(25)}<br>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <th colspan="3">
                              ${phrase(26)}
                            </th>
                          </tr>
                        </tfoot>
                      </table>
                  </li>
                  <li>${phrase(27)}</li>
                  <li>${phrase(28)}</li>
                </ol>
              </li>
              <li>${phrase(29)}
                <ol>
                  <li>
                    ${phrase(30)}
                    <table class="pile-of-sin">
                      <tbody>
                        <tr>
                          <td class="center">
                            ${phrase(31)}<br>
                            <div class="pile-of-sin_pile pile-of-sin_person-a"></div>
                          </td>
                          <td class="center">
                            ${phrase(32)}<br>
                            <div class="pile-of-sin_pile pile-of-sin_person-b"></div>
                          </td>
                          <td class="center">
                            ${phrase(33)}<br>
                            <div class="pile-of-sin_pile pile-of-sin_person-c"></div>
                          </td>
                        </tr>
                        <tr>
                          <td class="center">${phrase(34)}</td>
                          <td class="center">${phrase(35)}</td>
                          <td class="center">${phrase(36)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </li>
                  <li>${phrase(37)}</li>
                  <li>${phrase(38)}</li>
                </ol>
              </li>
              <li>${phrase(39)}
                <ol>
                  <li>${phrase(40)}</li>
                  <li>${phrase(41)}</li>
                  <li>${phrase(42)}</li>
              </li>
              <li>${phrase(43)}
                <table class="light-darkness_fourcorners">
                  <tbody>
                    <tr>
                      <td>${phrase(44)}</td>
                      <td>${phrase(45)}</td>
                    </tr>
                    <tr>
                      <td>
                        ${phrase(46)}<br>
                        ${phrase(47)}<br>
                        ${phrase(48)}<br>
                      </td>
                      <td>
                        ${phrase(49)}<br>
                        ${phrase(50)}<br>
                        ${phrase(51)}<br>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ol>
          </li>
        </ol>
      </li>
      <li><strong>${phrase(52)}</strong>
        <ol>
          <li>${phrase(53)}</li>
          <li>${phrase(54)}</li>
          <li>${phrase(55)}
            <ol>
              <li>${phrase(56)}</li>
              <li>${phrase(57)}</li>
              <li>${phrase(58)}</li>
            </ol>
          </li>
          <li>${phrase(59)}
            <ol>
              <li>${phrase(60)}</li>
              <li>${phrase(61)}</li>
            </ol>
          </li>
          <li>${phrase(62)}
            <ol>
              <li>${phrase(63)}</li>
              <li>${phrase(64)}
                <ol>
                  <li>${phrase(65)}</li>
                  <li>${phrase(66)}</li>
                </ol>
              </li>
              <li>
                ${phrase(67)}<br>
                ${phrase(68)}
                <br>
                <table class="light-darkness_baptism">
                  <thead>
                    <tr>
                      <th class="center"><span style="text-transform:uppercase">${phrase(69)}</span></th>
                      <th class="center"><span style="text-transform:uppercase">${phrase(15)}</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="center">
                        <br>
                        <i class="fa fa-cross fa-3x"></i><br>
                        ${phrase(70)}<br>
                        <br>
                      </td>
                      <td class="center">
                        <br>
                        <i class="fa fa-cross fa-3x"></i><br>
                        ${phrase(73)}<br>
                        ${phrase(74)}<br>
                        <br>
                      </td>
                    </tr>
                    <tr>
                      <td class="center">
                        <br>
                        <img src="../_assets/css/fontawesome-free-5.11.2-web/svgs/solid/share.svg" class="l-d-arrow l-d-arrow-down" />
                        <div class="earth"></div>
                        <table class="brown light-darkness_baptism-earth">
                          <tbody>
                            <tr>
                              <td class="center white-text">
                                <strong>${phrase(71)}</strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <br>
                      </td>
                      <td class="center">
                        <br>
                        <img src="../_assets/css/fontawesome-free-5.11.2-web/svgs/solid/share.svg" class="l-d-arrow l-d-arrow-down" />
                        <div class="wave"></div>
                        <table class="blue light-darkness_baptism-water">
                          <tbody>
                            <tr>
                              <td class="center white-text">
                                <strong>${phrase(75)}</strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <br>
                      </td>
                    </tr>
                    <tr>
                      <td class="center" style="vertical-align: bottom">
                        <br>
                        ${phrase(72)}<br>
                        <img src="../_assets/css/fontawesome-free-5.11.2-web/svgs/solid/share.svg" class="l-d-arrow" />
                        <div class="earth"></div>
                        <table class="brown light-darkness_baptism-earth">
                          <tbody>
                            <tr>
                              <td class="center white-text">
                                <strong>&nbsp;</strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <br>
                      </td>
                      <td class="center" style="vertical-align: bottom">
                        <br>
                        ${phrase(76)}<br>
                        <img src="../_assets/css/fontawesome-free-5.11.2-web/svgs/solid/share.svg" class="l-d-arrow" />
                        <div class="wave"></div>
                        <table class="blue light-darkness_baptism-water">
                          <tbody>
                            <tr>
                              <td class="center white-text">
                                <strong>&nbsp;</strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <br>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <br>

                <table>
                  <thead>
                    <tr>
                      <th class="center" width="50%">
                        ${phrase(77)}
                      </th>
                      <th class="center" width="50%">
                        ${phrase(78)}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="center">
                        ${phrase(79)}<br>
                        ${phrase(80)}<br>
                      </td>
                      <td class="center">
                        ${phrase(81)}<br>
                        ${phrase(82)}<br>
                      </td>
                    </tr>
                    <tr>
                      <td class="center">
                        ${phrase(83)}<br>
                        ${phrase(84)}<br>
                      </td>
                      <td class="center">
                        ${phrase(85)}<br>
                        ${phrase(86)}<br>
                        ${phrase(87)}<br>
                      </td>
                    </tr>
                    <tr>
                      <td class="center" style="vertical-align: top">
                        ${phrase(88)}<br>
                        ${phrase(89)}<br>
                      </td>
                      <td class="center">
                        ${phrase(90)}<br>
                        ${phrase(91)}<br>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br>

              </li>
            </ol>
          </li>
        </ol>
      </li>
      <li><strong>${phrase(92)}</strong>
        <ol>
          <li>${phrase(93)}
            <ol>
              <li>${phrase(94)}</li>
              <li>${phrase(95)}</li>
              <li>${phrase(96)}
                <ol>
                  <li>${phrase(97)}</li>
                  <li>${phrase(98)}</li>
                </ol>
              </li>
            </ol>
          </li>
          <li>${phrase(99)}
            <ol>
              <li>${phrase(100)}</li>
              <li>${phrase(101)}</li>
            </ol>
          </li>
        </ol>
      </li>
      <li><strong>${phrase(102)}</strong>
        <p>
          ${phrase(103)}
        </p>
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
