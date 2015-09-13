app.factory('Parser', function () {

  var pt = require('periodic-table');
  var elementList = pt.all().map(function (elObj) {
    return elObj.symbol;
  });

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

    var elementsArr = [], newMatches = formula.match(/[A-Z][a-z]?\d*/g),
    el;
    if (!newMatches) return elementsArr;
    return newMatches.map(function (element) {
      var number = parseInt((element.match(/\d+/g) || '1')[0]);
      var el = element.match(/[A-Z][a-z]?/g)[0];
      return {name: el, number: number};
    });
  }

  function formulaParser(formula) {
    formula = simplify(formula);
    formula = objectComposer(formula);
    formula = formula.filter(function (obj) {
      return elementList.indexOf(obj.name) > -1;
    });
    return formula;
  }
  return formulaParser;
})