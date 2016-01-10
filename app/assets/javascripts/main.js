angular.module('letsDoIt', ['ui.router', 'ngMaterial', 'ngResource','ngMessages', 'Devise'])

.config(['$stateProvider',
  function($stateProvider) {
    var redirect = [
      '$state',
       'Auth',
        function($state, Auth) {
          Auth.currentUser().then(function (user){
          if(user.id !== undefined) {
            $state.go('home');
          }
          }, function(error) {
          });
    }];
    $stateProvider.
      state('editTask', {
        url: 'tasks/:id/edit',
        templateUrl: '/assets/tasks/edit.html',
        controller: 'EditTaskController'
      }).
      state('signUp', {
        url:'/users/sign_up',
        templateUrl: '/assets/signup/new.html',
        controller: 'signUpController',
        resolve: redirect
      }).
      state( 'login', {
        url: '/',
        templateUrl: '/assets/signin/new.html',
        controller: 'SignInController',
        resolve: redirect
      }).
      state( 'home', {
        url: '/home',
        views: {
          'tasks': {
            templateUrl: 'assets/tasks/list.html',
            controller: 'TasksListController'
          },
          'categories': {
            templateUrl: '/assets/signup/new.html',
            controller: 'signUpController'
          },
          'groups': {
            templateUrl: '/assets/signup/new.html',
            controller: 'signUpController'
          }
        }
      });
  }])
  .config(function($httpProvider){
    var interceptor = function($q, $location, $rootScope) {
      return {
        'responseError': function(rejection) {
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
