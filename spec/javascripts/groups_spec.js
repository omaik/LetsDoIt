describe('Groups tests', function() {
  describe('GroupsController', function() {
 	  var scope, GroupsController, groups,  resource;
 	  groups = [ { id: 1, name: 'group', description: 'description' } ];
 	  beforeEach(function() {
   	  module('letsDoIt');
      inject(function(
        _$controller_,
        _$httpBackend_,
        _groupResource_,
        $rootScope,
        $resource) {
          $httpBackend = _$httpBackend_;
          groupResource = _groupResource_;
          $controller = _$controller_;
          scope = $rootScope.$new();
          resource = $resource;
          GroupsController = $controller('GroupsController', { $scope: scope, groupResource: groupResource });
        });
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    
    it('should get groups list', function() {
      $httpBackend.whenGET('/groups.json').respond(groups);
      groupResource.query(function(data) {
        scope.groups.list = data;
      });
      $httpBackend.flush();
      expect(JSON.stringify(scope.groups.list)).toEqual(JSON.stringify(groups));
    });

    it('should create new group', function() {
      var group;
      scope.group = {
        name: 'Group',
        description: 'Description'
      };
      group = scope.group;
      $httpBackend.whenPOST('/groups.json').respond(201);
      $httpBackend.whenGET('/groups.json').respond(scope.groups.list);
      scope.addGroup();
      $httpBackend.flush();
      expect(JSON.stringify(scope.groups.list)).toContain(JSON.stringify(group));
    });

    it('should not create group with blank name', function() {
      var group;
        scope.group = {
        name: ''
      };
      group = scope.group;
      $httpBackend.whenPOST('/groups.json').respond(201);
      $httpBackend.whenGET('/groups.json').respond(scope.groups.list);
      scope.addGroup();
      $httpBackend.flush();
      expect(JSON.stringify(scope.groups.list)).not.toContain(JSON.stringify(group));
    });

    it('should delete group', function() {
      var group = new groupResource(groups[0]);
      $httpBackend.whenDELETE('/groups/' + group.id + '.json').respond(204);
      $httpBackend.whenGET('/groups.json').respond(scope.groups.list);
      scope.deleteGroup(group);
      $httpBackend.flush();
      expect(JSON.stringify(scope.groups.list)).not.toContain(JSON.stringify(group));
    });
  });
});
