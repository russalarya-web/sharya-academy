var mongoose = require('mongoose');
var config = require('../config/key');

// mongoDB set up
mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error(err));

module.exports = mongoose;