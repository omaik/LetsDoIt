angular.module('letsDoIt')

.factory('userProfile', ['$resource', function($resource) {
  return $resource('/users/:id.json', { id: '@id' }, {
    update: {
      method: 'PUT',
      headers: {enctype:'multipart/form-data'}
    },
    upload: {
          method: 'POST',
          headers: {'Content-Type': undefined}
        }
  });
}]);


