const commands = {
  description: {
      demand: true,
      alias: 'd',
      desc: 'ToDo description'
  },
  complete: {
    alias: 'c',
    default: true,
    desc: 'Marks as completed the ToDo'
  }
};

const argv = require('yargs')
  .command('create','Creates a ToDo', commands)
  .command('list','List all ToDos')
  .command('update','Sets a ToDo with completed property', commands)
  .help()
  .argv;

  module.exports = {
    argv,
  }