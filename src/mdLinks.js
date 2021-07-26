const API = require('./api.js');

//prueba
/* const obj = [
  {
    href: 'https:studio-ghibli/images/8/80/Louis.jpg' //invalid link
  },
  {
    href: 'https://static.wikia.nocookie.net/studio-ghibli/images/2/28/Charlies.jpg' //valid link
  },
  {
    href: 'https://static.wikia.nocookie.net/studio-ghibli/images/8/80/Louis.jpg' //no found link
  }
]; */

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

//probando
//console.log(API.getMdFiles(API.absolutePath('./test/files/')));
//API.getLinksStatus(obj).then(data => console.log(data));

/* console.log(API.getMdLinks([
  'D:\\Laboratoria\\repo\\LIM015-md-links\\test\\files\\empty.md',
  'D:\\Laboratoria\\repo\\LIM015-md-links\\test\\files\\links.md',
  'D:\\Laboratoria\\repo\\LIM015-md-links\\test\\files\\noEmpty\\link.md'
])); */

//console.log(API.absolutePath('D:/Laboratoria/repo/LIM015-data-lovers/README.md'));

module.exports = {
  mdLinks
};