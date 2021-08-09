const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

const absolutePath = (route) => (path.isAbsolute(route) ? route: path.resolve(route));
const validatePath = (route) => fs.existsSync(route);

const getMdFiles = (route) => {
  if(fs.statSync(route).isDirectory()){
    const directoryArray = fs.readdirSync(route);
    return directoryArray.reduce((accumulator, element) => {
      const absoluteElementPath = path.join(route, element);
      return accumulator.concat(getMdFiles(absoluteElementPath));
    }, []);
  }
  return (path.extname(route) === '.md' ? [route]: []);
};

const readMdFile = (mdFilePath) => {
  const regexLine = /!*\[(.+?)\]\((https?.+?)\)/gi;
  const regexText = /\[[^\s]+(.+?)\]/gi;
  const regexLink = /\((https?.+?)\)/gi;
  const readMdFile = fs.readFileSync(mdFilePath, 'utf-8');
  const mdLines = readMdFile.split('\r\n');
  return mdLines.reduce((accumulator, line) => {
    if(!line.match(regexLine)) return accumulator;
    const mdLinkHref = line.match(regexLink).join().slice(1, -1);
    const mdLinkText = line.match(regexText).join().slice(1, -1).substring(0,50);
    const mdLinkLine = mdLines.indexOf(line) + 1;
    return accumulator.concat({
      href: mdLinkHref,
      text: mdLinkText,
      file: path.relative(__dirname, mdFilePath),
      line: mdLinkLine
    });
  }, []);
};

const getMdLinks = (mdFilesPaths) => {
  return mdFilesPaths.reduce((accumulator, mdFilePath) => {
    return accumulator.concat(readMdFile(mdFilePath));
  }, []);
};

const getMdLinksStatus = (links) => Promise.all(links.map(( link =>
  fetch(link.href)
  .then(response => {
    return {
      ...link,
      status: response.status,
      ok: response.ok
    };
  })
  .catch(() => {
    return {
      ...link,
      status: 'noStatus',
      ok: false
    };
  })
))).then(statusLinks => { return statusLinks; });

module.exports = {
  absolutePath,
  validatePath,
  getMdFiles,
  readMdFile,
  getMdLinks,
  getMdLinksStatus
};