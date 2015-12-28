angular.module('letsDoIt')

.factory('tasksResource', [
  '$resource',
  function($resource) {
  return $resource('/tasks/:id.json', { id: '@id' }, {
    update: {
      method: 'PUT'
    }
  });
}]);
