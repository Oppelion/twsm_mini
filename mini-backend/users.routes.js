module.exports = (app) => {
  const users = require('./users.controller.js');
  const cors = require('cors')

  // Create a new todo
  app.post('/user', cors(), users.create);

  // Retrieve all todos
  app.get('/users', users.findAll);

  // Retrieve a single todo by id
  app.get('/user/:id', users.findOne);

  // Update a Todo with id
  app.put('/user/:id', users.update);

  // Delete a Todo by id
  app.delete('/user/:id', users.delete);
}