var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
require('./');
var Compound = mongoose.model('Compound');
var Promise = require('bluebird');

var deepPopulate = require('mongoose-deep-populate')(mongoose);

var bufferSchema = new mongoose.Schema({
  volume: { 
    type: {
      value: {type: Number},
      units: {
        type: String, 
        enum: ['L', 'cL', 'dL', 'mL', 'uL']
      }
    },
    required: true
  },
  compounds: [{
    value: {type:ObjectId, ref: 'Compound' },
    concentration: {
      value: Number,
      units: {type: String, enum: ['M', 'mM', 'uM', 'nM', 'pM']}
    },
    amount: Number
  }],
  name: String,
  user: {type: ObjectId, ref: 'User'},
  string: String
});

bufferSchema.plugin(deepPopulate);


bufferSchema.path('volume').set(function (volStr) {
  return this.constructor.strParse(volStr, ['L', 'cL', 'dL', 'mL', 'uL']);
});

bufferSchema.virtual('liters').get(function () {
  var units = this.volume.units;
  var value = this.volume.value;
  var liters = this.constructor.VOLUME_CONVERSION[units] * Number(value);
  return liters;
});

bufferSchema.virtual('cpdsMolarConc').get(function () {
  var self = this;
  return this.compounds.map(function (compoundConcObj) {
    var value = compoundConcObj.concentration.value;
    var units = compoundConcObj.concentration.units;
    return self.constructor.CONC_CONVERSION[units] * Number(value);
  });
});

// bufferSchema.virtual('nameify').get(function () {
//   if (this.name) return this.name;
//   var self = this;
//   return this.compounds.reduce(function (name, cpd) {
//     cpdVal = cpd.value;
//     var namePart = cpd.concentration.value.toString() + ' ' + cpd.concentration.units;
//     namePart += ' ' + cpdVal.formula;
//     name.push(namePart);
//     return name;
//   }, []).join(', ');
// });

bufferSchema.virtual('milliliters').get(function () {
  var units = this.volume.units;
  var value = this.volume.value;
  var liters = 1000 * this.constructor.VOLUME_CONVERSION[units] * Number(value);
  return liters;
});

bufferSchema.virtual('microliters').get(function () {
  var units = this.volume.units;
  var value = this.volume.value;
  var liters = 1000000 * this.constructor.VOLUME_CONVERSION[units] * Number(value);
  return liters;
});



bufferSchema.statics.strParse = function (str, possibles) {
  var number = str.match(/\d+/)[0];
  if (!number) throw new Error("No number given");
  var unit = str.match(/[a-zA-Z]+/)[0];
  if (possibles.indexOf(unit) === -1) throw new Error("Could not parse unit");
  return {value: Number(number), units: unit};
};


bufferSchema.methods.addCompound = function (compoundStr, concStr) {
  var concentration = this.constructor.strParse(concStr, ['M', 'mM', 'uM', 'nM', 'pM']);
  var self = this;
  return Compound.create({formula: compoundStr})
  .then(function (compound) {
    var compObj = {value: compound, concentration: concentration};
    self.compounds.push(compObj);
    return self.save();
  });
};

// bufferSchema.methods.storeAmounts = function () {
//   var self = this;
//   var cpdsMolarConc = this.cpdsMolarConc;
//   return this.populateCompounds()
//   .then(function (buffer) {
//     buffer.compounds.forEach(function (compoundConcObj, index) {
//       var cpd = compoundConcObj.value;
//       var conc = cpdsMolarConc[index];
//       compoundConcObj.amount = cpd.measureAmount(conc, self.liters);
//     });
//   });
// };

bufferSchema.methods.populateCompounds = function () {
  var self = this;
  return new Promise(function (resolve, reject) {
    self.deepPopulate('compounds.value', function (err, buffer) {
      if (err) reject(err);
      resolve(buffer);
    });
  });
};

bufferSchema.methods.toString = function () {
  if (this.name) return this.name;
  var self = this;
  return this.populateCompounds()
  .then(function (buffer) {
    return buffer.compounds.reduce(function (name, cpd) {
      cpdVal = cpd.value;
      var namePart = cpd.concentration.value.toString() + ' ' + cpd.concentration.units;
      namePart += ' ' + cpdVal.formula;
      name.push(namePart);
      return name;
    }, []).join(', ');
  })
};

var Buffer = mongoose.model('Buffer', bufferSchema);

Buffer.VOLUME_CONVERSION = {
  L: 1,
  dL: 1/10,
  cL: 1/100,
  mL: 1/1000,
  uL: 1/1000000
};

Buffer.CONC_CONVERSION = {
  M: 1,
  mM: 1/1000,
  uM: 1/1000000,
  nM: 1/1000000000,
  pM: 1/1000000000000
};



module.exports = Buffer;

















