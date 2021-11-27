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
          <strong>${phrase(2)}</strong><br>
          ${phrase(3)}
        </p>

        <p>${phrase(4)}</p>

        <p>${phrase(5)}</p>

        <p>${phrase(6)}</p>

        <p>${phrase(7)}</p>

        <p>${phrase(8)}</p>

        <p>${phrase(9)}</p>

        <p>${phrase(10)}</p>

        <p>${phrase(11)}</p>

        <p>${phrase(12)}</p>

        <p>${phrase(13)}</p>

        <p>${phrase(14)}</p>

        <p>${phrase(15)}</p>

        <p>${phrase(16)}</p>

        <p>${phrase(17)}</p>

        <p>${phrase(18)}</p>

        <p>${phrase(19)}</p>

        <p>${phrase(20)}</p>

        <p>${phrase(21)}</p>

        <p>${phrase(22)}</p>

        <p>${phrase(23)}</p>

        <p>${phrase(24)}</p>

        <p>${phrase(25)}</p>

        <p>${phrase(26)}</p>

        <p>${phrase(27)}</p>

        <p>${phrase(28)}</p>

        <p>${phrase(29)}</p>

        <p>${phrase(30)}</p>

        <p>${phrase(31)}</p>

        <p>${phrase(32)}</p>

        <p>${phrase(33)}</p>

        <p>${phrase(34)}</p>

        <p>${phrase(35)}</p>

        <p>${phrase(36)}</p>

        <p>${phrase(37)}</p>

        <p>${phrase(38)}</p>

        <p>${phrase(39)}</p>
      </div>
    </div>
  `;
  $('title').text(title);
  $(fp.view.containers.title).html(title);
  $(fp.view.containers.content).html(html);
  if (mediaHTML !== '') $('#fpmedia').removeClass('hide');
})();