(function(){
  const data = $(fp.view.content);
  const phrase = function(phraseID) {
    const phraseObj = $(data).find('phrase[id=' + phraseID + ']');
    const phraseHTML = fp.phrase(phraseObj);
    return phraseHTML;
  };
  const key = data.find('content')[0].attributes['key'].value;
  const title = phrase(1);
  const html = `
    <div class="row fpmodule fpmodule_${key}">
      <div class="col xl6 offset-xl3 l8 offset-l2 m8 offset-m2 s12">
        <div class="collection">
          <a href="introduction/" class="collection-item darken-3">${phrase(2)}</a>
          <a href="course-information/" class="collection-item darken-3">${phrase(3)}</a>
          <a href="book-of-john/" class="collection-item darken-3">${phrase(4)}</a>
          <a href="seeking-god/" class="collection-item darken-3">${phrase(5)}</a>
          <a href="the-word/" class="collection-item darken-3">${phrase(6)}</a>
          <a href="discipleship/" class="collection-item darken-3">${phrase(7)}</a>
          <a href="the-kingdom/" class="collection-item darken-3">${phrase(8)}</a>
          <a href="light-darkness/" class="collection-item darken-3">${phrase(9)}</a>
          <a href="new-testament-conversion/" class="collection-item darken-3">${phrase(10)}</a>
          <a href="the-cross/" class="collection-item darken-3">${phrase(11)}</a>
          <a href="medical-account/" class="collection-item darken-3">${phrase(12)}</a>
          <a href="baptism-holy-spirit/" class="collection-item darken-3">${phrase(13)}</a>
          <a href="miraculous-gifts-holy-spirit/" class="collection-item darken-3">${phrase(14)}</a>
          <a href="the-church/" class="collection-item darken-3">${phrase(15)}</a>
          <a href="book-of-acts/" class="collection-item darken-3">${phrase(16)}</a>
          <a href="after-baptism-now-what/" class="collection-item darken-3">${phrase(17)}</a>
          <a href="christ-is-your-life/" class="collection-item darken-3">${phrase(18)}</a>
          <a href="best-friends-all-time/" class="collection-item darken-3">${phrase(19)}</a>
          <a href="the-mission/" class="collection-item darken-3">${phrase(20)}</a>
          <a href="persecution/" class="collection-item darken-3">${phrase(21)}</a>
          <a href="memory-scriptures/" class="collection-item darken-3">${phrase(22)}</a>
        </div>
      </div>
    </div>
  `;
  $('title').text(title);
  $(fp.view.containers.title).html(title);
  $(fp.view.containers.content).html(html);
  $('nav[role="name"').addClass('hide');
})();