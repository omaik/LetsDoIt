angular.module('letsDoIt')

.directive('ensureUnique', ['userProfile', function(userProfile) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, ele, attrs, c) {
      scope.$watch(attrs.ngModel, function(value) {
          userProfile.validate({data: value, type: c.$name}, function() {
            c.$setValidity('unique', true);
          }, function() {
            c.$setValidity('unique', false);
          });
      });
    }
  }
}]);
