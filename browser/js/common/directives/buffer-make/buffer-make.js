app.directive('bufferMake', function (Buffer) {
  
  function link(scope, element, attrs) {

    scope.buffer = new Buffer();

    scope.saveBuffer = function () {
      console.log("started save");
      scope.buffer.save()
      .then(function (buffer) {
        console.log("buffer is ", buffer);
        scope.savedBuffer = buffer;
        scope.buffer = new Buffer();
        scope.buffer.compounds = [{}];
      })
      .catch(function (err) {
        console.log(err);
      });
    }

    scope.buffer.compounds = [{}];

    scope.addCompound = function () {
      console.log("ran addCompound");
      scope.buffer.compounds.push({});
    };
  }

  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/buffer-make/buffer-make.html',
    link: link
  }
});