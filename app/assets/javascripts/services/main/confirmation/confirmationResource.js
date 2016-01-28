angular.module('letsDoIt')

.factory('confirmationResource', [
  '$resource',
  function($resource) {
    return $resource('/users/confirmation', {format:'json'});
  }
]);
