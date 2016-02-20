angular.module('letsDoIt')
.controller('PasswordController', [
  '$scope',
  'forgotResource',
  function($scope, forgotResource){
    var email;
    $scope.sended = {
      sended: false,
      error: false
    }
    $scope.confirm = function() {
    email = new forgotResource({
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
