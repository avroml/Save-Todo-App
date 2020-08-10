const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field cannot be blank. What to do?',
  },
  completed: {
    type: Boolean,
    default: false,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
