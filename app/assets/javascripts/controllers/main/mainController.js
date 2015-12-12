var app = angular.module('letsDoIt', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/tasks', {
        templateUrl: '/assets/tasks/list.html',
        controller: 'TasksController'
      }).
      otherwise({
        redirectTo: '/'
      });
      $locationProvider
      .html5Mode(true);
  }]);

app.factory('taskList', ['$q', '$http', function($q, $http){
  var service = {
    getAllTasks: getAllTasks,
    addTask: addTask,
    deleteTask: deleteTask
  };
  return service;

  function getAllTasks() {
    var defer = $q.defer();
    $http.get('./tasks.json')
    .success(function(data){
      defer.resolve(data);
    })
    .error(function(reason){
      defer.reject(reason);
    })
    return defer.promise;
  };

  function addTask(task) {
    var defer = $q.defer();
    $http.post('/tasks.json', task)
      .success(function(data){
        defer.resolve(data);
      })
      .error(function(response, status){
        defer.reject(reason);
      })
    return defer.promise;
  };

  function deleteTask(task) {
    var defer = $q.defer();
    $http['delete']('/tasks/' + task.id + '.json', task)
      .success(function(data){
        defer.resolve(data);
      })
      .error(function(reason){
        deferred.reject(reason);
      })
      return defer.promise;
  };
}]);

app.controller('TasksController', ['$scope', 'taskList', function($scope, taskList){
  var STATUS = '1', PRIORITY = '2';
  $scope.task = {
    priority: PRIORITY,
    status: STATUS
  };
  taskList.getAllTasks()
    .then(function(data){
      $scope.tasks = data;
    },
    function(response, status){
      console.log('Response: ' + response + 'Status: ' + status);
    });

  $scope.addTask = function() {
    if(!$scope.task.name || $scope.task.name === '') {
      $scope.emptyName = true;
      $scope.taskErrMsg = "Task name can't be blank!";
      return;
    };
    taskList.addTask({
      name: $scope.task.name,
      priority: $scope.task.priority,
      status: $scope.task.status
    })
    .then(function(data) {
      $scope.tasks.push(data);
    },
    function(response, status){
      console.log('Response: ' + response + 'Status: ' + status);
    });
    $scope.task = {
      name: '',
      priority: PRIORITY,
      status: STATUS
    };
    $scope.emptyName = false;
  };

  $scope.deleteTask = function(task){
    var index = $scope.tasks.indexOf(task);
    taskList.deleteTask(task)
    .then(function(data) {
      $scope.tasks.splice(index, 1)
    },
    function(response, status){
      console.log('Response: ' + response + 'Status: ' + status);
    });
  };
}])
