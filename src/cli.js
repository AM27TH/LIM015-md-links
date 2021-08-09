#!/usr/bin/env node
const process = require('process');
const color = require('chalk');
const API = require('./index.js');
const { commandOptions }= require('./options.js');
const { helpMessage } = require('./messages.js');

const argv = process.argv;

function cliMdLinks(argv){
  const [,, path, ...allOptions] = argv;
  if(path === '--help') return console.log(helpMessage);
  const options = commandOptions(allOptions);
  API.mdLinks(path, options)
  .then(links => {
    if (options.stats) {
      const totalLinks = links.length;
      let uniqueLinks = new Set(links.map(link => link.href)).size;
      console.log(color.cyanBright('Total: ',totalLinks) + '\n' + color.green('Unique: ',uniqueLinks));
      if(options.validate){
        const brokenLinks = links.filter(link => link.ok === false).length;
        console.log(color.red('Broken: ', brokenLinks));
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

cliMdLinks(argv);
