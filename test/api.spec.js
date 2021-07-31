const {
  absolutePath,
  validatePath,
  getMdFiles,
  getMdLinks,
  //getMdLinksStatus
} = require('../src/api.js');

describe('absolute Path', () => {
  it('should be a function', () => {
    expect(typeof absolutePath).toBe('function');
  });
  it('should return same path if path is absolute', () => {
    const result = __dirname + '/files';
    expect(absolutePath(__dirname + '/files')).toBe(result);
  });
  it('should return absolute path if it is relative', () => {
    const result = __dirname + '\\files';
    expect(absolutePath('./test/files')).toBe(result);
  });
});

describe('validate Path', () => {
  it('should be a function', () => {
    expect(typeof validatePath).toBe('function');
  });
  it('should return true if path is valid', () => {
    expect(validatePath(__dirname + '/files')).toBe(true);
  });
  it('should return false if path is invalid', () => {
    expect(validatePath(__dirname + '/files/prueba')).not.toBe(true);
  });
});

describe('Get Md-files', () => {
  it('should be a function', () => {
    expect(typeof getMdFiles).toBe('function');
  });
  it('if file is not md-file, should return an empty array', () => {
    expect(getMdFiles(__dirname + '/files/noEmptyTxt/file.txt')).toEqual([]);
  });
  it('if directory does not have elements, should return an empty array', () => {
    expect(getMdFiles(__dirname + '/files/empty')).toEqual([]);
  });
  it('if directory has no md-files, should return en empty array', () => {
    expect(getMdFiles(__dirname + '/files/noEmptyTxt')).toEqual([]);
  });
  it('if directory is not empty, should return md-file array', () => {
    const result = [
      `${__dirname}\\files\\empty.md`,
      `${__dirname}\\files\\links.md`,
      `${__dirname}\\files\\noEmpty\\brokenLink.md`,
      `${__dirname}\\files\\noEmpty\\link.md`
    ];
    expect(getMdFiles(__dirname + '/files')).toEqual(result);
  });
});

describe('Get Md Links', () => {
  it('should be a function', () => {
    expect(typeof getMdLinks).toBe('function');
  });
  it('should return md links if the md-file is not empty', () => {
    const mdLinks = [
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: __dirname + '/files/links.md',
        line: 1
      },
      {
        href: 'https://developers.google.com/v8/',
        text: 'motor de JavaScript V8 de Chrome',
        file: __dirname + '/files/links.md',
        line: 2
      },
      {
        href: 'https://github.com/markdown-it/markdown-it',
        text: 'markdown-it',
        file: __dirname + '/files/links.md',
        line: 17
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions',
        text: 'expresiones regulares (`RegExp`)',
        file: __dirname + '/files/links.md',
        line: 21
      },
      {
        href: 'https://github.com/markedjs/marked',
        text: 'marked',
        file: __dirname + '/files/links.md',
        line: 23
      },
      {
        href: 'https://github.com/jsdom/jsdom',
        text: 'JSDOM',
        file: __dirname + '/files/links.md',
        line: 24
      },
      {
        href: 'https://github.com/cheeriojs/cheerio',
        text: 'Cheerio',
        file: __dirname + '/files/links.md',
        line: 25
      },
      {
        href: 'https://github.com/markedjs/marked',
        text: 'marked',
        file: __dirname + '/files/links.md',
        line: 26
      },
      {
        href: 'http://community.laboratoria.la/c/js',
        text: 'foro de la comunidad',
        file: __dirname + '/files/links.md',
        line: 29
      },
    ];
    expect(getMdLinks([__dirname + '/files/links.md'])).toEqual(mdLinks);
  });
  it('should return an empty array if the md-file is empty', () => {
    expect(getMdLinks([__dirname + '/files/empty.md'])).toEqual([]);
  });
});
