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

        ${phrase(2)}<br>
        ${phrase(3)}
        <hr>

        ${phrase(4)}<br>
        ${phrase(5)}
        <hr>

        ${phrase(6)}<br>
        ${phrase(7)}
        <hr>

        ${phrase(8)}<br>
        ${phrase(9)}
        <hr>

        ${phrase(10)}<br>
        ${phrase(11)}
        <hr>

        ${phrase(12)}<br>
        ${phrase(13)}
        <hr>

        ${phrase(14)}<br>
        ${phrase(15)}
        <hr>

        ${phrase(16)}<br>
        ${phrase(17)}
        <hr>

        ${phrase(18)}<br>
        ${phrase(19)}
        <hr>

        ${phrase(20)}<br>
        ${phrase(21)}
        <hr>

        ${phrase(22)}<br>
        ${phrase(23)}
        <hr>

        ${phrase(24)}<br>
        ${phrase(25)}
        <hr>

        ${phrase(26)}<br>
        ${phrase(27)}
        <hr>

        ${phrase(28)}<br>
        ${phrase(29)}
        <hr>

        ${phrase(30)}<br>
        ${phrase(31)}
        <hr>

        ${phrase(32)}<br>
        ${phrase(33)}
        <hr>

        ${phrase(34)}<br>
        ${phrase(35)}
        <hr>

        ${phrase(36)}<br>
        ${phrase(37)}

      </div>
    </div>
  `;
  $('title').text(title);
  $(fp.view.containers.title).html(title);
  $(fp.view.containers.content).html(html);
  if (mediaHTML !== '') $('#fpmedia').removeClass('hide');
})();
