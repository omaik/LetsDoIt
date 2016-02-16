angular.module('letsDoIt')

.factory('fileUploadResource', [
  'Upload',
  '$q',
  function(Upload, $q) {

    var service = {
      createAttachment: createAttachment,
      updateAttachment: updateAttachment
    };
    return service;

    function uploadData(url, method, task, attachment) {
      var options = {
        url: url,
        method: method,
        fields: { 'task[name]': task.name, 'task[description]': task.description, 'task[priority_id]': task.priority_id,
                  'task[status]': task.status, 'task[attachment]': attachment },
        file: attachment
      };
      return Upload.upload(options);
};
    function createAttachment(task, attachment) {
      var defer = $q.defer();
      uploadData('/tasks.json', 'POST', task, attachment)
      .success(function(data){
        defer.resolve(data);
      });
      return defer.promise;
    };

    function updateAttachment(task, attachment) {
      var defer = $q.defer();
      uploadData('/tasks/' + task.id + '.json', 'PUT', task, attachment)
      .success(function(data){
        defer.resolve(data);
      });
      return defer.promise;
    };
}]);
