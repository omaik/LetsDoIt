angular.module('letsDoIt')
.controller('EditProfilesController', [
  '$scope',
  '$location',
  '$state',
  '$stateParams',
  'userProfile',
  'Auth',
  'Upload',
  '$translate',
 function($scope, $location, $state, $stateParams, userProfile, Auth, Upload, $translate) {
  $scope.image = {
    myImage: '',
    croppedImage: {}
  }
  $scope.day = [];
  for (var i = 0; i <= 30; ++i) {
    $scope.day.push(i+1);
  };
  $scope.month = [];
  for (var i = 0; i <= 11; ++i) {
    $scope.month.push(i+1);
  };
  $scope.year = [];
  for (var i = 2009; i >= 1929; --i) {
    $scope.year.push(i+1);
  };
  $scope.formatPattern = /^[a-zA-Z\u0400-\u04FF]+$/;
  $scope.errorMessages = {
    'pattern':'incorrect',
    'maxlength':'too_long'
  };
  $scope.err = {
      errors: {},
      isError: false
  };
  function handleFileSelect(evt) {
    var file = evt.currentTarget.files[0],
    reader = new FileReader();
    reader.onload = function (evt) {
      $scope.$apply(function($scope){
        $scope.image.myImage = evt.target.result;
      });
    };
    reader.readAsDataURL(file);
  };
  angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
  $scope.profile = userProfile.get({ id: $stateParams.id });
  $scope.updateProfile = function(file) {
    var profileId = $scope.profile.id;
    var NOT_VALID_NAME = "You entered invalid data";
    if($scope.editProfile.$invalid) {
      $scope.errHandle = true;
      $scope.profileErrMsg = NOT_VALID_NAME;
      return;
    };
    resource_url = '/users/'+ $scope.profile.id +'.json';
    if ($scope.avatar) {
      file.upload = Upload.upload({
        url: resource_url,
        method: 'PUT',
        fields: { 'user[avatar]': $scope.image.croppedImage, 'user[first_name]': $scope.profile.first_name, 'user[last_name]': $scope.profile.last_name, 'user[sex]': $scope.profile.sex, 'user[day]': $scope.profile.day, 'user[month]': $scope.profile.month, 'user[year]': $scope.profile.year, 'user[country]': $scope.profile.country, 'user[city]': $scope.profile.city, 'user[language]': $scope.profile.language },
        file: file,
        fileFormDataName: 'user[avatar]'
      }).then(function(user) {
        if (user.social_avatar !== $scope.profile.social_avatar)
          $translate.use(user.language);
          $state.go('profile', {id: profileId});
      })
    }
    else{
      $scope.profile.$update(function() {
      $state.go('profile', {id: profileId});
    },
    function(error, status) {
      $translate.use(user.language);
      console.log('Status is: ' + status);
    });
    };
  };
}]);

