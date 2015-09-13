app.directive('bufferShow', function (Buffer) {
  
  function link(scope, element, attrs) {
    

  }

  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/buffer-show/buffer-show.html',
    link: link,
    scope: {
      buffer: "="
    }
  };
});