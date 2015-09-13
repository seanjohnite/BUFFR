app.directive('bufferMake', function (Buffer, Compound, premadeBuffers) {
  
  function link(scope, element, attrs) {

    scope.saveBuffer = function () {
      scope.buffer.save()
      .then(function (buffer) {
        scope.savedBuffer = buffer;
        scope.buffer = new Buffer();
        scope.buffer.compounds = [new Compound()];
      })
      .catch(function (err) {
        console.log(err);
      });
    };

    scope.buffer.compounds = [new Compound()];

    scope.addCompound = function () {
      scope.buffer.compounds.push(new Compound());
    };

    scope.calcBuffer = function (compound) {
      if (compound){
        if (!/[a-zA-Z]+/.test(compound.conc)) return;
        compound.getElements();
      }
      scope.buffer.fillAmounts();
    };

    scope.removeCompound = function () {
      if (scope.buffer.compounds.length === 1) {
        scope.buffer.compounds = [new Compound()];
        return;
      }
      scope.buffer.compounds.pop();
    };

    scope.sourceCompound = function (compound) {
      compound.fillFormula();
    }

    scope.sourceBuffer = function (compound) {
      var premade = premadeBuffers(scope.buffer.name);
      if (premade) {
        scope.buffer = new Buffer(angular.copy(premade));
        scope.buffer.compounds = scope.buffer.compounds.map(function (compound) {
          return new Compound(compound);
        });
      }
    }

  }

  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/buffer-make/buffer-make.html',
    link: link,
    scope: {
      buffer: "="
    }
  };
});