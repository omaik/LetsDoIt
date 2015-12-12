angular.module('letsDoIt')

.factory('groupResource', [
  '$resource',
  function($resource) {
    return $resource('/groups/:id.json', { id: '@id' }, {
      update: {
      	method: 'PUT'
      }
    });
}]);
