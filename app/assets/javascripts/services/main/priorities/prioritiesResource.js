angular.module('letsDoIt')

.factory('prioritiesResource', [
  '$resource',
  function($resource) {
  return $resource('/priorities/:id.json', { id: '@id' }, {
    update: {
      method: 'PUT'
    }
  });
}]);
