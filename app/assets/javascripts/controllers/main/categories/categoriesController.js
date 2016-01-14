angular.module('letsDoIt')

.controller('CategoriesController', ['$scope', 'categoryList', function($scope, categoryList) {
  categoryList.query(function(data) {
    $scope.categories = data;
  },
  function(data, status) {
  });

  $scope.err = {
    errors: {},
    isError: false
  }

  $scope.addCategory = function() {
    $scope.category = new categoryList({
      name: $scope.category.name,
    });
    $scope.category.$save(function() {
      $scope.categories.push($scope.category);
      $scope.category = {
      name: ''
    };
      $scope.err.isError = false;
    },
    function(response) {
      $scope.err.errors = response.data.errors;
      $scope.err.isError = true;
    });
  };

  $scope.deleteCategory = function(category) {
    var index = $scope.categories.indexOf(category);
    category.$delete(function() {
      $scope.categories.splice(index, 1);
    },
    function(data, status) {
    });
  };

  $scope.showCategories = '';
  $scope.showing = false;

  $scope.toggleCategories = function() {
    $scope.showing = true;
    if($scope.showCategories == '') {
      $scope.showCategories = 'slideDown';
    }
    else {
      $scope.showCategories = '';
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
