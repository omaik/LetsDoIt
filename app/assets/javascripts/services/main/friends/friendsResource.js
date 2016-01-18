angular.module('letsDoIt')

  .factory('friendshipResource',['$resource', function($resource){
    var friendship = {getFriendship: getFriendship, 
                      sendRequest: sendRequest,
                      acceptRequest: acceptRequest,
                      deleteFriendship: deleteFriendship,
                      findFriend: findFriend};
    
    return friendship;
    
    function getFriendship(){
        return $resource("/friendships", null);
    }
    
    function sendRequest(friendId){
        return $resource("/friendships/", {friend_id: friendId, format:'json'});
    }
    
    function acceptRequest (friendId){
        return $resource("/friendships/:friend_id/accept/", {friend_id: friendId, format:'json'});
    }
    
    function deleteFriendship(friendId){
        return $resource("/friendships/:friend_id/", {friend_id: friendId, format:'json'});
    }

    function findFriend(searchParam){
        return $resource("/users/", {search: searchParam, format: 'json'});
    }
}]);
