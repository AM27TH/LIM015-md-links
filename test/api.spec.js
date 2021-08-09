const {
  absolutePath,
  validatePath,
  getMdFiles,
  readMdFile,
  getMdLinks,
  getMdLinksStatus
} = require('../src/api.js');
const fetch = require('node-fetch');
jest.mock('node-fetch');

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

describe('readMdFile', () => {
  it('should be a function', () => {
    expect(typeof readMdFile).toBe('function');
  });
  it('should return an empty array if the md-file is empty', () => {
    expect(readMdFile(__dirname + '\\files\\empty.md')).toEqual([]);
  });
  it('should return md links if the md-file is not empty', () => {
    const mdLink = [
      {
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
        text: 'md-links',
        file: '..\\test\\files\\noEmpty\\link.md',
        line: 1
      }
    ];
    expect(readMdFile(__dirname + '\\files\\noEmpty\\link.md')).toEqual(mdLink);
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
        file: '..\\test\\files\\links.md',
        line: 1
      },
      {
        href: 'https://developers.google.com/v8/',
        text: 'motor de JavaScript V8 de Chrome',
        file: '..\\test\\files\\links.md',
        line: 2
      },
      {
        href: 'https://github.com/markdown-it/markdown-it',
        text: 'markdown-it',
        file: '..\\test\\files\\links.md',
        line: 17
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions',
        text: 'expresiones regulares (`RegExp`)',
        file: '..\\test\\files\\links.md',
        line: 21
      },
      {
        href: 'https://github.com/markedjs/marked',
        text: 'marked',
        file: '..\\test\\files\\links.md',
        line: 23
      },
      {
        href: 'https://github.com/jsdom/jsdom',
        text: 'JSDOM',
        file: '..\\test\\files\\links.md',
        line: 24
      },
      {
        href: 'https://github.com/cheeriojs/cheerio',
        text: 'Cheerio',
        file: '..\\test\\files\\links.md',
        line: 25
      },
      {
        href: 'https://github.com/markedjs/marked',
        text: 'marked',
        file: '..\\test\\files\\links.md',
        line: 26
      },
      {
        href: 'http://community.laboratoria.la/c/js',
        text: 'foro de la comunidad',
        file: '..\\test\\files\\links.md',
        line: 29
      },
    ];
    expect(getMdLinks([__dirname + '/files/links.md'])).toEqual(mdLinks);
  });
  it('should return an empty array if the md-file is empty', () => {
    expect(getMdLinks([__dirname + '/files/empty.md'])).toEqual([]);
  });
});

describe('Get Md Links Status', () => {
  it('should be a function', () => {
    expect(typeof getMdLinksStatus).toBe('function');
  });
  test('status of the mock promise 200', () => {
    const linkTest = [
      {
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
        text: 'md-links',
        file: __dirname + '\\files\\noEmpty\\link.md',
        line: 1
      }
    ];
    const resolvedLinkTest = [
      {
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
        text: 'md-links',
        file: __dirname + '\\files\\noEmpty\\link.md',
        line: 1,
        status: 200,
        ok: true
      }
    ];
    const validateLinkTest = {
      status: 200,
      ok: true
    };
    fetch.mockResolvedValue(validateLinkTest);
    return getMdLinksStatus(linkTest).then((data) => {
      expect(data).toEqual(resolvedLinkTest);
    });
  });
  test('status of the mock promise 404', () => {
    const linkTest = [
      {
        href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
        text: 'Funciones — bloques de código reutilizables - MDN',
        file: '',
        line: 100
      }
    ];
    const resolvedLinkTest = [
      {
        href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
        text: 'Funciones — bloques de código reutilizables - MDN',
        file: '',
        line: 100,
        status: 404,
        ok: false
      }
    ];
    const validateLinkTest = {
      status: 404,
      ok: false
    };
    fetch.mockResolvedValue(validateLinkTest);
    return getMdLinksStatus(linkTest).then((data) => {
      expect(data).toEqual(resolvedLinkTest);
    });
  });
  test('status of the mock promise noStatus', () => {
    const linkTest = [
      {
        href: 'https://nodejs.og/es/',
        text: 'Node.js',
        file: __dirname + '\\files\\noEmpty\\brokenLink.md',
        line: 1,
      }
    ];
    const resolvedLinkTest = [
      {
        href: 'https://nodejs.og/es/',
        text: 'Node.js',
        file: __dirname + '\\files\\noEmpty\\brokenLink.md',
        line: 1,
        status: 'noStatus',
        ok: false
      }
    ];
    const validateLinkTest = {
      status: 'noStatus',
      ok: false
    };
    fetch.mockResolvedValue(validateLinkTest);
    return getMdLinksStatus(linkTest).then((data) => {
      expect(data).toEqual(resolvedLinkTest);
    });
  });
});