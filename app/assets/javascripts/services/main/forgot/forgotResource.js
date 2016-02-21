angular.module('letsDoIt')
.factory('forgotResource', [
  '$resource',
  function($resource) {
    return $resource('/users/password', {format:'json'});
  }
]);
