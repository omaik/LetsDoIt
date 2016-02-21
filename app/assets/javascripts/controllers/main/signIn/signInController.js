angular.module('letsDoIt')

  .controller('SignInController', [
    '$scope',
    '$state',
    'Auth',
    '$rootScope',
    function($scope, $state, Auth, $rootScope){
    $scope.errorMessages = {
      'minlength':'too_short',
      'maxlength':'too_long'
    };
    $scope.err = {
      errors: {},
      isError: false
    }
    $scope.login = function() {
      var credentials = $scope.user;
      var config = {
        headers: {
          'X-HTTP-Method-Override': 'POST'
        }
      };
      Auth.login(credentials, config).then(function(user){
        $rootScope.signedIn = Auth.isAuthenticated();

      }, function(error){
          $scope.err.errors = error.data;
          $scope.err.isError = true;
      });
      $scope.$on('devise:login', function(event, currentUser) {
        $state.go('home');
      });
      $scope.$on('devise:new-session', function(event, currentUser) {
        $state.go('home');
      });
    }
  }]);
