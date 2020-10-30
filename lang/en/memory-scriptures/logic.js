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

        <div class="mb-2 center-align">
          <strong>${phrase(42)}</strong>
          <ul class="compact mx-0 mt-0 ml-1">
            <li>${phrase(43)}</li>
            <li>${phrase(44)}</li>
          </ul>
        </div>

        <div class="mb-2 center-align">
          <strong>${phrase(45)}</strong>
          <ul class="compact mx-0 mt-0 ml-1">
            <li>${phrase(46)}</li>
            <li>${phrase(47)}</li>
          </ul>
        </div>

        <div class="mb-2 center-align">
          <strong>${phrase(48)}</strong>
          <ul class="compact mx-0 mt-0 ml-1">
            <li>${phrase(49)}</li>
            <li>${phrase(50)}</li>
          </ul>
        </div>

        <div class="mb-2 center-align">
          <strong>${phrase(51)}</strong>
          <ul class="compact mx-0 mt-0 ml-1">
            <li>${phrase(52)}</li>
            <li>${phrase(53)}</li>
          </ul>
        </div>

        <div class="mb-2 center-align">
          <strong>${phrase(54)}</strong>
          <ul class="compact mx-0 mt-0 ml-1">
            <li>${phrase(55)}</li>
            <li>${phrase(56)}</li>
          </ul>
        </div>

        <div class="mb-2 center-align">
          <strong>${phrase(57)}</strong>
          <ul class="compact mx-0 mt-0 ml-1">
            <li>${phrase(58)}</li>
            <li>${phrase(59)}</li>
          </ul>
        </div>

        <div class="mb-2 center-align">
          <strong>${phrase(60)}</strong>
          <ul class="compact mx-0 mt-0 ml-1">
            <li>${phrase(61)}</li>
            <li>${phrase(62)}</li>
          </ul>
        </div>

        <div class="mb-2 center-align">
          <strong>${phrase(63)}</strong>
          <ul class="compact mx-0 mt-0 ml-1">
            <li>${phrase(64)}</li>
            <li>${phrase(65)}</li>
          </ul>
        </div>

        <div class="my-0 mb-2 center-align">
          <strong>${phrase(66)}</strong>
          <ul class="compact mx-0 mt-0 ml-1">
            <li>${phrase(67)}</li>
            <li>${phrase(68)}</li>
          </ul>
        </div>

      </div>
    </div>
  `;
  $('title').text(title);
  $(fp.view.containers.title).html(title);
  $(fp.view.containers.content).html(html);
  if (mediaHTML !== '') $('#fpmedia').removeClass('hide');
})();
