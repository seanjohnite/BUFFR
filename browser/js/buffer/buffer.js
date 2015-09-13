app.config(function ($stateProvider) {
  $stateProvider.state('makeBuffer', {
    url: '/buffer',
    templateUrl: 'js/buffer/buffer.html',
    controller: function ($scope, Buffer) {
      $scope.buffer = new Buffer();
      $scope.$watch("buffer", function () {
        if (!$scope.buffer.formula) return;
        console.log("digesting buffer scope");
        $scope.$digest();
      }, true);
    }
  });
});