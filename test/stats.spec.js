const {
  uniqueLinks,
  brokenLinks,
  noStatusLinks
} = require('../src/stats.js');

const mdLinks = [
  {
    href: 'https://nodejs.org/es/',
    status: 404,
    ok: false,
  },
  {
    href: 'https://github.com/markedjs/marked',
    status: 200,
    ok: true,
  },
  {
    href: 'https://nodejs.org/es/',
    status: 'noStatus',
    ok: false,
  },
  {
    href: 'https://github.com/markedjs/marked',
    status: 200,
    ok: true,
  }
];

describe('test uniqueLinks', () => {
  it('should be a function', () => {
    expect(typeof uniqueLinks).toBe('function');
  });
  it('should return 2 unique links', () => {
    expect(uniqueLinks(mdLinks)).toBe(2);
  });
});

describe('test brokenLinks', () => {
  it('should be a function', () => {
    expect(typeof brokenLinks).toBe('function');
  });
  it('should return 2 broken Links', () => {
    expect(brokenLinks(mdLinks)).toBe(2);
  });
});

describe('test noStatusLinks', () => {
  it('should be a function', () => {
    expect(typeof noStatusLinks).toBe('function');
  });
  it('should return 1 noStatus Links', () => {
    expect(noStatusLinks(mdLinks)).toBe(1);
  });
});