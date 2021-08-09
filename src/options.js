const commandOptions = (allOptions) => {
  let options = {validate: false, stats: false};
  switch(allOptions.join(',')){
    case '--stats,--validate':
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
};

module.exports = {
  commandOptions
};