angular.module('letsDoIt')

.controller('MainController', [
  '$scope',
  'tasksResource',
  function($scope, tasksResource){
    var rightSide = false;

    $scope.dragDrop = { 
      draggableTask: null, 
      droppableGroup: null, 
      droppableCategory: null, 
      filteredByGroupId: null,
      filteredByCategory: null 
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

    $scope.filterByCategory = function(category) {
      $scope.dragDrop.filteredByCategory = category.id;
    };

    $scope.filterByDefaultCategory = function() {
      $scope.dragDrop.filteredByCategory = null;
    };

    $scope.slideNav = function() {
      if($('aside').hasClass('hidden-lg')) {
        rightSide = false;
      }
      else {
        rightSide = true;
      };
      if (rightSide === false) {
        $('aside').removeClass('hidden-xs').removeClass('hidden-sm').removeClass('hidden-md').removeClass('hidden-lg');
        $('.slide-button').addClass('hidden');
        $('.slide-button-off').removeClass('hidden');
        $('aside').css({'animation-name':'sidebar', 'animation-duration':'0.5s'});
        rightSide = true;
      };
    };

    hideAside = function() {
      $('aside').addClass('hidden-xs').addClass('hidden-sm').addClass('hidden-md').addClass('hidden-lg');
    };

    $scope.closeMenu = function() {
      $('aside').css({'animation-name':'sidebar-close', 'animation-duration':'0.5s'});
      setTimeout(hideAside, 500);
      $('.slide-button').removeClass('hidden');
      $('.slide-button-off').addClass('hidden');
      rightSide = false;
    };

}]);
