angular.module('letsDoIt')

.factory('taskList', ['$resource', function($resource) {
  return $resource('/tasks/:id.json', { id: '@id' }, {
    update: {
      method: 'PUT'
    }
  });
}]);
