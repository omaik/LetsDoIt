angular.module('letsDoIt')

.controller('TasksListController', [
  '$scope',
  '$state',
  'tasksResource',
  'prioritiesResource',
  '$mdDialog',
  'Upload',
  'fileUploadResource',
  '$timeout',
  function($scope, $state, tasksResource, prioritiesResource, $mdDialog, Upload, fileUploadResource, $timeout) {
  var STATUS = '1',
      PRIORITY_ID = '3';
  $scope.tasks = { list: [] };
  $scope.priorities = { list: [] };
  $scope.task = {
    priority_id: PRIORITY_ID,
    status: STATUS
  };
  getAllTasks();

  $scope.showAddTaskWindow = function($event) {
    $mdDialog.show({
      scope: $scope.$new(),
      templateUrl: 'tasks/add.html',
      targetEvent: $event,
      locals: {
        attachment: $scope.attachment
      },
      clickOutsideToClose:true
    });
  };

  function getAllTasks() {
    tasksResource.query(function(data) {
      var tLength, tasksListItem, i;
      $scope.tasks.list = data;
      tLength = $scope.tasks.list.length;
      prioritiesResource.query(function(data) {
        $scope.priorities.list = data;
        for(i = 0; i < tLength; ++i) {
          tasksListItem = $scope.tasks.list[i];
          tasksListItem.priority = $scope.priorities.list.filter(
            function(v) {
              return v.id === tasksListItem.priority_id;
            })[0];
        };
      });
    });
  };

  $scope.addTask = function(attachment) {
    var NOT_BLANK = "Task name can't be blank!";
    if(!$scope.task.name || $scope.task.name === '') {
      $scope.errHandle = true;
      $scope.taskErrMsg = NOT_BLANK;
      return;
    };
    $scope.task = new tasksResource({
      name: $scope.task.name,
      description: $scope.task.description,
      priority_id: $scope.task.priority_id,
      status: $scope.task.status,
      attachment: attachment
    });
    if(attachment) {
      fileUploadResource.createAttachment($scope.task, attachment);
      $timeout(function(){
        getAllTasks();
      });
    } else {
        $scope.task.$save(function() {
          getAllTasks();
        });
    };
    $scope.errHandl = false;
    $scope.task = {
        priority_id: PRIORITY_ID,
        status: STATUS
      };
    $mdDialog.hide();
  };

  $scope.deleteTask = function(task) {
    var index = $scope.tasks.list.indexOf(task);
    task.$delete(function() {
      $scope.tasks.list.splice(index, 1);
    });
  };
}])
