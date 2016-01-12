angular.module('letsDoIt')

.controller('EditTaskController', [
  '$scope',
  '$state',
  '$stateParams',
  'tasksResource',
  'prioritiesResource',
  function($scope, $state, $stateParams, tasksResource, prioritiesResource) {
  $scope.task = tasksResource.get({ id: $stateParams.id }, function() {
    $scope.task.due_date = $scope.task.due_date? new Date($scope.task.due_date): new Date();
  });
  $scope.priorities = { list: [] };
  prioritiesResource.query(function(data) {
    $scope.priorities.list = data;
  });

  $scope.updateTask = function() {
    var NOT_BLANK = "Task name can't be blank!";
    if(!$scope.task.name || $scope.task.name === '') {
      $scope.errHandle = true;
      $scope.taskErrMsg = NOT_BLANK;
      return;
    };
    $scope.task.$update(function() {
      $state.go('home');
    });
  };
}])
