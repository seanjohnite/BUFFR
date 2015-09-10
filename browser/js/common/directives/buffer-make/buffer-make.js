app.directive('bufferMake', function (Buffer, Compound) {
  
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
      console.log("ran addCompound");
      scope.buffer.compounds.push(new Compound());
    };

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