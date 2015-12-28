angular.module('letsDoIt')
.controller('EditProfilesController', [
  '$scope',
  '$location',
  '$state',
  '$stateParams',
  'userProfile',
  'Auth',
  'Upload',
 function($scope, $location, $state, $stateParams, userProfile, Auth, Upload) {
  $scope.currentUser = Auth._currentUser;
  $scope.day = [];
  for (var i = 0; i <= 30; ++i) {
    $scope.day.push(i+1);
  };
  $scope.month = [];
  for (var i = 0; i <= 11; ++i) {
    $scope.month.push(i+1);
  };
  $scope.year = [];
  for (var i = 1979; i <= 2009; ++i) {
    $scope.year.push(i+1);
  };
  $scope.namePattern = /^[a-zA-Z\u0400-\u04FF]+$/;
  $scope.errorMessages = {
    'pattern':'has incorrect format',
    'maxlength':'is too long'
  };
  $scope.err = {
      errors: {},
      isError: false
    }
  $scope.profile = userProfile.get({ id: $stateParams.id }, function() {
  });
  $scope.updateProfile = function(file) {
    var profileId = $scope.profile.id;
    var resource_url = '/users/'+ $scope.profile.id +'.json';
     if (file !== undefined) {
        file.upload = Upload.upload({
            url: resource_url,
            method: 'PUT',
            fields: { 'user[avatar]': $scope.avatar },
            file: file,
            fileFormDataName: 'user[avatar]'
        });
    }
    var profileId = $scope.profile.id;
    var NOT_VALID_NAME = "You entered invalid data";
    if($scope.editProfile.$invalid) {
      $scope.errHandle = true;
      $scope.profileErrMsg = NOT_VALID_NAME;
      return;
    };
    $scope.profile.$update(function() {

      $state.go('profile', {id: profileId});
    },
    function(error, status) {
      console.log('Status is: ' + status);
    });
  };
}]);
