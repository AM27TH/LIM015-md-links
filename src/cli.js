#!/usr/bin/env node
const process = require('process');

//Leer linea de comandos
const argv = process.argv;

function mdLinks(argv){
  const path = argv[2];
  const options = argv.slice(3);
  console.log(path, options);
}

mdLinks(argv);