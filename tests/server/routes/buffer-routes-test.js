// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');

var Buffer = mongoose.model('Buffer');
var Compound = mongoose.model('Compound');
var Element = mongoose.model('Element');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Buffers Route', function () {

  beforeEach('Establish DB connection', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  beforeEach('Seed a couple elements', function () {
    return Element.create([{
        "formula": "H",
        "mW": 1.00794
      }, {
        "formula": "C",
        "mW": 12.0107
      }, {
        "formula": "O",
        "mW": 15.9994
      }, {
        "formula": "Na",
        "mW": 22.98976928
      }, {
        "formula": "Cl",
        "mW": 35.453
      } 
    ]);
  });

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });

  describe('buffers', function () {

    var guestAgent;

    beforeEach('Create guest agent', function () {
      guestAgent = supertest.agent(app);
    });

    describe('GET /api/buffers', function () {
      it('should not have any buffers in the database', function (done) {
        guestAgent.get('/api/buffers')
          .expect(200)
          .end(function (err, res) {
            if (err) done(err);
            else {
              expect(res.body instanceof Array).to.be.true;
              expect(res.body.length).to.equal(0);
              done();
            }
          });
      });
    });

    describe('POST /api/buffers', function () {
      it('should add a buffer to the database', function (done) {
        var buffer = {
          volume: '5 L',
          compounds: [{
            value: {
              formula: 'NaCl'
            },
            concentration: {
              value: 5,
              units: 'M'
            }
          }, {
            value: {
              formula: 'CH3'
            },
            concentration: {
              value: 4,
              units: 'mM'
            }
          }]
        };

        guestAgent.post('/api/buffers')
          .send(buffer)
          .end(function (err, res) {
            if (err) done(err);
            else {
              expect(res.body.volume.value).to.equal(5);
              expect(res.body.volume.units).to.equal('L');
              Buffer.find()
              .then(function (buffers) {
                expect(buffers.length).to.equal(1);
                done();
              });
            }
          });
      });
    });

    describe('GET /api/buffers/:bufferId', function () {

      var bufferId;

      beforeEach('load buffer', function (done) {
        var buffer = {
          volume: '5 L',
          compounds: [{
            value: {
              formula: 'NaCl'
            },
            concentration: {
              value: 5,
              units: 'M'
            }
          }, {
            value: {
              formula: 'CH3'
            },
            concentration: {
              value: 4,
              units: 'mM'
            }
          }]
        };

        guestAgent.post('/api/buffers')
          .send(buffer)
          .end(function (err, res) {
            if (err) done(err);
            else {
              bufferId = res.body._id;
              done();
            }
          });
      });

      it('gets info for an already made buffer', function (done) {
        expect(bufferId).to.be.ok;
        guestAgent.get('/api/buffers/' + bufferId)
          .expect(200)
          .end(function (err, res) {
            if (err) done(err);
            else {
              expect(res.body._id).to.equal(bufferId);
              done();
            }
          });
      });
    });

    describe('PUT /api/buffers/:bufferId', function () {

      var bufferId;

      beforeEach('load first buffer', function (done) {
        var buffer = {
          volume: '5 L',
          compounds: [{
            value: {
              formula: 'NaCl'
            },
            concentration: {
              value: 5,
              units: 'M'
            }
          }, {
            value: {
              formula: 'CH3'
            },
            concentration: {
              value: 4,
              units: 'mM'
            }
          }]
        };

        guestAgent.post('/api/buffers')
          .send(buffer)
          .end(function (err, res) {
            if (err) done(err);
            else {
              bufferId = res.body._id;
              done();
            }
          });
      });

      it('edits a current buffer', function (done) {

        var changeBuffer = {volume: '3 mL'};

        guestAgent.put('/api/buffers/' + bufferId)
          .send(changeBuffer)
          .end(function (err, res) {
            if (err) done(err);
            else {
              expect(res.body.volume.value).to.equal(3);
              expect(res.body.volume.units).to.equal('mL');
              done();
            }
          });

      })

    });

  });

});


























