var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Buffer = mongoose.model('Buffer');
var Compound = mongoose.model('Compound');
var Element = mongoose.model('Element');

var chai = require('chai');
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'));
chai.should();
var expect = chai.expect;

describe('Buffer Model', function () {

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

  describe('Validations', function () {

    it('should err if no volume provided', function () {
      var buffer = new Buffer();
      return buffer.validate().should.be.rejected.then(function (error) {
        expect(error.errors).to.have.property('volume');
      });
    });

    it('should correctly set volume', function () {
      var buffer = new Buffer();
      buffer.volume = '5 L';
      buffer.volume.value.should.equal(5);
      buffer.volume.units.should.equal('L');
    });

    it('getting volume should output number of liters', function () {
      var buffer = new Buffer();
      buffer.volume = '5 mL';
      buffer.liters.should.equal(0.005);
    });

  });

  describe('Statics', function () {

    describe('strParse', function () {

      it('should get the correct number', function () {
        Buffer.strParse('3 mM', ['M', 'mM', 'uM', 'nM', 'pM'])
        .should.have.property('value', 3);
        Buffer.strParse('3M', ['M', 'mM', 'uM', 'nM', 'pM'])
        .should.have.property('value', 3);
        Buffer.strParse('5M', ['M', 'mM', 'uM', 'nM', 'pM'])
        .should.have.property('value', 5);
      });

      it('should get the correct concentration units', function () {
        Buffer.strParse('3 mM', ['M', 'mM', 'uM', 'nM', 'pM']).should.have.property('units', 'mM');
        Buffer.strParse('3M', ['M', 'mM', 'uM', 'nM', 'pM']).should.have.property('units', 'M');
        Buffer.strParse('5M', ['M', 'mM', 'uM', 'nM', 'pM']).should.have.property('units', 'M');
      });

      it('should err with no number', function () {
        expect(Buffer.strParse.bind(null, 'mM', ['M', 'mM', 'uM', 'nM', 'pM'])).to.throw(Error);
        expect(Buffer.strParse.bind(null, ' M', ['M', 'mM', 'uM', 'nM', 'pM'])).to.throw(Error);
      });

      it('should err with unknown units', function () {
        expect(Buffer.strParse.bind(null, '4 mg', ['M', 'mM', 'uM', 'nM', 'pM'])).to.throw(Error);
        expect(Buffer.strParse.bind(null, '8 dM', ['M', 'mM', 'uM', 'nM', 'pM'])).to.throw(Error);
      });

    });

    describe('makeCompound', function () {

      it('should take an compound/concentration object, make the compound, and return its objectId', function () {
        // can run with compounds
        var compound = {
          value: {
            formula: 'NaCl'
          },
          concentration: {
            value: 5,
            units: 'M'
          }
        };
        return Buffer.makeCompound(compound)
        .then(function (result) {
          expect(result._bsontype).to.equal('ObjectID');
        }).should.be.fulfilled;
        
      });
    });

    describe('makeAllCompounds', function () {

      it('should take an array of compound/concentration objects, make the compound, and return their objectIds', function () {
        // can run with compounds
        var compounds = [{
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
        }];
        return Buffer.makeAllCompounds(compounds)
        .then(function (cpdIDArr) {
          cpdIDArr.forEach(function (cpdID) {
            expect(cpdID._bsontype).to.equal('ObjectID');
          });
        }).should.be.fulfilled;
        
      });
    });

  });

  describe('Methods', function () {
    
    var buffer;
    beforeEach(function () {
      buffer = new Buffer();
    });


    describe('addCompound', function () {

      it('should add to the compounds list', function () {
        // can run with compounds
        buffer.volume = '5 L';
        return buffer.addCompound('NaCl', '3 M')
        .then(function (buff) {
          return buff.populateCompounds();
        })
        .then(function (buff) {
          buff.compounds.should.have.length(1);
          expect(buff.compounds[0].value.formula).to.equal('NaCl');
        });
        
      });
    });



    // describe('storeAmounts', function () {

    //   it('should add an amount property to the compound buffer object', function () {
    //     var buffer = new Buffer();
    //     buffer.volume = '1 L';
    //     return buffer.addCompound('NaCl', '1 M')
    //     .then(function (buffer) {
    //       return buffer.storeAmounts();
    //     })
    //     .then(function () {
    //       expect(buffer.compounds[0].amount).to.be.closeTo(58.44, 0.1);
    //     })
    //   });



    // });

  });

  describe('Virtuals', function () {

    describe('nameify', function () {

      // it('if it has a name, buffer.nameify is the name', function () {
      //   var buffer = new Buffer({name: 'PBS'});
      //   expect(buffer.nameify).to.equal('PBS');
      // });

      // it('if it doesn\'t have a name, buffer.nameify is the list of compounds', function () {
      //   var buffer = new Buffer();
      //   return buffer.addCompound('NaCl', '3 M')
      //   .then(function () {
      //     return buffer.addCompound('C2H4O2', '1 mM');
      //   })
      //   .then(function () {
      //     // console.log(buffer.nameify);
      //     expect(buffer.nameify).to.equal('3 M NaCl, 1 mM C2H4O2');
      //   });
      // });

    });

  });

  describe('Hooks', function () {});

});
