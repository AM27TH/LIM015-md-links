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

const getMdLinks = (mdFilesPaths) => {
  const regexLine = /!*\[(.+?)\]\((https?.+?)\)/gi;
  const regexText = /\[[^\s]+(.+?)\]/gi;
  const regexLink = /\((https?.+?)\)/gi;
  return mdFilesPaths.reduce((accumulator, mdFilePath) => {
    const readMdFile = fs.readFileSync(mdFilePath, 'utf-8');
    const mdLines = readMdFile.split('\r\n');
    return accumulator.concat(
      mdLines.reduce((accumulator, line) => {
      let newLine = line.match(regexLine);
      if(!newLine) return accumulator;
      newLine = newLine.toString();
      const mdLinkHref = line.match(regexLink).join().slice(1, -1);
      const mdLinkText = line.match(regexText).join().slice(1, -1).substring(0,50);
      return accumulator.concat({
            href: mdLinkHref,
            text: mdLinkText,
            file: mdFilePath,
            line: mdLines.indexOf(line) + 1
          }
      );
    }, [])
    );
  }, []);
};

const getMdLinksStatus = (links) => Promise.all(links.map((link) =>
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
)).then(statusLinks => { return statusLinks; });

module.exports = {
  absolutePath,
  validatePath,
  getMdFiles,
  getMdLinks,
  getMdLinksStatus
};