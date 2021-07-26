const API = require('./api.js');

//prueba
const obj = [
  {
    href: 'https:studio-ghibli/images/8/80/Louis.jpg' //invalid link
  },
  {
    href: 'https://static.wikia.nocookie.net/studio-ghibli/images/2/28/Charlies.jpg' //valid link
  },
  {
    href: 'https://static.wikia.nocookie.net/studio-ghibli/images/8/80/Louis.jpg' //no found link
  }
];

const mdLinks = (path, options = {validate: false}) => new Promise((resolve, reject) => {
  const absolutePath = API.absolutePath(path);
  if(!API.validatePath(absolutePath)) reject('La ruta es inválida');
  const mdFiles = API.getMdFiles(absolutePath);
  if(mdFiles.length === 0) reject('Not found md-files');
  console.log(mdFiles);
  //getLinks
  if(options.validate) API.getLinksStatus(obj).then(linksStatus => resolve(linksStatus));
});

//probando
//console.log(API.getMdFiles('./test/files'));
//API.getLinksStatus(obj).then(data => console.log(data));

//console.log(API.absolutePath('D:/Laboratoria/repo/LIM015-data-lovers/README.md'));

module.exports = {
  mdLinks
};