angular.module('letsDoIt')

.controller('GroupsController', [
  '$scope',
  'groupResource',
  function($scope, groupList) {
    
  $scope.groups = { list: [] };
  $scope.errorSettings = { groupErrHandle: '', groupErrMsg: 'Group name can\'t be blank!' };

  groupList.query(function(data) {
    $scope.groups.list = data;
  },
  function(data, status) {
    
  });

  $scope.addGroup = function() {
    if(!$scope.group.name || $scope.group.name === '') {
      $scope.errorSettings.groupErrHandle = true;
      return;
    };
    $scope.group = new groupList({
      name: $scope.group.name,
      description: $scope.group.description
    });
    $scope.group.$save(function() {
      $scope.groups.list.push($scope.group);
      $scope.group = {
        name: '',
        description: ''
      };
    },
    function(data, status) {
      
    });
    $scope.errorSettings.groupErrHandle = false;
  };

  $scope.deleteGroup = function(group) {
    var index = $scope.groups.list.indexOf(group);
    group.$delete(function() {
      $scope.groups.list.splice(index, 1);
    },
    function(data, status) {

    });
  };

  $scope.showGroups = '';
  $scope.bool = false;

  $scope.toggleGroups = function(){
    $scope.bool = true;
    if($scope.showGroups == '') 
      {
        $scope.showGroups = 'slideDown';
      }
    else 
      {
        $scope.showGroups = '';
      }
  };

  

}])

.animation('.slide', [function() {
  return {
    addClass: function(element, slideDown, doneFn) {
      $(element).slideDown(400, doneFn);
        doneFn();
    },
    removeClass: function(element, slideDown, doneFn) {
      $(element).slideUp(400, doneFn);
        doneFn();
    }
  }
}]);
