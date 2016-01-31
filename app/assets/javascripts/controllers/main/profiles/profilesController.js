angular.module('letsDoIt')

.controller('ProfilesController', [
  '$scope',
  '$stateParams',
  'userProfile',
  'Auth',
  '$rootScope',
  function($scope, $stateParams, userProfile, Auth,$rootScope){
  userProfile.get({ id: $stateParams.id },function(data) {
  $scope.profile = data;
  $rootScope.$broadcast('profile-updated', data);
  },
  function(error, status) {
    console.log('Status is: ' + status);
  });
    Auth.currentUser().then(function (user){
    $scope.user = user;
  });

}]);
