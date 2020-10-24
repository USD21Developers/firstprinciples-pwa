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

        <ol>
          <li>
            <strong>${phrase(2)}</strong>
          </li>

          <li>
            <strong>${phrase(3)}</strong>
            <ol>
              <li><strong>${phrase(4)}</strong></li>
              <li><strong>${phrase(5)}</strong></li>
              <li><strong>${phrase(6)}</strong></li>
            </ol>
          </li>

          <li>
            <strong>${phrase(7)}</strong>
            <ol>
              <li>
                ${phrase(8)}
                <ol>
                  <li>${phrase(9)}</li>
                  <li>${phrase(10)}</li>
                </ol>
              </li>
              <li>
                ${phrase(11)}
                <ol>
                  <li>${phrase(12)}</li>
                  <li>${phrase(13)}</li>
                </ol>
              </li>
              <li>${phrase(14)}</li>
              <li>
                ${phrase(15)}
                <ol>
                  <li>${phrase(16)}</li>
                  <li>${phrase(17)}</li>
                </ol>
              </li>
              <li>
                ${phrase(18)}
                <ol>
                  <li>${phrase(19)}</li>
                  <li>${phrase(20)}</li>
                </ol>
              </li>
              <li>${phrase(21)}</li>
            </ol>
          </li>
          <li><strong>${phrase(22)}</strong></li>
        </ol>
        
      </div>
    </div>
  `;
  $('title').text(title);
  $(fp.view.containers.title).html(title);
  $(fp.view.containers.content).html(html);
  if (mediaHTML !== '') $('#fpmedia').removeClass('hide');
})();