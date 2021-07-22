#!/usr/bin/env node
const process = require('process');

//Leer linea de comandos
const argv = process.argv;

function mdLinks(){
    console.log(argv);
}
console.log(mdLinks());