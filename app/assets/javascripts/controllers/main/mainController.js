angular.module('letsDoIt')

.controller('MainController', [
  '$scope',
  '$state',
  '$stateParams',
  'tasksResource',
  function($scope, $state, $stateParams, taskList){

    $scope.draggableTask;
    $scope.droppableGroup;
    $scope.droppableCategory;
    $scope.onDrag=function(evt, ui, data) {
      $scope.draggableTask = data;
  	};

	$scope.onDropGroup=function(evt, ui, data) {
      $scope.droppableGroup = data;
      task = $scope.draggableTask;
      task.group_id = $scope.droppableGroup.id;
      task.$update();
  	};

  	$scope.onDropCategory=function(evt, ui, data) {
      $scope.droppableCategory = data;
      task = $scope.draggableTask;
      task.category_id = $scope.droppableCategory.id;
      task.$update();
  	};

}]);
