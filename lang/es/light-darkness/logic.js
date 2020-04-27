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
          <strong>${phrase(2)}</strong>
        </p>

        <table>
          <tr>
            <td rowspan="3" style="vertical-align: top">
              ${phrase(3)}
            </td>
            <td>
              ${phrase(4)}
            </td>
          </tr>
          <tr>
            <td>
              ${phrase(5)}
            </td>
          </tr>
          <tr>
            <td>
              ${phrase(6)}
            </td>
          </tr>
        </table>

        <p>
          ${phrase(7)}
        </p>

        <table class="light-darkness_fourcorners">
          <tbody>
            <tr>
              <td>
                ${phrase(8)}<br>
                ${phrase(9)}<br>
                ${phrase(10)}<br>
              </td>
              <td>
                ${phrase(11)}<br>
                ${phrase(12)}<br>
                ${phrase(13)}<br>
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(14)}<br>
                ${phrase(15)}<br>
                ${phrase(16)}<br>
              </td>
              <td>
                ${phrase(17)}<br>
                ${phrase(18)}<br>
                ${phrase(19)}<br>
              </td>
            </tr>
          </tbody>
        </table>

        <ol>
          <li>${phrase(20)}</li>
          <li>${phrase(21)}</li>
        </ol>

        <br>

        <ol>
          <li><strong>${phrase(22)}</strong>
            <ol>
              <li>${phrase(23)}
                <ol>
                  <li>
                    ${phrase(24)}

                      <table class="wall-of-sin">
                        <thead>
                          <tr>
                            <th colspan="3">
                              ${phrase(25)}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              ${phrase(26)}<br>
                              <br>
                              ${phrase(27)}<br>
                            </td>
                            <td>
                              ${phrase(28)}<br>
                              <br>
                              ${phrase(29)}<br>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <th colspan="3">
                              ${phrase(30)}
                            </th>
                          </tr>
                        </tfoot>
                      </table>
                  </li>
                  <li>${phrase(31)}</li>
                  <li>${phrase(32)}</li>
                </ol>
              </li>
              <li>${phrase(33)}
                <ol>
                  <li>
                    ${phrase(34)}
                    <table class="pile-of-sin">
                      <tbody>
                        <tr>
                          <td class="center">
                            ${phrase(35)}<br>
                            <div class="pile-of-sin_pile pile-of-sin_person-a"></div>
                          </td>
                          <td class="center">
                            ${phrase(36)}<br>
                            <div class="pile-of-sin_pile pile-of-sin_person-b"></div>
                          </td>
                          <td class="center">
                            ${phrase(37)}<br>
                            <div class="pile-of-sin_pile pile-of-sin_person-c"></div>
                          </td>
                        </tr>
                        <tr>
                          <td class="center">${phrase(38)}</td>
                          <td class="center">${phrase(39)}</td>
                          <td class="center">${phrase(40)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </li>
                  <li>${phrase(41)}</li>
                  <li>${phrase(42)}</li>
                </ol>
              </li>
              <li>${phrase(43)}
                <ol>
                  <li>${phrase(44)}</li>
                  <li>${phrase(45)}</li>
                  <li>${phrase(46)}</li>
              </li>
              <li>${phrase(47)}
                <table class="light-darkness_fourcorners">
                  <tbody>
                    <tr>
                      <td>${phrase(48)}</td>
                      <td>${phrase(49)}</td>
                    </tr>
                    <tr>
                      <td>
                        ${phrase(50)}<br>
                        ${phrase(51)}<br>
                        ${phrase(52)}<br>
                      </td>
                      <td>
                        ${phrase(53)}<br>
                        ${phrase(54)}<br>
                        ${phrase(55)}<br>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ol>
          </li>
        </ol>
      </li>
      <li><strong>${phrase(56)}</strong>
        <ol>
          <li>${phrase(57)}</li>
          <li>${phrase(58)}</li>
          <li>${phrase(59)}
            <ol>
              <li>${phrase(60)}</li>
              <li>${phrase(61)}</li>
              <li>${phrase(62)}</li>
            </ol>
          </li>
          <li>${phrase(63)}
            <ol>
              <li>${phrase(64)}</li>
              <li>${phrase(65)}</li>
            </ol>
          </li>
          <li>${phrase(66)}
            <ol>
              <li>${phrase(67)}</li>
              <li>${phrase(68)}
                <ol>
                  <li>${phrase(69)}</li>
                  <li>${phrase(70)}</li>
                </ol>
              </li>
              <li>
                ${phrase(71)}<br>
                ${phrase(72)}
                <br>
                <table class="light-darkness_baptism">
                  <thead>
                    <tr>
                      <th class="center"><span style="text-transform:uppercase">${phrase(73)}</span></th>
                      <th class="center"><span style="text-transform:uppercase">${phrase(19)}</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="center">
                        <br>
                        <i class="fa fa-cross fa-3x"></i><br>
                        ${phrase(74)}<br>
                        <br>
                      </td>
                      <td class="center">
                        <br>
                        <i class="fa fa-cross fa-3x"></i><br>
                        ${phrase(77)}<br>
                        ${phrase(78)}<br>
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
                                <strong>${phrase(75)}</strong>
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
                                <strong>${phrase(79)}</strong>
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
                        ${phrase(76)}<br>
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
                        ${phrase(80)}<br>
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
                        ${phrase(81)}
                      </th>
                      <th class="center" width="50%">
                        ${phrase(82)}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="center">
                        ${phrase(83)}<br>
                        ${phrase(84)}<br>
                      </td>
                      <td class="center">
                        ${phrase(85)}<br>
                        ${phrase(86)}<br>
                      </td>
                    </tr>
                    <tr>
                      <td class="center">
                        ${phrase(87)}<br>
                        ${phrase(88)}<br>
                      </td>
                      <td class="center">
                        ${phrase(89)}<br>
                        ${phrase(90)}<br>
                        ${phrase(91)}<br>
                      </td>
                    </tr>
                    <tr>
                      <td class="center" style="vertical-align: top">
                        ${phrase(92)}<br>
                        ${phrase(93)}<br>
                      </td>
                      <td class="center">
                        ${phrase(94)}<br>
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
      <li><strong>${phrase(95)}</strong>
        <ol>
          <li>${phrase(96)}
            <ol>
              <li>${phrase(97)}</li>
              <li>${phrase(98)}</li>
              <li>${phrase(99)}
                <ol>
                  <li>${phrase(100)}</li>
                  <li>${phrase(101)}</li>
                </ol>
              </li>
            </ol>
          </li>
          <li>${phrase(102)}
            <ol>
              <li>${phrase(103)}</li>
              <li>${phrase(104)}</li>
            </ol>
          </li>
        </ol>
      </li>
      <li><strong>${phrase(105)}</strong>
        <p>
          ${phrase(106)}
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
