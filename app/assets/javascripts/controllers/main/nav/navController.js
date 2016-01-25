angular.module('letsDoIt')
  .controller('NavController', [
  '$scope',
  'Auth',
  '$state',
  '$rootScope',
  '$translate',
  'userProfile',
  function($scope, Auth, $state, $rootScope, $translate, userProfile){

  var showing = false, showingSettings = false;

  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
    Auth.currentUser().then(function(user) {
      var profile = new userProfile({
        language: langKey,
        id: user.id
      })
      profile.$update();
    });
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

  $scope.toggleMenu = function() {
    if(showing == false) {
      $('#drop_menu').slideDown(400);
      showing = true;
    }
    else {
      $('#drop_menu').slideUp(400);
      showing = false;
    }
  };

  $scope.toggleSettings = function() {
    if(showingSettings == false) {
      $('.settings-menu').slideDown(200);
      showingSettings = true;
    }
    else {
      $('.settings-menu').slideUp(200);
      showingSettings = false;
    }
  };

}]);
