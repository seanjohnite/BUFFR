app.directive('bufferMake', function (Buffer) {
  
  function link(scope, element, attrs) {

    scope.buffer = new Buffer();

    scope.buffer.compounds = [{}];

    scope.addCompound = function () {
      scope.buffer.compounds.push({});
    };
  }

  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/buffer-make/buffer-make.html',
    link: link
  }
});