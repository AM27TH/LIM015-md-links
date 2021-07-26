const path = require('path');
const fs = require('fs');
//const fetch = require('node-fetch');

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

/* const getLinksStatus = (links) => Promise.all(links.map((link) =>
  fetch(link.href)
  .then(response => {
    return {
      ...link,
      status: response.status,
      ok: (response.status>=200 && response.status<=299)? 'ok': 'fail'
    };
  })
  .catch(() => {
    return {
      ...link,
      status: 'noStatus',
      ok: 'fail'
    };
  })
)).then(statusLinks => { return statusLinks; });
 */
module.exports = {
  absolutePath,
  validatePath,
  getMdFiles,
  /* getMdLinks,
  getLinksStatus */
};