var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Element = mongoose.model('Element');

var chai = require('chai');
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'));
chai.should();
var expect = chai.expect;

describe('Element Model', function () {

  beforeEach('Establish DB connection', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });

  describe('Validations', function () {


    it('should err if no formula or mW provided', function () {
      var element = new Element();
      return element.validate().should.be.rejected.then(function (error) {
        expect(error.errors).to.have.property('formula');
        expect(error.errors).to.have.property('mW');
      });
    });
    
  });

});