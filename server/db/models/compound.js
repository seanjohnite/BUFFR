var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Promise = require('bluebird');
require('./');


var deepPopulate = require('mongoose-deep-populate')(mongoose);


var Element = mongoose.model('Element');

var ObjectId = mongoose.Schema.Types.ObjectId;

var compoundSchema = new mongoose.Schema({
  formula: {type: String, required: true},
  mW: {type: Number, required: true},
  elements: {
    type: [{
      value: {
        type: ObjectId,
        ref: 'Element'
      },
      number: Number,
    }],
    required: true
  }
});

compoundSchema.plugin(deepPopulate);

//how to use:
// cpd.deepPopulate('elements.value', function (err, stuff) {
//   if (err) throw err;
//   console.log(JSON.stringify(stuff, null, 2));
// })

// so I was just thinking about making our compound model just have one big
// pre-validate hook, where you could just do something like new Compound({formula: 'NaCl'})
// and then when validated, it would fill in MW, elements array, etc...
// you can see the utility functions I'm thinking about for this with tests
// in utilities.js

compoundSchema.statics.findOrCreate = function(cpd) {
  var self = this;
  return this.findOne(cpd)
  .then(function (compound) {
    if (!compound) return self.create(cpd);
    else return compound;
  });
};

compoundSchema.methods.getMW = function() {
  var self = this;
  return new Promise(function (resolve, reject) {
    self.deepPopulate('elements.value', function (err, cpd) {
      if (err) return reject(err);
      resolve(cpd);
    });
  })
  .then(function(cpd) {
    return cpd.elements.reduce(function(curr, prev) {
      return curr + prev.value.mW * prev.number;
    }, 0);
  });
};

function simplify(formula) {
    var regEx = /(\(([A-Z][a-z]?\d*)+\)\d*|\[([A-Z][a-z]?\d*)+\]\d*|\{([A-Z][a-z]?\d*)+\}\d*)/g;
    var f = formula.match(regEx);

    function firstPart(element) {
      var number = element.match(/\d+$/g);
      if(number) number = parseInt(number);
      else number = 1;
      var innerMatch = element.match(/[A-Z][a-z]?\d*/g);
      var str = '';
      innerMatch.forEach(function(subStr) {
        var subNumber = subStr.match(/\d+$/g);
        if(subNumber) subStr = subStr.replace(subNumber, parseInt(subNumber) * number);
        else {
            if(number !== 1) subStr += number;
        }
        str += subStr;
      });
      formula = formula.replace(element, str);
    }
    while(f) {
      f.forEach(firstPart);
      f = formula.match(regEx);
    }
    return formula;
}

function objectComposer(formula) {
    var elementsObj = {}, newMatches = formula.match(/[A-Z][a-z]?\d*/g),
    el;
    newMatches.forEach(function(element) {
        el = element.match(/[A-Z][a-z]?/g);
        var number = parseInt((element.match(/\d+/g) || '1')[0]);
        if(elementsObj[el]) elementsObj[el] += number;
        else elementsObj[el] = number;
    });
    return elementsObj;
}

function formulaParser(formula) {
  formula = simplify(formula);
  return objectComposer(formula);
}

function compoundMatcher(str) {
  var formula = formulaParser(str);
  return Object.keys(formula).map(function(element) {
    if(formula[element] === 1) return element;
    return element + formula[element];
  });
}

compoundSchema.methods.getElements = function () {
  var self = this;
  var elArr = compoundMatcher(this.formula);
  var promArr = [];
  elArr.forEach(function (el) {
    var number = parseInt((el.match(/\d+/) || '1')[0]);
    var elStripped = el.replace(/\d+/, '');

    promArr.push(Element.findOne({formula: elStripped}).exec().then(function(element) {
      return {value: element._id, number: number};
    }));
  });
  return Promise.all(promArr).then(function(elements) {
    self.elements = elements;
    return self;
  });
};

// adding this for a use in Buffers
compoundSchema.methods.measureAmount = function (concentration, volume) {
  return Number(concentration) * Number(volume) * Number(this.mW);
};


compoundSchema.pre('validate', function (next) {
  if (!this.formula) return next();
  if (this.formula && this.elements && this.mW) return next(); // to check if these are already done
  var self = this;
  this.getElements().then(function () {
    return self.getMW();
  })
  .then(function (number) {
    self.mW = number;
    next();
  });
});


var Compound = mongoose.model('Compound', compoundSchema);

module.exports = Compound;

