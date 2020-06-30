const fs = require('fs');
const path = require('path');
const directoryPath = __dirname;
const directoryName = path.basename(directoryPath);
const filePath = `${directoryPath}/../../../scriptures/${directoryName}/content.xml`;

const fileContents = fs.readFileSync(filePath, 'utf-8', (err, data) => {
  if (err) return console.log(err);
  return data;
});
let scripture;
let passage;
let xmlIsParsable = true;
try {
  xml = new DOMParser().parseFromString(fileContents, 'text/xml');
  scripture = xml.querySelector('scripture');
  passage = scripture.querySelector('passage');
} catch (err) {
  xmlIsParsable = false;
}

describe('XML', () => {
  it('must be parsable', () => {
    expect(xmlIsParsable).toBe(true);
  });
});

describe('<scripture> tag', () => {
  it('"key" attribute must exist', () => {
    const attributeExists = scripture.hasAttribute('key');
    expect(attributeExists).toBe(true);
  });

  it('"key" must not be blank', () => {
    const value = scripture.getAttribute('key');
    expect(value).not.toBe('');
  });

  it('"lang" attribute must exist', () => {
    const attributeExists = scripture.hasAttribute('lang');
    expect(attributeExists).toBe(true);
  });

  it('"lang" must not be blank', () => {
    const value = scripture.getAttribute('lang');
    expect(value).not.toBe('');
  });

  it('"version" attribute must exist', () => {
    const attributeExists = scripture.hasAttribute('version');
    expect(attributeExists).toBe(true);
  });

  it('"version" must not be blank', () => {
    const value = scripture.getAttribute('version');
    expect(value).not.toBe('');
  });

  it('"edition" attribute must exist', () => {
    const attributeExists = scripture.hasAttribute('edition');
    expect(attributeExists).toBe(true);
  });

  it('"edition" must not be blank', () => {
    const value = scripture.getAttribute('edition');
    expect(value).not.toBe('');
  });

});

describe('<passage> tag', () => {
  it('"title" attribute must exist', () => {
    const attributeExists = passage.hasAttribute('title');
    expect(attributeExists).toBe(true);
  });
  it('"title" must not be blank', () => {
    const value = passage.getAttribute('title');
    expect(value).not.toBe('');
  });
  it('"book" attribute must exist', () => {
    const attributeExists = passage.hasAttribute('book');
    expect(attributeExists).toBe(true);
  });
  it('"book" must not be blank', () => {
    const value = passage.getAttribute('book');
    expect(value).not.toBe('');
  });
});

const chaptersNodeList = passage.querySelectorAll('chapter');

describe('chapters', () => {
  it('must exist', () => {
    expect(chaptersNodeList.length).not.toBe(0);
  });
});

if (chaptersNodeList.length > 0) {
  const chapters = [];
  for (let i = 0; i < chaptersNodeList.length; i++) {
    const number = chaptersNodeList[i].getAttribute('number') || '';
    chapters.push({
      number: number,
    });
  }
  chapters.map(chapter => {
    const chapterNum = chapter.number || '(not numbered)';
    const haschapterNum = (chapter.number.length > 0);
    describe('chapter ' + chapterNum, () => {
      if (!haschapterNum) {
        it('chapter must have a "number" attribute', () => {
          expect(haschapterNum).toBe(true);
        });
      } else {
        it('chapter number must not be blank', () => {
          expect(chapterNum).not.toBe('(not numbered)');
        });
      }
    });
  });
}

const versesNodeList = passage.querySelectorAll('verse');

describe('verses', () => {
  it('must exist', () => {
    expect(versesNodeList.length).not.toBe(0);
  });
});

if (versesNodeList.length > 0) {
  const verses = [];
  for (let i = 0; i < versesNodeList.length; i++) {
    const number = versesNodeList[i].getAttribute('number') || '';
    const hasJesusWords = (versesNodeList[i].hasAttribute('jesuswords') && versesNodeList[i].getAttribute('jesuswords') === 'true');
    const numJesusWordsTags = versesNodeList[i].querySelectorAll('.jesuswords').length;
    const hasScriptureQuote = (versesNodeList[i].hasAttribute('scripturequote') && versesNodeList[i].getAttribute('scripturequote') === 'true');
    const numScriptureQuoteTags = versesNodeList[i].querySelectorAll('.scripturequote').length;
    const content = versesNodeList[i].innerHTML.trim();
    verses.push({
      number: number,
      content: content,
      hasJesusWords: hasJesusWords,
      numJesusWordsTags: numJesusWordsTags,
      hasScriptureQuote: hasScriptureQuote,
      numScriptureQuoteTags: numScriptureQuoteTags
    });
  }
  verses.map(verse => {
    const verseNum = verse.number || '(not numbered)';
    const hasVerseNum = (verse.number.length > 0);
    const hasJesusWords = verse.hasJesusWords;
    const numJesusWordsTags = verse.numJesusWordsTags;
    const hasScriptureQuote = verse.hasScriptureQuote;
    const numScriptureQuoteTags = verse.numScriptureQuoteTags;
    const content = verse.content;
    describe('verse ' + verseNum, () => {
      if (!hasVerseNum) {
        it('must have a "number" attribute', () => {
          expect(hasVerseNum).toBe(true);
        });
      } else {
        it('verse number must not be blank', () => {
          expect(verseNum).not.toBe('(not numbered)');
        });
      }
      it('content must not be missing', () => {
        expect(content).not.toBe('');
      });
      if (hasJesusWords) {
        it("Jesus' words must be tagged", () => {
          expect(numJesusWordsTags).toBeGreaterThan(0);
        });
      }
      if (hasScriptureQuote) {
        it("Scripture quotations must be tagged", () => {
          expect(numScriptureQuoteTags).toBeGreaterThan(0);
        });
      }
    });
  });
}
