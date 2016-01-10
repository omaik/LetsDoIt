angular.module('letsDoIt')

.controller('signUpController', [
  '$scope',
  '$state',
  'Auth',
  function ($scope, $state, Auth) {
    $scope.emailPattern =/.+@.+\..+/i;
    $scope.namePattern = /^[a-zA-Z\u0400-\u04FF]+$/;
    $scope.errorMessages = {
      'pattern':'has incorrect format',
      'minlength':'is too short',
      'maxlength':'is too long'
    };
    $scope.err = {
      errors: {},
      isError: false
    }
    $scope.addUser = function() {
      var credentials = $scope.user;
      var config = {
          headers: {
              'X-HTTP-Method-Override': 'POST'
          }
      };
      Auth.register(credentials, config).then(function(registeredUser) {
            Auth._currentUser = registeredUser;
            $state.go('root');
        }, function(error) {
          $scope.err.errors = error.data.errors;
          $scope.err.isError = true;
      });
    };
  }
]);
