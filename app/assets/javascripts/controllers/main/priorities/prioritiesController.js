angular.module('letsDoIt')

.controller('prioritiesController', [
  '$scope',
  'prioritiesResource',
  '$location',
  '$anchorScroll',
  function($scope, prioritiesResource, $location, $anchorScroll){
    var currentIndex = -1;
    $scope.priorities = { list: [] };
    $scope.priority = {
      name: '',
      value: 1,
      color:'#ffffff',
      id: undefined
    }
    $scope.err = {
      errors: {},
      isError: false
    }
    $scope.editMode = false;
    prioritiesResource.query(function(data) {
      var userData = [];
      data.forEach(function(item, i, arr) {
        if (item.user_id !== null)
          userData.push(item);
      });
      $scope.priorities.list = userData
    });
    $scope.setPriority = function(priority) {
      currentIndex = $scope.priorities.list.indexOf(priority);
      $scope.priority.name = priority.name;
      $scope.priority.value = priority.value;
      $scope.priority.color = priority.color;
      $scope.priority.id = priority.id;
      $scope.editMode = true;
      $location.hash('priority-block');
      $anchorScroll();
    };
    $scope.undoEdit = function() {
      $scope.priority = {
        name:'',
        value:1,
        color:'#ffffff',
        id: undefined
      };
      $scope.editMode = false;
    };
    $scope.priorityAction = function() {
      $scope.err.isError = false;
      if (angular.isDefined($scope.priority.id)) {
        $scope.editPriority();
      } else {
        $scope.addPriority();
      }
    };
    $scope.addPriority = function() {
      if ($scope.priority.name === '' || !$scope.priority.name)
        return;
      $scope.priority = new prioritiesResource({
        name: $scope.priority.name,
        value: $scope.priority.value,
        color: $scope.priority.color
      });
      $scope.priority.$save(function(data) {
        $scope.priority.id = data.id;
        $scope.priorities.list.push($scope.priority);
        $scope.priority = {
          name:'',
          value:1,
          color:'#ffffff',
          id: undefined
        };
      }, errorHandler);
    };
    $scope.editPriority = function() {
      if ($scope.priority.name === '' || !$scope.priority.name)
        return;
      $scope.priority = new prioritiesResource({
        name: $scope.priority.name,
        value: $scope.priority.value,
        color: $scope.priority.color,
        id: $scope.priority.id
      });
      $scope.priority.$update(function() {
        $scope.priorities.list.splice(currentIndex, 1);
        $scope.priorities.list.push($scope.priority);
        $scope.priority = {
          name:'',
          value:1,
          color:"#ffffff",
          id: undefined
        };
        $scope.editMode = false;
      });
    };
    $scope.deletePriority = function(priority) {
      var index = $scope.priorities.list.indexOf(priority);
      priority.$delete( function() {
        $scope.priorities.list.splice(index, 1);
      });
    };
    function errorHandler (error) {
      $scope.err.errors = error.data.errors;
      $scope.err.isError = true;
    };
}])
