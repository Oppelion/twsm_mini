const User = require('./users.model.js');

// Create and Save a new Todo
exports.create = (req, res) => {
  // Validate request
  if(!req.body.highscore) {
      return res.status(400).send({
          message: "User highscore can not be empty"
      });
  }

  // Create a Todo
  const user = new User({
      name: req.body.name || "Untitled User", 
      highscore: req.body.highscore
  });

  // Save Todo in the database
  user.save()
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while creating the User."
      });
  });
};

// Retrieve and return all todos from the database.
exports.findAll = (req, res) => {
  User.find()
  .then(users => {
      res.send(users);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving users."
      });
  });
};

// Find a single todo with a id
exports.findOne = (req, res) => {
  User.findById(req.params.id)
  .then(todo => {
      if(!todo) {
          return res.status(404).send({
              message: "user not found with id " + req.params.id
          });            
      }
      res.send(todo);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "User not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Error retrieving user with id " + req.params.id
      });
  });
};

// Update a todo identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if(!req.body.highscore) {
      return res.status(400).send({
          message: "User highscore can not be empty"
      });
  }

  // Find todo and update it with the request body
  User.findByIdAndUpdate(req.params.id, {
      title: req.body.name || "Untitled User",
      highscore: req.body.highscore
  }, {new: true})
  .then(user => {
      if(!user) {
          return res.status(404).send({
              message: "User not found with id " + req.params.id
          });
      }
      res.send(user);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "User not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Error updating user with id " + req.params.id
      });
  });
};

// Delete a todo with the specified id in the request
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.id)
  .then(user => {
      if(!user) {
          return res.status(404).send({
              message: "User not found with id " + req.params.id
          });
      }
      res.send({message: "User deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "User not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Could not delete user with id " + req.params.id
      });
  });
};