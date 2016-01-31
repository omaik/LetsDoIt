angular.module('letsDoIt')

.controller('CategoriesController', [
  '$scope', 
  '$state',
  'categoryList',
  'tasksResource', 
  '$mdDialog', 
  function($scope, $state, categoryList, tasksResource, $mdDialog) {

  $scope.isError = false;

  categoryList.query(function(data) {
    $scope.categories = data;
  });

  $scope.edit = { categories: {} };

  $scope.addCategory = function() {
    var categoryLength = $scope.categories.length;
    $scope.category = new categoryList({
      name: $scope.category.name,
    });
    for(i = 0; i < categoryLength; i++) {
      if($scope.categories[i].name == $scope.category.name) {
        $scope.isError = true;
        return false;
      };
    }
    $scope.category.$save(function() {
      $scope.categories.push($scope.category);
      $scope.isError = false;
      $scope.category = {
        name: ''
      };
    });
  };

  $scope.deleteCategory = function(category) {
    var index = $scope.categories.indexOf(category);
    category.$delete(function() {
      $scope.categories.splice(index, 1);
    });
    $scope.closeDialog();
  };

  $scope.updateCategory = function(editCategory) {
    editCategory.$update();
    $scope.closeDialog();
  };

  $scope.showAdvanced = function(ev, category) {
    $scope.edit.category = category;
    if (navigator.userAgent.search("Chrome") >= 0){
      $('aside').css('height', '91%');
    }
    return $mdDialog.show({
      templateUrl: 'categories/edit.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      scope: $scope.$new(),
      clickOutsideToClose:true

    });

  };
  
  $scope.closeDialog = function() {
    $mdDialog.hide();
    if (navigator.userAgent.search("Chrome") >= 0){
      $('aside').css('height', '82%');
    }
  };

}]);
