angular.module('letsDoIt')
.controller('PasswordController', [
  '$scope',
  'forgotResource',
  function($scope, forgotResource){
    $scope.sended = {
      sended: false,
      error: false
    }
    $scope.confirm = function() {
    var email = new forgotResource({
      email: $scope.user.email
    })
      email.$save(
        function(data) {
          $scope.sended.sended = true;
        },
        function(data) {
          $scope.sended.error = true;
        }
      );
    };
}])
