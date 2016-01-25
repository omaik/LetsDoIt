angular.module('letsDoIt')

.controller('CategoriesController', [
  '$scope', 
  'categoryList', 
  '$mdDialog', 
  function($scope, categoryList, $mdDialog) {
  
  var showing = true;

  categoryList.query(function(data) {
    $scope.categories = data;
  });

  $scope.edit = { categories: {} };

  $scope.err = {
    errors: {},
    isError: false
  }

  $scope.addCategory = function() {
    $scope.category = new categoryList({
      name: $scope.category.name,
    });
    for(i = 0; i < $scope.categories.length; i++) {
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

  $scope.toggleCategories = function() {
    if(showing === true) {
      $('.category-slide').slideUp(400);
      $('.groups').css({'animation':'slidingUp 0.4s', 'top':'70px'});
      showing = false;
    }
    else {
      $('.category-slide').slideDown(400);
      $('.groups').css({'animation':'slidingDown 0.4s', 'top':'366px'});
      showing = true;
    }
  };

  $scope.showAdvanced = function(ev, category) {
    $scope.edit.category = category;
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
  };

}]);
