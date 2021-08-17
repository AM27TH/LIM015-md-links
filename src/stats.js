const uniqueLinks = (links) => (new Set(links.map(link => link.href)).size);

const brokenLinks = (links) => (links.filter(link => link.ok === false).length);

const noStatusLinks = (links) => (links.filter(link => link.status === 'noStatus').length);

module.exports = {
  uniqueLinks,
  brokenLinks,
  noStatusLinks
};