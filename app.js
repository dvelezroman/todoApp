const argv = require('./config/yargs').argv;
const colors = require('colors/safe');

const { createToDo, listToDos, updateToDo, deleteToDo } = require('./src/todo');

let command = argv._[0];
let task = argv.description;

switch (command) {
  case 'create': {
    createToDo(task)
      .then(taskCreated => console.log(colors.green(`Task ${taskCreated} was created succesfully`)))
      .catch(err => console.log(colors.red(err)));
    break;
  }
  case 'list': {
    let todos = listToDos();
    console.log(colors.bold('==========TO DO LIST================'));
    if (todos.length === 0) console.log(colors.red('NO TASKS'));
    else {
      for (let todo of todos) {
        console.log('=====================================');
        console.log(colors.blue(`Task: ${todo.task}`));
        console.log(colors.green(`Completed: ${todo.completed ? 'Completed' : 'Pendant'}`));
      }
    }
    break;
  }
  case 'update': {
    updateToDo(task)
     .then(taskUpdated => console.log(colors.green(`Task ${taskUpdated} was updated`)))
     .catch(err => console.log(colors.red(err)));
    break;
  }
  case 'delete': {
    deleteToDo(task)
    .then(taskDeleted => console.log(colors.blue(taskDeleted)))
    .catch(err => console.log(colors.red(err)));
    break;
  }
  default: {
    console.log('Error in command...'); 
    break;
  }
}