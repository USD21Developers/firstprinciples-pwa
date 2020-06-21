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
          <li>${phrase(3)}
          <li>${phrase(4)}</li>
        </ol>

        <br>

        <ol>
          <li><strong>${phrase(5)}</strong>
            <ol>
              <li>${phrase(6)}</li>
              <li>${phrase(7)}</li>
              <li>${phrase(8)}</li>
              <li>${phrase(9)}</li>
              <li>${phrase(10)}</li>
              <li>${phrase(11)}</li>
              <li>${phrase(12)}</li>
              <li>${phrase(13)}</li>
              <li>${phrase(14)}</li>
              <li>${phrase(15)}</li>
            </ol>
          </li>
          <li><strong>${phrase(16)}</strong>
            <ol>
              <li>${phrase(17)}</li>
              <li>${phrase(18)}</li>
              <li>${phrase(19)}</li>
              <li>${phrase(20)}</li>
            </ol>
          </li>
          <li><strong>${phrase(21)}</strong>
            <ol>
              <li>${phrase(22)}</li>
              <li>${phrase(23)}</li>
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
