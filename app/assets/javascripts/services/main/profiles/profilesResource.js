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
}])

.service('userProfile2', ['$http', function($http){
  this.put = function(uploadUrl, data, p_id){
    uploadUrl+='.json'
    var fd = new FormData();
    for(var key in data)
      fd.append(key, data[key]);
    $http.put(uploadUrl,fd, {format: 'json',
      transformRequest: angular.indentity,
      headers: { 'Content-Type': undefined }
    });
  }
}]);
