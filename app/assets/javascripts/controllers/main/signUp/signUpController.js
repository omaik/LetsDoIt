angular.module('letsDoIt')

.controller('signUpController', ['$scope', function ($scope) {
  $scope.emailPattern =/.+@.+\..+/i;
  $scope.namePattern = /^[a-zA-Z\u0400-\u04FF]+$/;
  $scope.errorMessages = {
    'pattern':'has incorrect format',
    'minlength':'is too short',
    'maxlength':'is too long'
  };
  $scope.isEmpty = function()  {
    for(var i = 0; i < arguments.length; i++) {
        for(var prop in arguments[i]) {
            if(arguments[i].hasOwnProperty(prop))
                return false;
        }
      }
    return true;
    }
  $scope.isTotalEmpty = function(obj) {
    return $scope.isEmpty(obj.emailField.$error, obj.userNameField.$error, obj.passwordField.$error,obj.passwordConfirmationField.$error,obj.firstNameField.$error,obj.lastNameField.$error)
  };
}]);
