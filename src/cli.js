#!/usr/bin/env node
const process = require('process');
const color = require('chalk');
const API = require('./mdLinks.js');

const argv = process.argv;

function commandOptions(argv){
  let options = {validate: false, stats: false};
  switch(argv.slice(3).join(',')){
    case '--stats,--validate':
      options = { validate: true, stats: true};
      break;
    case '--validate,--stats':
      options = { validate: true, stats: true};
      break;
    case '--validate':
      options = { validate: true, stats: false};
      break;
    case '--stats':
      options = { validate: false, stats: true};
      break;
    default:
      return options;
  }
  return options;
}

function mdLinks(argv){
  const path = argv[2];
  let options = commandOptions(argv);
  API.mdLinks(path, options)
  .then(links => {
    if (options.stats) {
      const totalLinks = links.length;
      let uniqueLinks = totalLinks; //falta implementar
      if(options.validate){
        const brokenLinks = links.filter(link => link.ok === false).length;
        uniqueLinks = totalLinks-brokenLinks;
        console.log(color.cyanBright('Total: ',totalLinks) + '\n' + color.green('Unique: ',uniqueLinks) + '\n' + color.red('Broken: ',brokenLinks));
      }else{
        console.log(color.cyanBright('Total: ',totalLinks) + '\n' + color.green('Unique: ',uniqueLinks));
      }
    }else{
      links.forEach((link) => {
        console.log(color.magenta(link.file), color.cyan(link.href),
          (options.validate)?((link.ok)? color.green('ok', link.status): color.red('fail', link.status)): '',
          link.text, link.line);
      });
    }
  })
  .catch(error => console.log(color.bgRed(error)));
}

mdLinks(argv);