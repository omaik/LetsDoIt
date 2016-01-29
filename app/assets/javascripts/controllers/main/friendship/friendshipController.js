angular.module('letsDoIt')
  .controller('FriendshipController', [
    '$scope',
    'Auth',
    '$resource',
    'friendshipResource',
    '$translate',
    'toastr',
    '$mdDialog',
    '$rootScope',
    'fayeResourse',
    function($scope, Auth, $resource, friendshipResource, $translate, toastr, $mdDialog, $rootScope, fayeResourse){
      var relations = {},
      baseChanel = '/',
      currentUsr = $rootScope.currentUsr,
      subChanel = '/' + currentUsr.id;
      $scope.data = {
        selectedIndex: 0,
        friends: [],
        requested:[],
        pending:[],
        results:[],
        search: "",
        message: false,
        pattern: /^[a-zA-Z\u0400-\u04FF]+$/
      };
      
      friendshipResource.getFriendship().get().$promise.then(function(response){
        relations = response;
        $scope.data.friends =  relations.friends;
        $scope.data.requested = relations.requested;
        $scope.data.pending = relations.pending;
      });
      
      fayeResourse.subscribe(subChanel, function(msg) {
        var index = 0;
        if (msg.notification === 'friendship'){
          switch (msg.friendship.action) {
            case 'accept':
              if ($scope.data.pending.length !== 0 ) {
                index = $scope.data.pending.indexOf(msg.friendship.data);
                $scope.data.pending.splice(index, 1);
              }
              relations.friends.push(msg.friendship.data);
              break;
            case 'request':
              if ($scope.data.result !== 0) {
                index = $scope.data.results.indexOf(msg.friendship.data);
                $scope.data.results.splice(index, 1);
              }
              relations.requested.push(msg.friendship.data);
              break;
            case 'delete':
              switch (msg.friendship.deleteResource) {
                case 'friends':
                  index = $scope.data.friends.indexOf(msg.friendship.data);
                  $scope.$apply(function() {
                    $scope.data.friends.splice(index, 1);
                  });                   
                  break;
                case 'requested':
                  index = $scope.data.requested.indexOf(msg.friendship.data);
                  $scope.$apply(function() {
                    $scope.data.requested.splice(index, 1);
                  });                       
                  break;
                case 'pending':
                  index = $scope.data.friends.indexOf(msg.friendship.data);
                  $scope.$apply(function() {
                    $scope.data.pending.splice(index, 1);
                  });                       
                  break;                  
              }
              break;
          }
        }
      });              
      
      function publishData(pubCh, data){
        fayeResourse.publish(pubCh, data);
      }
      
      $scope.setTab = function(tab){
        if (tab === 3){
          $scope.data.message = false;
          $scope.data.search = "";
          $scope.data.results = [];
        }
      };
      
      $scope.find = function(search){
        friendshipResource.findFriend(search).query().$promise.then(function(response){
          if(response.length === 0){
            $scope.data.message = true;
            $scope.data.results = [];
          } 
          else {
            $scope.data.message = false;
            $scope.data.results = response;
          }
        });
      };
      
      $scope.request = function(person){
        var index = $scope.data.results.indexOf(person), 
        msg = {notification: 'friendship', friendship: {action: 'request', data: currentUsr}},
        pubChanel = baseChanel + person.id;
        
        relations.pending.push(person);
        $scope.data.results.splice(index, 1);
        toastr.info($translate.instant('requestSent') + ' ' + person.first_name + ' ' + person.last_name, {
          closeButton: true,
        });
        friendshipResource.sendRequest(person.id).save();
        publishData(pubChanel, msg);
      };
      
      $scope.accept = function(person){
        var index = $scope.data.requested.indexOf(person),
        msg = {notification: 'friendship', friendship: {action: 'accept', data: currentUsr}},
        pubChanel = baseChanel + person.id;        
  
        relations.friends.push(person);
        $scope.data.requested.splice(index, 1);
        toastr.info(person.first_name + ' ' + person.last_name + ' ' + $translate.instant('requestAccepted'), {
          closeButton: true,
        });  
        friendshipResource.acceptRequest(person.id).save();
        publishData(pubChanel, msg);
      };      
            
      $scope.deleteFunc = function(person, param){
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
          case 'requested':
            index = $scope.data.requested.indexOf(person);
            $scope.data.requested.splice(index, 1);
            break;
        }
        friendshipResource.deleteFriendship(person.id).delete();
      };
      
      $scope.confirmDialog = function(ev, person, param){
        var confirm, content = '',
        msg = {notification: 'friendship', friendship: {action: 'delete', data: currentUsr}};
        switch(param){
          case 'friends':
            content = $translate.instant('deleteContentOne') + ' ' + person.first_name + ' ' + person.last_name + ' ' + $translate.instant('deleteContentTwo');
            msg.friendship.deleteResource = 'friends';
            break;
          case 'pending':
            content = $translate.instant('abortContent') + ' ' + person.first_name + ' ' + person.last_name + '?';
            msg.friendship.deleteResource = 'requested';
            break;
          case 'requested':
            content = $translate.instant('refuseContent') + ' ' + person.first_name + ' ' + person.last_name + '?';
            msg.friendship.deleteResource = 'pending';
            break;            
        }
        confirm = $mdDialog.confirm()
          .title($translate.instant('deleteTitle'))
          .textContent(content)
          .ariaLabel($translate.instant('deleteLabel'))
          .targetEvent(ev)
          .ok($translate.instant('deleteOk'))
          .cancel($translate.instant('deleteCancel'));

        $mdDialog.show(confirm).then(function() {
          var pubChanel = baseChanel + person.id;
          $scope.deleteFunc(person, param);
          publishData(pubChanel, msg);
        });
      };
  }]);

