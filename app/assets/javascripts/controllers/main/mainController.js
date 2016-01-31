angular.module('letsDoIt')

.controller('MainController', [
  '$scope',
  'tasksResource',
  function($scope, tasksResource){
    var rightSide = false, biggerSide = false;

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
      if (rightSide === false) {
        $('aside').removeClass('hidden-xs');
        $('aside').css({'animation-name':'sidebar', 'animation-duration':'0.5s'});
        $('.after').fadeIn(300);
        rightSide = true;
      };
    };

    $('.after').click(function() {
      if(rightSide === true) {
        $('.after').fadeOut(400);
        $('aside').css({'animation-name':'sidebar-close', 'animation-duration':'0.5s'});
        $('aside').addClass('hidden-xs');
        rightSide = false;
      }
    });

    $scope.slideNavBigger = function() {
      if($('aside').hasClass('hidden-lg')) {
        biggerSide = false;
      }
      else {
        biggerSide = true;
      };
      if (biggerSide === false) {
        $('aside').removeClass('hidden-sm').removeClass('hidden-md').removeClass('hidden-lg');
        $('aside').css({'animation-name':'sidebarBigger', 'animation-duration':'0.5s'});
        $('.all-tasks').css({'animation-name':'tasksSlideBigger', 'animation-duration':'0.5s'}).addClass('tasks-slided');
      }
      else {
        $('aside').css({'animation-name':'sidebarBiggerClose', 'animation-duration':'0.5s'});
        $('aside').addClass('hidden-sm').addClass('hidden-md').addClass('hidden-lg');
        $('.all-tasks').css({'animation-name':'tasksSlideBiggerClose', 'animation-duration':'0.5s'}).removeClass('tasks-slided');
      }
    };

    $scope.closeMenu = function() {
      $('aside').addClass('hidden-sm').addClass('hidden-md').addClass('hidden-lg');
    };

}]);
