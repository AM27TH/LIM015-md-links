const API = require('./api.js');

const mdLinks = (path, options = {validate: false, stats: false}) => new Promise((resolve, reject) => {
  const absolutePath = API.absolutePath(path);
  if(!API.validatePath(absolutePath)) reject('Invalid path');
  const mdFiles = API.getMdFiles(absolutePath);
  if(mdFiles.length === 0) reject('No md-files found');
  const mdAllLinks = API.getMdLinks(mdFiles);
  if(mdAllLinks.length === 0) reject('No md-links found');
  if(options.validate) API.getMdLinksStatus(mdAllLinks).then(linksStatus => resolve(linksStatus));
  else resolve(mdAllLinks);
});

module.exports = {
  mdLinks
};