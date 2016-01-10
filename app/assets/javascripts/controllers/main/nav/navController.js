angular.module('letsDoIt')
  .controller('NavController', [
  '$scope',
  'Auth',
  '$state',
  '$rootScope',
  function($scope, Auth, $state, $rootScope){
    if(!Auth.isAuthenticated()) {
      Auth.currentUser().then(function(data) {
        $rootScope.signedIn = Auth.isAuthenticated();
      }, function(error) {
      });
    }
  $scope.logout = function() {
  var config = {
    headers: {
      'X-HTTP-Method-Override': 'DELETE'
    }
  };
  Auth.logout(config).then(function(user) {
    $state.go('signUp');
    $rootScope.signedIn = Auth.isAuthenticated();
    }, function(error) {
      console.log(error.data);
    });
    $scope.$on('devise:logout', function(event, user) {
    $state.go('/');
    });
  }
  Auth.currentUser().then(function (user){
    $scope.user = user;
  })
  $scope.$on('devise:new-registration', function (e, user){
    $scope.user = user;
  })
  $scope.$on('devise:login', function (e, user){
    $scope.user = user;
  })
  $scope.$on('devise:logout', function (e, user){
    $scope.user = {};
  });
}]);
