angular.module('letsDoIt', ['ui.router', 'ngMaterial', 'ngResource'])

.config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.
      state('tasks', {
        url: '/tasks',
        templateUrl: '/assets/tasks/list.html',
        controller: 'TasksController'
      }).
      state('editTask', {
        url: ':id/edit',
        templateUrl: '/assets/tasks/edit.html',
        controller: 'EditTaskController'
      })
  }]);
