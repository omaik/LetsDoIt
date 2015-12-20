angular.module('letsDoIt')

.factory('categoryList', ['$resource', function($resource) {
  return $resource('/categories/:id.json', { id: '@id' }, {
    update: {
      method: 'PUT'
    }
  });
}]);