angular.module('letsDoIt')

.controller('EditTaskController', ['$scope', '$state', '$stateParams', 'taskList', function($scope, $state, $stateParams, taskList) {
  $scope.task = taskList.get({ id: $stateParams.id }, function() {
    $scope.task.due_date = $scope.task.due_date? new Date($scope.task.due_date): new Date();
  });

  $scope.updateTask = function() {
    var NOT_BLANK = "Task name can't be blank!";
    if(!$scope.task.name || $scope.task.name === '') {
      $scope.errHandle = true;
      $scope.taskErrMsg = NOT_BLANK;
      return;
    };
    $scope.task.$update(function() {
      $state.go('tasks');
    },
    function(data, status) {
      console.log('Status is: ' + status);
    });
  };
}])
