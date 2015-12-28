angular.module('letsDoIt', ['ui.router', 'ngMaterial', 'ngResource','ngMessages'])

.config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.
      state('tasks', {
        url: '/tasks',
        templateUrl: '/assets/tasks/list.html',
        controller: 'TasksListController'
      }).
      state('editTask', {
        url: ':id/edit',
        templateUrl: '/assets/tasks/edit.html',
        controller: 'EditTaskController'
      }).
      state('signUp', {
        url:'/users/sign_up',
        templateUrl: '/assets/signup/new.html',
        controller: 'signUpController'
      });
  }]);
