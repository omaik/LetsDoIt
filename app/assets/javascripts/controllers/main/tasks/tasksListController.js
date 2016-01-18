angular.module('letsDoIt')

.controller('TasksListController', [
  '$scope',
  '$state',
  'tasksResource',
  'prioritiesResource',
  '$mdDialog',
  function($scope, $state, tasksResource, prioritiesResource, $mdDialog) {
  var STATUS = '1', PRIORITY_ID = '3';
  $scope.tasks = { list: [] };
  $scope.priorities = { list: [] };
  $scope.task = {
    priority_id: PRIORITY_ID,
    status: STATUS
  };

  $scope.showAddTaskWindow = function(ev) {
    $mdDialog.show({
      controller: 'TasksListController',
      templateUrl: 'tasks/add.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    });
  };

  tasksResource.query(function(data) {
    var tLength, tli, i;
    $scope.tasks.list = data;
    tLength = $scope.tasks.list.length;
    prioritiesResource.query(function(data) {
      $scope.priorities.list = data;
      for(i = 0; i < tLength; ++i) {
        tli = $scope.tasks.list[i];
        tli.priority = $scope.priorities.list.filter(
          function(v) {
            return v.id === tli.priority_id;
          })[0];
      };
    });
  });

  $scope.addTask = function() {
    var NOT_BLANK = "Task name can't be blank!";
    if(!$scope.task.name || $scope.task.name === '') {
      $scope.errHandle = true;
      $scope.taskErrMsg = NOT_BLANK;
      return;
    };
    $scope.task = new tasksResource({
      name: $scope.task.name,
      priority_id: $scope.task.priority_id,
      status: $scope.task.status
    });
    $scope.task.$save(function() {
      $scope.tasks.list.push($scope.task);
      $scope.task = {
        name: '',
        priority_id: PRIORITY_ID,
        status: STATUS
      };
    });
    $scope.errHandl = false;
    $mdDialog.hide();
    $state.reload('home');
  };

  $scope.deleteTask = function(task) {
    var index = $scope.tasks.list.indexOf(task);
    task.$delete(function() {
      $scope.tasks.list.splice(index, 1);
    });
  };
}])
