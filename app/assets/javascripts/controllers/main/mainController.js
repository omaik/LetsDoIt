angular.module('letsDoIt')

.controller('MainController', [
  '$scope',
  'tasksResource',
  function($scope, tasksResource){
    $scope.dragDrop = { 
      draggableTask: null, 
      droppableGroup: null, 
      droppableCategory: null, 
      filteredByGroupId: null
    };
    
    $scope.showGroups = '';

    $scope.toggleGroups = function(){
      if($scope.showGroups === '') 
        {
          $scope.showGroups = 'slideDown';
        }
      else 
        {
          $scope.showGroups = '';
        }
    };
    
    $scope.onDragTask = function(evt, ui, data) {
      $scope.dragDrop.draggableTask = data;
  	};

	  $scope.onDropGroup = function(evt, ui, data) {
	    var sharedTask;
	    var task;
      $scope.dragDrop.droppableGroup = data;
      task = $scope.dragDrop.draggableTask;
      task.group_id = $scope.dragDrop.droppableGroup.id;
      task.$update();
      sharedTask = new tasksResource({
        id: task.id,
        group_id: data.id
      });
      sharedTask.$share({id: task.id});
  	};
  	
  	$scope.onDropDefaultGroup = function() {
      var task = $scope.dragDrop.draggableTask;
      task.group_id = null;
      task.$update();
  	};
  	
  	$scope.filterByGroup = function(group) {
      $scope.filteredByGroupId = group.id;
    };

    $scope.onDropCategory = function(evt, ui, data) {
      var task;
      $scope.dragDrop.droppableCategory = data;
      task = $scope.dragDrop.draggableTask;
      task.category_id = $scope.dragDrop.droppableCategory.id;
      task.$update();
    };
  	
    $scope.filterByGroup = function(group) {
      $scope.dragDrop.filteredByGroupId = group.id;
    };
    
    $scope.filterByDefaultGroup = function() {
      $scope.dragDrop.filteredByGroupId = null;
    };
}]);
