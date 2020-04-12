const fs = require('fs');
const filePath = __dirname + '/content.xml';
const fileContents = fs.readFileSync(filePath, 'utf-8', (err, data) => {
  if (err) return console.log(err);
  return data;
});
let content;
let xmlIsParsable = true;
try {
  xml = new DOMParser().parseFromString(fileContents, 'text/xml');
  content = xml.querySelector('content');
} catch (err) {
  xmlIsParsable = false;
}

describe('XML', () => {
  it('must be parsable', () => {
    expect(xmlIsParsable).toBe(true);
  });
});

describe('<content> tag', () => {
  it('"key" attribute must exist', () => {
    const attributeExists = content.hasAttribute('key');
    expect(attributeExists).toBe(true);
  });

  it('"key" must not be blank', () => {
    const value = content.getAttribute('key');
    expect(value).not.toBe('');
  });

  it('"lang-original" attribute must exist', () => {
    const attributeExists = content.hasAttribute('lang-original');
    expect(attributeExists).toBe(true);
  });

  it('"lang-original" must not be blank', () => {
    const value = content.getAttribute('lang-original');
    expect(value).not.toBe('');
  });

  it('"lang-translated" attribute must exist', () => {
    const attributeExists = content.hasAttribute('lang-translated');
    expect(attributeExists).toBe(true);
  });

  it('"lang-translated" must not be blank', () => {
    const value = content.getAttribute('lang-translated');
    expect(value).not.toBe('');
  });

  it('"last-updated" attribute must exist', () => {
    const attributeExists = content.hasAttribute('last-updated');
    expect(attributeExists).toBe(true);
  });

  it('"last-updated" must not be blank', () => {
    const value = content.getAttribute('last-updated');
    expect(value).not.toBe('');
  });

  it('"last-updated-by" attribute must exist', () => {
    const attributeExists = content.hasAttribute('last-updated-by');
    expect(attributeExists).toBe(true);
  });

  it('"last-updated-by" must not be blank', () => {
    const value = content.getAttribute('last-updated-by');
    expect(value).not.toBe('');
  });

  it('"last-updated-by-email" attribute must exist', () => {
    const attributeExists = content.hasAttribute('last-updated-by-email');
    expect(attributeExists).toBe(true);
  });

  it('"last-updated-by-email" must not be blank', () => {
    const value = content.getAttribute('last-updated-by-email');
    expect(value).not.toBe('');
  });

  it('"created" attribute must exist', () => {
    const attributeExists = content.hasAttribute('created');
    expect(attributeExists).toBe(true);
  });

  it('"created" must not be blank', () => {
    const value = content.getAttribute('created');
    expect(value).not.toBe('');
  });

  it('"created-by" attribute must exist', () => {
    const attributeExists = content.hasAttribute('created-by');
    expect(attributeExists).toBe(true);
  });

  it('"created-by" must not be blank', () => {
    const value = content.getAttribute('created-by');
    expect(value).not.toBe('');
  });

  it('"created-by-email" attribute must exist', () => {
    const attributeExists = content.hasAttribute('created-by-email');
    expect(attributeExists).toBe(true);
  });

  it('"created-by-email" must not be blank', () => {
    const value = content.getAttribute('created-by-email');
    expect(value).not.toBe('');
  });

});

const phrasesNodeList = content.querySelectorAll('phrase');

describe('phrases', () => {
  it('must exist', () => {
    expect(phrasesNodeList.length).not.toBe(0);
  });
});

if (phrasesNodeList.length > 0) {
  const phrases = [];
  for (let i = 0; i < phrasesNodeList.length; i++) {
    const id = phrasesNodeList[i].getAttribute('id') || '';
    const translated = phrasesNodeList[i].querySelector('translated').innerHTML.trim() || '';
    phrases.push({
      id: id,
      translated: translated
    });
  }
  phrases.map(phrase => {
    const phraseId = phrase.id || '(not numbered)';
    const hasId = (phrase.id.length > 0);
    const translatedValue = phrase.translated || '';
    describe('phrase ' + phraseId, () => {
      if (!hasId) {
        it('phrase must have an "id" attribute', () => {
          expect(hasId).toBe(true);
        });
      } else {
        it('phrase "id" must not be blank', () => {
          expect(phraseId).not.toBe('(not numbered)');
        });
      }
      it('translation must not be blank', () => {
        expect(translatedValue).not.toBe('');
      });
    });
  });
}
