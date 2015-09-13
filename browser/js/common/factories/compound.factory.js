app.factory('Compound', function (Parser, premadeCompounds) {

  var pt = require('periodic-table');

  function Compound(props) {
    this.conc = null;
    this.formula = null;
    angular.extend(this, props);
  }

  var possibleConcs = ['M', 'mM', 'uM', 'nM', 'pM'];

  var CONC_CONVERSION = {
    M: 1,
    mM: 1/1000,
    uM: 1/1000000,
    nM: 1/1000000000,
    pM: 1/1000000000000
  };

  Compound.strParse = function (str, possibles) {
    if (str){
      var number = parseFloat(str);
    }
    else return;
    if (!number) throw new Error("No number given");
    var unit = str.match(/[a-zA-Z]+/)[0];
    if (possibles.indexOf(unit) === -1) throw new Error("Could not parse unit");
    return {value: Number(number), units: unit};
  };

  Compound.prototype.getElements = function () {
    if (!this.formula) return;
    this.elements = Parser(this.formula);
    this.elements.forEach(function (element) {
      element.mW = getMW(element.name);
    });
    this.mW = this.getMW();
    this.formula = this.elements.reduce(function (form, el) {
      return form + el.name + (el.number === 1 ? "" : el.number);
    }, "");
  };

  Compound.prototype.getMW = function () {
    return this.elements.reduce(function (mem, el) {
      return mem + (el.mW * el.number);
    }, 0);
  };

  Compound.prototype.getMolarity = function () {
    var concObj = Compound.strParse(this.conc, possibleConcs)
    var value = concObj.value;
    var units = concObj.units;
    return CONC_CONVERSION[units] * Number(value);
  }


  Compound.prototype.fillAmount = function (liters) {
    if (!this.conc) {
      delete this.amount;
      return;
    }
    var molar = this.getMolarity();
    this.amount = molar * liters * this.mW;
  };

  Compound.prototype.prettifyAmount = function () {
    if (!this.amount) return;
    if (this.amount < 0.001)
      return (this.amount/1000000).toFixed(2) + " micrograms";
    if (this.amount < 1)
      return (this.amount/1000).toFixed(2) + " milligrams";
    return this.amount.toFixed(2) + " grams";
  };

  Compound.prototype.fillFormula = function () {
    console.log('filling', this);
    this.formula = premadeCompounds(this.name) || this.formula;
  };

  function getMW (element) {
    var mass = pt.symbols[element].atomicMass;
    if (typeof mass === 'string')
      mass = Number(mass.slice(0, -3));
    else mass = element.atomicMass[0];
    return Number(mass);
  }

  return Compound;
});






