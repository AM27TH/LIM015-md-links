#!/usr/bin/env node
const process = require('process');
const color = require('chalk');
const API = require('./mdLinks.js');

const argv = process.argv;

function mdLinks(argv){
  const path = argv[2];
  let options = {};
  switch(argv.slice(3).join(',')){
    case '--stats,--validate':
      options = { validate: true, stats: true};
      break;
    case '--validate':
      options = { validate: true, stats: false};
      break;
    case '--stats':
      options = { validate: false, stats: true};
      break;
    default:
      options = {validate: false, stats: false};
  }
  API.mdLinks(path, options)
  .then(links => {
    if (options.stats) {
      //stats.
      //if validate
    }else{
      links.forEach((link) => {
        console.log(color.magenta(link.file), color.cyan(link.href),
          (options.validate)? ((link.ok === 'ok')? color.green(link.ok, link.status):color.red(link.ok, link.status)): '',
          link.text);
      });
    }
  })
  .catch(error => console.log(color.bgRed(error)));
}

mdLinks(argv);