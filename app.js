const argv = require('./config/yargs').argv;
const colors = require('colors/safe');

const { createToDo, listToDos } = require('./src/todo');

let command = argv._[0];
let task = argv.description;

switch (command) {
  case 'create': {
    createToDo(task)
      .then(taskCreated => console.log(colors.green(`${taskCreated}, succesfully`)))
      .catch(err => console.log(colors.red(err)));
    break;
  }
  case 'list': {
    console.log(colors.blue(listToDos()));
    break;
  }
  case 'update': {

    break;
  }
  default: {
    console.log('Error in command...'); 
    break;
  }
}