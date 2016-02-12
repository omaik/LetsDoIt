angular.module('letsDoIt')

.factory('fayeResourse', function() {
  var client = new Faye.Client('http://localhost:9292/faye');

  return {
    publish: function(channel, message) {
      client.publish(channel, message);
    },

    subscribe: function(channel, callback) {
      client.subscribe(channel, callback);
    }
  }
});
