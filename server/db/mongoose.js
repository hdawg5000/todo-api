var mongoose = require('mongoose')

mongoose.Promise = global.Promise // Use promises by default
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp')

module.exports = { mongoose }