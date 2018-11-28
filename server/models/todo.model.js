// grab the things we need
var mongoose = require('mongoose');

// create a schema
var todoSchema = new mongoose.Schema({
  task: String,
  completed_at: Date,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// make this available to our todos in our Node applications
module.exports = mongoose.model('Todo', todoSchema);