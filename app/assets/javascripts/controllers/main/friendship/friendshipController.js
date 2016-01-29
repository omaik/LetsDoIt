angular.module('letsDoIt')
  .controller('FriendshipController', [
    '$scope',
    'Auth',
    '$resource',
    'friendshipResource',
    function($scope, Auth, $resource, friendshipResource){
      var relations = {}, source = new EventSource('/friendships/event');
      $scope.data = {
        selectedIndex: 0,
        friends: {},
        requested:{},
        pending:{},
        results:{},
        search: ""
      };

      friendshipResource.getFriendship().get().$promise.then(function(response){
        relations = response;
        $scope.data.friends =  relations.friends;
        $scope.data.requested = relations.requested;
        $scope.data.pending = relations.pending;
      });
      
      source.onmessage = function(event) {
        var response = JSON.parse(event.data);
        console.log(response);
        $scope.$apply(function(){
          $scope.data.friends =  response.friends;
          $scope.data.requested = response.requested;
          $scope.data.pending = response.pending;         
        });
      };  
      
      // source.close();
      
      $scope.setTab = function(tab){
        if (tab === 3){
          $scope.data.search = "";
          $scope.data.results = {};   
          $scope.searchForm.$setPristine();
        }
      };
      
      $scope.find = function(search){
        friendshipResource.findFriend(search).query().$promise.then(function(response){
        $scope.data.results = response;
        });
      };
      
      $scope.request = function(person){
        var index = $scope.data.results.indexOf(person);        
        relations.pending.push(person);
        $scope.data.results.splice(index, 1);        
        friendshipResource.sendRequest(person.id).save();
      };
      
      $scope.accept = function(person){
        var index = $scope.data.requested.indexOf(person);
        relations.friends.push(person);
        $scope.data.requested.splice(index, 1);
        friendshipResource.acceptRequest(person.id).save();
      };      
            
      $scope.delete = function(person, param){
        var index = 0;
        switch(param){
          case 'friends':
            index = $scope.data.friends.indexOf(person);
            $scope.data.friends.splice(index, 1);            
            break;
          case 'pending':
            index = $scope.data.pending.indexOf(person);
            $scope.data.pending.splice(index, 1);  
            break;
        }
        friendshipResource.deleteFriendship(person.id).delete();
      };
  }]);

