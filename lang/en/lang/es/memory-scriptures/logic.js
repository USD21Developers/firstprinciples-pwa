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

        <blockquote>
          ${phrase(2)}<br>
          <div align="right"><em><strong>${phrase(3)}</strong></em></div>
        </blockquote>
        <br>
 
        <h5>${phrase(4)}</h5>
        ${phrase(5)}
        <div align="right"><em><strong>${phrase(6)}</strong></em></div>
        <hr>
        ${phrase(7)}<br>
        <div align="right"><em><strong>${phrase(8)}</strong></em></div>
        <br>
 
        <h5>${phrase(9)}</h5>
        ${phrase(10)}<br>
        <div align="right"><em><strong>${phrase(11)}</strong></em></div>
        <hr>
        ${phrase(12)}<br>
        <div align="right"><em><strong>${phrase(13)}</strong></em></div>
        <br>
 
        <h5>${phrase(14)}</h5>
        ${phrase(15)}<br>
        <div align="right"><em><strong>${phrase(16)}</strong></em></div>
        <hr>
        ${phrase(17)}<br>
        <div align="right"><em><strong>${phrase(18)}</strong></em></div>
        <br>
 
        <h5>${phrase(19)}</h5>
        ${phrase(20)}<br>
        <div align="right"><em><strong>${phrase(21)}</strong></em></div>
        <hr>
        ${phrase(22)}<br>
        <div align="right"><em><strong>${phrase(23)}</strong></em></div>
        <br>
 
        <h5>${phrase(24)}</h5>
        ${phrase(25)}<br>
        <div align="right"><em><strong>${phrase(26)}</strong></em></div>
        <hr>
        ${phrase(27)}<br>
        <div align="right"><em><strong>${phrase(28)}</strong></em></div>
        <br>
 
        <h5>${phrase(29)}</h5>
        ${phrase(30)}<br>
        <div align="right"><em><strong>${phrase(31)}</strong></em></div>
        <hr>
        ${phrase(32)}<br>
        <div align="right"><em><strong>${phrase(33)}</strong></em></div>
        <br>
 
        <h5>${phrase(34)}</h5>
        ${phrase(35)}<br>
        <div align="right"><em><strong>${phrase(36)}</strong></em></div>
        <hr>
        ${phrase(37)}<br>
        <div align="right"><em><strong>${phrase(38)}</strong></em></div>
        <br>
 
        <h5>${phrase(39)}</h5>
        ${phrase(40)}<br>
        <div align="right"><em><strong>${phrase(41)}</strong></em></div>
        <hr>
        ${phrase(42)}<br>
        <div align="right"><em><strong>${phrase(43)}</strong></em></div>
        <br>
 
        <h5>${phrase(44)}</h5>
        ${phrase(45)}<br>
        <div align="right"><em><strong>${phrase(46)}</strong></em></div>
        <hr>
        ${phrase(47)}<br>
        <div align="right"><em><strong>${phrase(48)}</strong></em></div>
        <br>
 
       </div>
    </div>
  `;
  $('title').text(title);
  $(fp.view.containers.title).html(title);
  $(fp.view.containers.content).html(html);
  if (mediaHTML !== '') $('#fpmedia').removeClass('hide');
})();
