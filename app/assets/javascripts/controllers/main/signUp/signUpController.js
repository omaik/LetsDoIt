angular.module('letsDoIt')

.controller('signUpController', [
  '$scope',
  '$state',
  'Auth',
  '$translate',
  function ($scope, $state, Auth, $translate) {
    $scope.isRegistrated = false;
    $scope.emailPattern =/.+@.+\..+/i;
    $scope.namePattern = /^[a-zA-Z\u0400-\u04FF]+$/;
    $scope.errorMessages = {
      'pattern':'incorrect',
      'minlength':'too_short',
      'maxlength':'too_long',
      'unique': 'not_unique'
    };
    $scope.err = {
      errors: {},
      isError: false
    }
    $scope.addUser = function() {
      var config = {
          headers: {
              'X-HTTP-Method-Override': 'POST'
          }
      };
      $scope.user.language = $translate.proposedLanguage() || $translate.use();
      Auth.register($scope.user, config).then(function(registeredUser) {
          Auth.logout({
          headers: {
              'X-HTTP-Method-Override': 'DELETE'
          }})
          $scope.isRegistrated = true;
        }, function(error) {
          $scope.err.errors = error.data.errors;
          $scope.err.isError = true;
      });
    };
  }
]);
