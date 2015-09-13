app.directive("validConc", function () {
  return {
    restrict: "A",
    require: 'ngModel',
    link: function (scope, element, attrs, ctrl) {
      ctrl.$validators.validConc = function (modelValue, viewValue) {
        var letterPart = viewValue.match(/[a-zA-Z]+/)[0];
        return !!parseFloat(viewValue) && (['M', 'mM', 'uM', 'nM', 'pM'].indexOf(letterPart) > -1);
      }
    }
  }
})