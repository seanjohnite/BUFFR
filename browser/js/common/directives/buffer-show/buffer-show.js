var pt = require('periodic-table');

app.directive('bufferShow', function (Buffer) {
  
  function link(scope, element, attrs) {
    console.log(pt.all());


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