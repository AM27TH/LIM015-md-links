const color = require('chalk');

const asteriskLine = '*************************************************************';
const dashLine = '-------------------------------------------------------------';

const helpMessage = `
${color.magenta(asteriskLine)}
${color.yellow('                        HELP MD-LINKS')}
${color.magenta(asteriskLine)}
${color.italic('Use the library with the command md-links and inputting\nthe path:') +
color.blue(' md-links <path-to-file>')}
${color.green('Example')}
${color.green(dashLine)}
$ md-links ./some/example.md
./some/example.md https://github.com/ GitHub 2
./some/example.md https://fabook.c/ Facebook 6
./some/example.md http://google.com/x Google 10
${color.green(dashLine)}

${color.italic('If you want to use options, you can try the command:')}
${color.blue('md-links <path-to-file> [options]')}

${color.cyan('Example option --validate: Verify if link is valid')}
${color.green(dashLine)}
$ md-links ./some/example.md --validate
./some/example.md https://github.com/ ok 200 GitHub 2
./some/example.md https://fabook.c/ fail noStatus Facebook 6
./some/example.md http://google.com/x fail 404 Google 10
${color.green(dashLine)}

${color.cyan('Example option --stats: Statistics')}
${color.green(dashLine)}
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
${color.green(dashLine)}

${color.cyan('Example option --validate --stats')}
${color.green(dashLine)}
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
Broken: 2
${color.green(dashLine)}`;

module.exports = {
  helpMessage
};