angular.module('letsDoIt')

  .controller('SignInController', [
    '$scope',
    '$state',
    'Auth',
    '$rootScope',
    function($scope, $state, Auth, $rootScope){
    $scope.err = {
      errors: {},
      isError: false
    }
    $scope.login = function() {
      var credentials = $scope.user;
      var config = {
        headers: {
          'X-HTTP-Method-Override': 'POST'
        }
      };
      Auth.login(credentials, config).then(function(user){
        $rootScope.signedIn = Auth.isAuthenticated();

      }, function(error){
          $scope.err.errors = error.data;
          $scope.err.isError = true;
      });
      $scope.$on('devise:login', function(event, currentUser) {
        $state.go('tasks');
      });
      $scope.$on('devise:new-session', function(event, currentUser) {
        $state.go('tasks');
      });
    }
  }])
  .config(function($httpProvider){
    var interceptor = function($q, $location, $rootScope) {
      return {
        'responseError': function(rejection) {
          if (rejection.status !== 401 && $location.path() == '/') {
            $rootScope.$broadcast('event:authorized');
              $location.path('/tasks');
          return rejection;
          }
          if (rejection.status == 401 && $location.path() !== '/') {
            $rootScope.$broadcast('event:unauthorized');
            if($location.path() !== '/users/sign_up')
              $location.path('/');
          return rejection;
          }
          return $q.reject(rejection);
        }
      };
    };
    $httpProvider.interceptors.push(interceptor);
  });
