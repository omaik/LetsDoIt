angular.module('letsDoIt', [
  'ui.router',
  'ngMaterial',
  'ngResource',
  'ngMessages',
  'ngAnimate',
  'ngDragDrop',
  'ngDraggable',
  'Devise',
  'templates',
  'ngFileUpload'
  ])

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
        templateUrl: 'tasks/edit.html',
        controller: 'EditTaskController'
      }).
      state('signUp', {
        url:'/users/sign_up',
        templateUrl: 'signup/new.html',
        controller: 'signUpController',
        resolve: redirect
      }).
      state( 'login', {
        url: '/',
        templateUrl: 'signin/new.html',
        controller: 'SignInController',
        resolve: redirect
      }).
      state('profile', {
        url: '/users/:id',
        templateUrl: 'profiles/profile.html',
        controller: 'ProfilesController'
      }).
      state('editProfile', {
        url: '/users/:id/edit',
        templateUrl: 'profiles/editProfile.html',
        controller: 'EditProfilesController'
      }).
      state( 'home', {
        url: '/home',
        views: {
          'tasks': {
            templateUrl: 'tasks/list.html',
            controller: 'TasksListController'
          },
          'categories': {
            templateUrl: 'categories/categories.html',
            controller: 'CategoriesController'
          },
          'groups': {
            templateUrl: 'groups/list.html',
            controller: 'GroupsController'
          }
        }
      }).
      state('priority', {
        url: '/priorities',
        templateUrl: 'priorities/show.html',
        controller: 'prioritiesController'
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
