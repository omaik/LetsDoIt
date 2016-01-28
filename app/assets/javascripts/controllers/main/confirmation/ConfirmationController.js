angular.module('letsDoIt')

.controller('ConfirmationController', [
  '$scope',
  'confirmationResource',
  function($scope, confirmationResource){
    $scope.sended = {
      sended: false,
      error: false
    }
    $scope.confirm = function() {
    var email = new confirmationResource({
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
