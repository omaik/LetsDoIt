angular.module('letsDoIt')
  .controller('NavController', [
  '$scope',
  'Auth',
  '$state',
  '$rootScope',
  '$translate',
  function($scope, Auth, $state, $rootScope, $translate){
  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
  };
  $scope.logout = function() {
  var config = {
    headers: {
      'X-HTTP-Method-Override': 'DELETE'
    }
  };
  Auth.logout(config).then(function(user) {
    $rootScope.signedIn = Auth.isAuthenticated();
    $state.go('login');
    });
    $scope.$on('devise:logout', function(event, user) {
      $scope.user = {};
      $rootScope.signedIn = false;
    });
  }
  Auth.currentUser().then(function (user){
    if (user.id !== undefined) {
      $scope.user = user;
      $rootScope.signedIn = Auth.isAuthenticated();
    }
  });
  $scope.$on('devise:new-registration', function (e, user){
    $scope.user = user;
    $rootScope.signedIn = true;
  });
  $scope.$on('devise:new-session', function (e, user){
    $scope.user = user;
    $rootScope.signedIn = true;
  });
  $scope.$on('devise:login', function (e, user){
    $scope.user = user;
  });
  $scope.$on('profile-updated', function(event, resp) {
    $scope.user = resp;
  });
}]);
