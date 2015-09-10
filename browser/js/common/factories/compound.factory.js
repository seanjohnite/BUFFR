var pt = require('periodic-table');


app.factory('Compound', function () {

  function Compound(props) {
    this.conc = null;
    this.formula = null;
    angular.extend(this, props);
  }

  Compound.prototype.getElements = function () {
    this.elements = formulaParser(this.formula);
    this.elements.forEach(function (element) {
      element.mW = getMW(element.name);
    });
    this.mW = this.getMW();
  }

  Compound.prototype.getMW = function () {
    return this.elements.reduce(function (mem, el) {
      return mem + (el.mW * el.number);
    }, 0);
  };

  return Compound;
});

function getMW (element) {
  console.log(pt.symbols[element].atomicMass);
  var mass = pt.symbols[element].atomicMass;
  if (typeof mass === 'string')
    mass = Number(mass.slice(0, -3));
  else mass = element.atomicMass[0];
  return Number(mass);
}


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
  formula = objectComposer(formula);
  return Object.keys(formula).map(function (key) {
    return {name: key, number: formula[key]};
  });
}

function compoundMatcher(str) {
  var formula = formulaParser(str);
      console.log(formula);
  return Object.keys(formula).map(function(element) {
    if(formula[element] === 1) return element;
    return element + formula[element];
  });
}















