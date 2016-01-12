angular.module('letsDoIt')

.controller('MainController', [
  '$scope',
  '$state',
  '$stateParams',
  'tasksResource',
  function($scope, $state, $stateParams, taskList){

    $scope.draggableTask;
    $scope.droppableGroup;
    $scope.onDrag=function(evt, ui, data) {
      $scope.draggableTask = data;
  	};

	$scope.onDrop=function(evt, ui, data) {
      $scope.droppableGroup = data;
      task = $scope.draggableTask;
      task.group_id = $scope.droppableGroup.id;
      task.$update();
      console.log(task.group_id);

  	};

}]);
