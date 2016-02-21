angular.module('letsDoIt')

.factory('tasksResource', [
  '$resource',
  function($resource) {
  return $resource('/tasks/:id.json', { id: '@id' }, {
    update: {
      method: 'PUT'
    },
    share: {
      method: 'POST',
      params: { id: '@id' },
      url: 'tasks/:id/share'
    },
    stat: {
      method: 'GET',
      url: 'tasks/stat.json'
    }
  });
}]);
