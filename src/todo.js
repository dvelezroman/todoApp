const fs = require('fs');
const colors = require('colors/safe');

let todos = [];

const cargarDB = () => {
  try {
    todos = require('../db/data.json');
  } catch (error) {
    todos = [];
  }
}

const listToDos = () => {
  cargarDB();
  return todos;
}

const createToDo = task => {
  cargarDB();
  let newToDo = {
    task,
    completed: false
  };
  todos.push(newToDo);
  return new Promise((resolve, reject) => {
    fs.writeFile('db/data.json', JSON.stringify(todos), (err) => {
      if (err) reject(err);
      else resolve(task);
    })
  })
};

const updateToDo = (task, status = true) => {
  cargarDB();
  let index_of_todo = todos.findIndex( todo => todo.task === task);  
    return new Promise((resolve, reject) => {
      if (index_of_todo >= 0) {
        todos[index_of_todo].completed = status;
        fs.writeFile('db/data.json', JSON.stringify(todos), (err) => {
          if (err) reject(err);
          else resolve(`Task <${task}> was updated`);
        })
      } else reject('Task does not exists');
    })
}

const deleteToDo = task => {
  cargarDB();
  let flag = false;
  todos = todos.filter( todo => {
    if (todo.task != task) {
      return true;
    } else {
      flag = true;
      return false;
    }
  });
  return new Promise((resolve, reject) => {
    if (!flag) reject(`Task ${task} does not exist`);
    fs.writeFile('db/data.json', JSON.stringify(todos), (err) => {
      if (err) reject(err);
      else resolve(`Task <${task}> was deleted`);
    })
  })
}

module.exports = {
  createToDo,
  listToDos,
  updateToDo,
  deleteToDo
};