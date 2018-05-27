var mongoose = require('mongoose')

mongoose.Promise = global.Promise // Use promises by default
mongoose.connect('mongodb://localhost:27017/TodoApp')

module.exports = { mongoose }