angular.module('letsDoIt')

.factory('fayeResourse', function() {
  var client = new Faye.Client('http://54.175.169.251:9292/faye');

  return {
    publish: function(channel, message) {
      client.publish(channel, message);
    },

    subscribe: function(channel, callback) {
      client.subscribe(channel, callback);
    }
  }
});