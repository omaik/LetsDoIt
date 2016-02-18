/// <reference path="/vendor/assets/javascripts/faye.min.js" />
describe('Friendship', function() { 
  
  describe('FriendshipController', function () {
    var friendshipCtrl, scope, $httpBackend,
    responseData = {
      "friends": [
        {"id": 5,
        "first_name": "Barry",
        "last_name": "Alen",
        "email": "flash@central.city"},
        {"id": 7,
        "first_name": "Oliver",
        "last_name": "Queen",
        "email": "arrow@starling.city"},
        ],
      "pending": [
        {"id": 2,
        "first_name": "Bruce",
        "last_name": "Wayne",
        "email": "dark_knight@gotham.dc"}        
        ],
      "requested": [
        {"id": 9,
        "first_name": "Cisco",
        "last_name": "Ramon",
        "email": "cisco@starlab.com"}        
        ]
    },
    cUser = {
      id: 4,
      first_name: 'Armando',
      last_name: 'Fox'
    };
    beforeEach(function(){
      module('letsDoIt');
      inject(function(
        $controller,
        _$httpBackend_,
        _$rootScope_,
        friendshipResource){
        rootScope = _$rootScope_;
        scope = rootScope.$new();
        rootScope.currentUsr = cUser;           
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('/friendships?format=json').respond(responseData);
        friendshipCtrl = $controller('FriendshipController',{
          $scope: scope, friendshipResource: friendshipResource, $rootScope: rootScope
        });
      $httpBackend.flush();
      });
    });
  
    it('should create "friends" with 2 friends fetched from response', function(){
      expect(scope.data.friends).toBeDefined();
      expect(scope.data.friends.length).toBe(2);
    });
    
    it('should create "pending" with 1 person fetched from response', function(){
      expect(scope.data.pending).toBeDefined();
      expect(scope.data.pending.length).toBe(1);
    });
    
    it('should create "requested" with 1 person fetched from response', function(){
      expect(scope.data.requested).toBeDefined();
      expect(scope.data.requested.length).toBe(1);
    });
    
    it('it should have correct data in friends', function(){
      expect(scope.data.friends[0].last_name).toBe("Alen");
      expect(scope.data.friends[1].email).toBe("arrow@starling.city");
    });    
    
    it('it should have correct data in pending', function(){
      var undefinedParam = scope.data.pending[1];
      expect(scope.data.pending[0].first_name).toBe("Bruce");
      expect(undefinedParam).toBeUndefined();
    }); 
    
    describe('Accepting friendship request', function(){
      it('it should remove person from requested list and add it to friends', function(){
        var undefinedParam;
        scope.accept(scope.data.requested[0]);
        undefinedParam = scope.data.requested[0];
        expect(scope.data.requested.length).toBe(0);
        expect(undefinedParam).toBeUndefined();
      });           
    });
    
    describe('Deleting friendship', function(){
      it('it should remove person from friends', function(){
        expect(scope.data.friends[0].id).toBe(5);
        scope.deleteFunc(scope.data.friends[0], 'friends');
        expect(scope.data.friends.length).toBe(1);
        expect(scope.data.friends[0].id).toBe(7);
      });           
    });
    
    describe('Canceling request for friendship', function(){
      it('it should remove person from pending list', function(){
        scope.deleteFunc(scope.data.pending[0], 'pending');
        expect(scope.data.pending.length).toBe(0);
      });           
    });
    
  });
});

