angular.module('letsDoIt')

.controller('EditTaskController', [
  '$scope',
  '$state',
  '$stateParams',
  'tasksResource',
  'prioritiesResource',
  'Upload',
  'fileUploadResource',
  'categoryList',
  function($scope, $state, $stateParams, tasksResource, prioritiesResource, Upload, fileUploadResource, categoryList) {

  $scope.task = tasksResource.get({ id: $stateParams.id }, function() {
    $scope.task.due_date = $scope.task.due_date? new Date($scope.task.due_date): new Date();
  });
  $scope.priorities = { list: [] };
  $scope.categories = { list: [] };
  prioritiesResource.query(function(data) {
    $scope.priorities.list = data;
  });
  categoryList.query(function(data) {
    $scope.categories.list = data;
  });

  $scope.updateTask = function() {
    var NOT_BLANK = "Task name can't be blank!";
    if(!$scope.task.name || $scope.task.name === '') {
      $scope.errHandle = true;
      $scope.taskErrMsg = NOT_BLANK;
      return;
    };
    if($scope.attachment) {
      fileUploadResource.updateAttachment($scope.task, $scope.attachment);
    } else {
     $scope.task.$update();
    };
    $scope.errHandl = false;
    $state.go('home');
  };
 }])
