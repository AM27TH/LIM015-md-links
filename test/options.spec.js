const {
  commandOptions
} = require('../src/options.js');

describe('commands Options', () => {
  const validateTrue = {
    validate: true,
    stats: false
  };
  const statsTrue = {
    validate: false,
    stats: true
  };
  const optionsTrue = {
    validate: true,
    stats: true
  };
  const optionsFalse = {
    validate: false,
    stats: false
  };
  it('should be a function', () => {
    expect(typeof commandOptions).toBe('function');
  });
  it('should return validate and stats true', () => {
    expect(commandOptions(['--validate','--stats'])).toEqual(optionsTrue);
  });
  it('should return validate and stats true', () => {
    expect(commandOptions(['--stats','--validate'])).toEqual(optionsTrue);
  });
  it('should return validate and stats false', () => {
    expect(commandOptions([''])).toEqual(optionsFalse);
  });
  it('should return only stats true', () => {
    expect(commandOptions(['--stats'])).toEqual(statsTrue);
  });
  it('should return only validate true', () => {
    expect(commandOptions(['--validate'])).toEqual(validateTrue);
  });
});