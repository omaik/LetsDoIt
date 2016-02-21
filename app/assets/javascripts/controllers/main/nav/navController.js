angular.module('letsDoIt')
  .controller('NavController', [
  '$scope',
  'Auth',
  '$state',
  '$rootScope',
  '$translate',
  'userProfile',
  'fayeResourse',
  'toastr',
  function($scope, Auth, $state, $rootScope, $translate, userProfile, fayeResourse, toastr){

  var showing = false, showingSettings = false, baseChanel = '/', subChanel = '';

  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
    Auth.currentUser().then(function(user) {
      var profile = new userProfile({
        language: langKey,
        id: user.id
      });
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
  };
  
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
    subChanel = baseChanel + user.id;
    $rootScope.currentUsr = user;
    sub();
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

  $('#main-section').click(function() {
    $('#drop_menu').slideUp(400);
    showing = false;
  });

  $scope.closeMenu = function() {
    $('#drop_menu').slideUp(400);
    showing = false;
    $('aside').addClass('hidden-sm').addClass('hidden-md').addClass('hidden-lg');
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
  
  function sub(){
    fayeResourse.subscribe(subChanel, function(msg) {
      if (msg.notification === 'friendship'){
        switch (msg.friendship.action) {
          case 'accept':
            toastr.success(
              msg.friendship.data.first_name + ' ' + msg.friendship.data.last_name + ' ' + $translate.instant('frindshipReceived'),
              {
                closeButton: true,
            });  
            break;
          case 'request':
            toastr.info(
              msg.friendship.data.first_name + ' ' + msg.friendship.data.last_name + ' ' + $translate.instant('requestReceived'),
              {
                closeButton: true,
            });
            break;
        }
      }  
    });
  }
}]);

