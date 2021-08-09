const { mdLinks } = require('../src/index.js');

describe('mdLinks', () => {
  it('should be a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
  test('should return an error if path is invalid', () => {
    return expect(mdLinks(null)).rejects.toMatch('must input a path');
  });
  test('should return an error if path is invalid', () => {
    return expect(mdLinks('./test/files/readme.txt')).rejects.toMatch('Invalid path');
  });
  test('should return an error if no md-files exist', () => {
    return expect(mdLinks('./test/files/empty')).rejects.toMatch('No md-files found');
  });
  test('should return an error if no md-links exist', () => {
    return expect(mdLinks('./test/files/empty.md')).rejects.toMatch('No md-links found');
  });
  test('should return [{href,text,file},...] if md-Links exits and validate is false', () => {
    const mdLink = [
      {
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
        text: 'md-links',
        file: '..\\test\\files\\noEmpty\\link.md',
        line: 1
      }
    ];
    return expect(mdLinks('./test/files/noEmpty/link.md')).resolves.toEqual(mdLink);
  });
  test('should return [{href,text,file,status,ok},...] if md-Links exits and validate is true', () => {
    const mdLinksStatus = [
      {
        href: 'https://nodejs.og/es/',
        text: 'Node.js',
        file: '..\\test\\files\\noEmpty\\brokenLink.md',
        line: 1,
        status: 'noStatus',
        ok: false
      }
    ];
    return expect(mdLinks('./test/files/noEmpty/brokenLink.md', {validate: true})).resolves.toEqual(mdLinksStatus);
  });
});