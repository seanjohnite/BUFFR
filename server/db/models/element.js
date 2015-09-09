var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('./');

var pt = require('periodic-table');


var elementSchema = new mongoose.Schema({
  mW: {type: Number, required: true },
  formula: {type: String, required: true},
});

elementSchema.virtual('name').get(function () {
  return pt.symbols[this.formula].name;
});

var Element = mongoose.model('Element', elementSchema);

module.exports = Element;
