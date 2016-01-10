angular.module('letsDoIt')
 
  .controller('FriendshipController', [
    '$scope',
    'Auth',
    '$resource',
    'friendshipResource',
    function($scope, Auth, $resource, friendshipResource){
      var relations = {};
      $scope.users = {};
      $scope.results = {};
      $scope.settings = {tab: 1};

      friendshipResource.getFriendship().get().$promise.then(function(response){
        relations = response.relations;
        $scope.users =  relations.friends;
      });
      
      $scope.select = function(setTab) {
        $scope.settings.tab = setTab;
        switch(setTab) {
          case 1:
            $scope.users = relations.friends;
            break;
          case 2:
            $scope.users = "";
            $scope.users = relations.requested;
            break;
          case 3:
            $scope.users = "";           
            $scope.users = relations.pending;
            break;
          case 4:
            $scope.search = "";
            $scope.results = "";   
            $scope.showBtn = true;
            $scope.searchForm.$setPristine();
            break;              
        }  
      };
        
      $scope.isSelected = function (checkTab) {
        return ($scope.settings.tab === checkTab);
      };      
      
      $scope.find = function(search){
        friendshipResource.findFriend(search).get().$promise.then(function(response){
        $scope.results = response.result;
        });
      };
      
      $scope.request = function(person){
        relations.pending.push(person);        
        friendshipResource.sendRequest(person.id).save();
      };
      
      $scope.accept = function(person){
        var index = $scope.users.indexOf($scope.users.person);
        relations.friends.push(person);
        $scope.users.splice(index, 1);
        friendshipResource.acceptRequest(person.id).save();
      };      
            
      $scope.delete = function(person){
        var index = $scope.users.indexOf($scope.users.person);
        $scope.users.splice(index, 1);
        friendshipResource.deleteFriendship(person.id).delete();
      };
      
  }]);

