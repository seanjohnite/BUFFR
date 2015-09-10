app.config(function ($stateProvider) {
  $stateProvider.state('makeBuffer', {
    url: '/buffer',
    templateUrl: 'js/buffer/buffer.html',
    controller: function ($scope, Buffer) {
      $scope.buffer = new Buffer();
    }
  });
});