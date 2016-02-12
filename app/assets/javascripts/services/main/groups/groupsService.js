angular.module('letsDoIt')

.factory('groupResource', [
  '$resource',
  function($resource) {
    return $resource('/groups/:id.json', { id: '@id' }, {
      update: {
      	method: 'PUT'
      },
      add_friend_to_group: {
        method: 'POST',
        params: { id: '@id' },
        url: 'groups/:id/add_friend_to_group'
      },
      members: {
        method: 'GET',
        params: { id: '@id' },
        url: 'groups/:id/members.json'
      },
      delete_friend_from_group: {
        method: 'DELETE',
        params: { id: '@id' },
        url: 'groups/:id/delete_friend_from_group'
      }
    });
}]);

