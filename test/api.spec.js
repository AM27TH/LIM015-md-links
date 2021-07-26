const {
  absolutePath,
  validatePath,
  getMdFiles,
  //getLinksStatus
} = require('../src/api.js');

describe('absolute Path', () => {
  it('it is a function', () => {
    expect(typeof absolutePath).toBe('function');
  });
  it('if the path is absolute returns the same path', () => {
    const result = `${__dirname}/files`;
    expect(absolutePath(`${__dirname}/files`)).toBe(result);
  });
  it('resolves the path if it is relative', () => {
    const result = `${__dirname}\\files`;
    expect(absolutePath('./test/files')).toBe(result);
  });
});

describe('validate Path', () => {
  it('is a function', () => {
    expect(typeof validatePath).toBe('function');
  });
  it('return true if path is valid', () => {
    expect(validatePath(`${__dirname}/files`)).toBe(true);
  });
  it('return false if path is invalid', () => {
    expect(validatePath(`${__dirname}/files/prueba`)).toBe(false);
  });
});

describe('Get Md-files', () => {
  it('is a function', () => {
    expect(typeof getMdFiles).toBe('function');
  });
  it('if file is not md-file, return an empty array', () => {
    expect(getMdFiles(`${__dirname}/files/noEmptyTxt/file.txt`)).toEqual([]);
  });
  it('if directory does not have elements, returns an empty array', () => {
    expect(getMdFiles(`${__dirname}/files/empty`)).toEqual([]);
  });
  it('if directory has no md-files, returns en empty array', () => {
    expect(getMdFiles(`${__dirname}/files/noEmptyTxt`)).toEqual([]);
  });
  it('if directory is not empty, returns md-file array', () => {
    const result = [
      `${__dirname}\\files\\empty.md`,
      `${__dirname}\\files\\links.md`,
      `${__dirname}\\files\\noEmpty\\link.md`
    ];
    expect(getMdFiles(`${__dirname}/files`)).toEqual(result);
  });
});