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
      else resolve(`Task <${task}> created`);
    })
  })
};

module.exports = {
  createToDo,
  listToDos,
};