angular.module('letsDoIt')

.factory('fileUploadResource', [
  'Upload',
  function(Upload) {

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
      Upload.upload(options);
    };

    function createAttachment(task, attachment) {
      uploadData('/tasks.json', 'POST', task, attachment);
    };

    function updateAttachment(task, attachment) {
      uploadData('/tasks/' + task.id + '.json', 'PUT', task, attachment);
    };
}]);
