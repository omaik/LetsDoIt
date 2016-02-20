angular.module('letsDoIt')

.directive('parallax', ['$window', function($window) {
  return {
    restrict: 'A',
    link: function($scope, elem, attrs) {
      var ypos, image
      var setPosition = function () {
        ypos = $window.pageYOffset;
        image = document.getElementById('loginbox');
        image.style.top = ypos * 0.6 + 'px';
      };
      angular.element($window).bind('load', function(e) {
        setPosition();
        $scope.$apply();
      });
      angular.element($window).bind("scroll", setPosition);
      angular.element($window).bind("touchmove", setPosition);
    }
  };
}]);
