angular.module('letsDoIt')

.controller('GroupsController', [
  '$scope',
  'groupResource',
  '$mdDialog',
  'friendshipResource',
  function($scope, groupResource, $mdDialog, friendshipResource) {
    
  $scope.groups = { list: [] };
  $scope.errorSettings = { 
    groupErrHandle: '', 
    groupErrMsg: 'Group name can\'t be blank!'
  };
    
  $scope.edit = { 
    group: {}, 
    showFriends: false, 
    showMembers: false, 
    friends: [], 
    friendsToAdd: [], 
    membersToDelete: [], 
    groupMembers: [] 
    
  };
  
  function getFriends(){
    var name;
    $scope.edit.friends = [];
    friendshipResource.getFriendship().get().$promise.then(function(response){
      response.friends.forEach(function(friend) {
        name = friend.first_name + " " + friend.last_name;
        $scope.edit.friends.push({ id: friend.id, name: name, add_to_group: false });
      });
      $scope.edit.groupMembers.forEach(function(member) {
        $scope.edit.friends = $scope.edit.friends.filter(function(friend) { return friend.id != member.id });
      });
    });
  };
  
  function getGroups(){
    groupResource.query(function(data) {
      $scope.groups.list = data;
    });
  };
  
  function getMembers(group){
    var name;
    $scope.edit.groupMembers = [];
    new groupResource({ id: group.id }).$members(function(response){
      response.data.forEach(function(friend) {
        name = friend.first_name + " " + friend.last_name;
        $scope.edit.groupMembers.push({ id: friend.id, name: name, remove_from_group: false });
      });
    });
  };
  
  getGroups();

  $scope.addGroup = function() {
    if(!$scope.group.name || $scope.group.name === '') {
      $scope.errorSettings.groupErrHandle = true;
      return;
    };
    $scope.group = new groupResource({
      name: $scope.group.name,
      description: $scope.group.description
    });
    $scope.group.$save(function() {
      $scope.groups.list.push($scope.group);
      $scope.group = {
        name: '',
        description: ''
      };
    });
    
    $scope.errorSettings.groupErrHandle = false;
  };

  $scope.deleteGroup = function(group) {
    var index = $scope.groups.list.indexOf(group);
    group.$delete(function() {
      $scope.groups.list.splice(index, 1);
    });
    $scope.closeDialog();
  };
  
  $scope.updateGroup = function(editGroup) {
    editGroup.$update();
    $scope.edit.friendsToAdd =  $scope.edit.friends.filter(function(friend){
      return friend.add_to_group;
    });
    $scope.edit.membersToDelete =  $scope.edit.groupMembers.filter(function(member){
      return member.remove_from_group;
    });
    $scope.edit.friendsToAdd.forEach(function(friend) {
        $scope.groupFriend = new groupResource({
          group_id: editGroup.id,
          friend_id: friend.id
        });
        $scope.groupFriend.$add_friend_to_group({id: editGroup.id});
    });
    $scope.edit.membersToDelete.forEach(function(member) {
        $scope.groupFriend = new groupResource({
          group_id: editGroup.id,
          friend_id: member.id
        });
        $scope.groupFriend.$delete_friend_from_group({id: editGroup.id, member: member.id});
    });
    $scope.closeDialog();
  };
  
  $scope.showAdvanced = function(ev, group) {
    $scope.edit.group = group;
    getFriends();
    getMembers(group);
    return $mdDialog.show({
      templateUrl: 'groups/edit.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      scope: $scope.$new(),
      clickOutsideToClose:true
    });
  }; 
  
  $scope.closeDialog = function() {
    $mdDialog.hide();
    $scope.edit.showMembers = false;
    $scope.edit.showFriends = false;
  };
  
  $scope.toggleFriends = function(){
    $scope.edit.showMembers = false;
    if($scope.edit.showFriends) {
      $scope.edit.showFriends = false;
    }
    else {
      getFriends();
      $scope.edit.showFriends = true;
    }
  };
  
  $scope.toggleMembers = function(){
    $scope.edit.showFriends = false;
    if($scope.edit.showMembers) {
      $scope.edit.showMembers = false;
    }
    else {
      getMembers($scope.edit.group)
      $scope.edit.showMembers = true;
    }
  };

}])

.animation('.slide', [function() {
  return {
    addClass: function(element, slideDown, doneFn) {
      $(element).slideDown(400, doneFn);
        doneFn();
    },
    removeClass: function(element, slideDown, doneFn) {
      $(element).slideUp(400, doneFn);
        doneFn();
    }
  }
}]);
