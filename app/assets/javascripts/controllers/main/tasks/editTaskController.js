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
  'groupResource',
  function($scope, $state, $stateParams, tasksResource, prioritiesResource, Upload, fileUploadResource, categoryList, groupResource) {

  $scope.task = tasksResource.get({ id: $stateParams.id }, function() {
    $scope.task.due_date = $scope.task.due_date? new Date($scope.task.due_date): new Date();
  });
  $scope.priorities = { list: [] };
  $scope.categories = { list: [] };
  $scope.groups = { list: [] };
  prioritiesResource.query(function(data) {
    $scope.priorities.list = data;
  });
  categoryList.query(function(data) {
    $scope.categories.list = data;
  });
  groupResource.query(function(data) {
    $scope.groups.list = data;
  });

  $scope.updateTask = function() {
    if(!$scope.task.name || $scope.task.name === '') {
      $scope.errHandle = true;
      return;
    };
    if($scope.attachment) {
      fileUploadResource.updateAttachment($scope.task, $scope.attachment)
      .then(function() {
        $state.go('home');
      });
    } else {
     $scope.task.$update();
     $state.go('home');
    };
    $scope.errHandl = false;
  };
 }])
