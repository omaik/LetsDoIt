angular.module('letsDoIt')

.controller('TasksController', ['$scope', 'taskList', function($scope, taskList) {
  var STATUS = '1', PRIORITY = '2';
  $scope.task = {
    priority: PRIORITY,
    status: STATUS
  };
  taskList.query(function(data) {
    $scope.tasks = data;
  },
  function(data, status) {
    console.log('Status is: ' + status);
  });

  $scope.addTask = function() {
    var NOT_BLANK = "Task name can't be blank!";
    if(!$scope.task.name || $scope.task.name === '') {
      $scope.errHandle = true;
      $scope.taskErrMsg = NOT_BLANK;
      return;
    };
    $scope.task = new taskList({
      name: $scope.task.name,
      priority: $scope.task.priority,
      status: $scope.task.status
    });
    $scope.task.$save(function() {
      $scope.tasks.push($scope.task);
      $scope.task = {
        name: '',
        priority: PRIORITY,
        status: STATUS
      };
    },
    function(data, status) {
        console.log('Status is: ' + status);
      });
    $scope.errHandl = false;
  };

  $scope.deleteTask = function(task) {
    var index = $scope.tasks.indexOf(task);
    task.$delete(function() {
      $scope.tasks.splice(index, 1);
    },
    function(data, status) {
      console.log('Status is: ' + status);
    });
  };
}])
