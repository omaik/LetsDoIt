angular.module('letsDoIt')

.factory('userProfile', ['$resource', function($resource) {
  return $resource('/users/:id.json', { id: '@id' }, {
    update: {
      method: 'PUT',
      headers: {enctype:'multipart/form-data'}
    },
    validate: {
      method: 'POST',
      url: '/users/validate_user'
    }
  });
}]);


