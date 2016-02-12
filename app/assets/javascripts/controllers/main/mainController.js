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
        $('aside.col-sm-4').removeClass('hidden-xs').removeClass('hidden-sm');
        $('aside.col-sm-4').css({'animation-name':'sidebar', 'animation-duration':'0.5s'});
        $('.after').fadeIn(300);
        rightSide = true;
      };
    };

    $('.after').click(function() {
      if(rightSide === true) {
        $('.after').fadeOut(400);
        $('aside.col-sm-4').css({'animation-name':'sidebar-close', 'animation-duration':'0.5s'});
        $('aside.col-sm-4').addClass('hidden-xs').addClass('hidden-sm');
        rightSide = false;
      }
    });

}]);
