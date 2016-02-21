angular.module('letsDoIt')

.controller('TasksListController', [
  '$scope',
  '$state',
  'tasksResource',
  'prioritiesResource',
  '$mdDialog',
  'Upload',
  'fileUploadResource',
  'categoryList',
  function($scope, $state, tasksResource, prioritiesResource, $mdDialog, Upload, fileUploadResource, categoryList) {
  var STATUS = '1',
      PRIORITY_ID = '3',
      CATEGORY_ID = '1';

  $scope.tasks = { list: [] };
  $scope.priorities = { list: [] };
  $scope.categories = { list: [] };
  $scope.task = {
    priority_id: PRIORITY_ID,
    status: STATUS,
    category_id: CATEGORY_ID
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
      categoryList.query(function(data) {
        $scope.categories.list = data;
        for(i = 0; i < tLength; ++i) {
          tli = $scope.tasks.list[i];
          tli.category = $scope.categories.list.filter(
            function(v) {
              return v.id === tli.category_id;
            })[0];
        };
      });
    });
  };

  $scope.addTask = function(attachment) {
    if(!$scope.task.name || $scope.task.name === '') {
      $scope.errHandle = true;
      return;
    };
    $scope.task = new tasksResource({
      name: $scope.task.name,
      description: $scope.task.description,
      priority_id: $scope.task.priority_id,
      status: $scope.task.status,
      attachment: attachment,
      category_id: $scope.task.category_id
    });
    if(attachment) {
      fileUploadResource.createAttachment($scope.task, attachment)
      .then(function() {
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
        status: STATUS,
        category_id: CATEGORY_ID
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
