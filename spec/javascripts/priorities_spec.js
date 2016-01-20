describe('Priorities', function() {

  describe('prioritiesController', function() {
    var scope, ctrl, service,
      defaultPriority = {
          name:'',
          value:1,
          color:'#ffffff',
          id: undefined
        },
      prior = {
          name: 'Ultra High',
          value: 224,
          color: '#adcd18',
          id:21
      };
    beforeEach(function() {
      module('letsDoIt');
      inject(function(_$controller_) {
        scope = {};
        ctrl = _$controller_('prioritiesController',{ '$scope': scope })
      });
    });
    it('should render default value to scope.priority', function() {
      expect(scope.priority).toEqual(defaultPriority)
    });

    describe('Edit behavior', function() {
      beforeEach(function() {
        scope.setPriority(prior);
      });

      it('should enable edit mode', function() {
        expect(scope.editMode).toEqual(true);
      });
      it('should render correct value to scope priority', function() {
        expect(scope.priority).toEqual(prior);
      });
      describe('Undoedit', function() {
        beforeEach(function() {
          scope.undoEdit();
        });
        it('should disable edit mode', function() {
          expect(scope.editMode).toEqual(false);
        });
        it('should give scope.priority default value', function() {
          expect(scope.priority).toEqual(defaultPriority);
        });
      });
    });
  });

  describe('Priorities service', function() {
    var scope, PriorController, resource, priorities;
    priorities = [
      {
        value: 200,
        name: 'UltraHigh',
        color: '#332940',
        id: 1
      }
    ];
      beforeEach(function() {
      module('letsDoIt');
      inject(function(
        _$controller_,
        _$httpBackend_,
        _prioritiesResource_,
        $rootScope,
        $resource) {
          debugger;
          $httpBackend = _$httpBackend_;
          prioritiesResource = _prioritiesResource_;
          $controller = _$controller_;
          scope = $rootScope.$new();
          resource = $resource;
          PriorController = $controller('prioritiesController', { $scope: scope, prioritiesResource: prioritiesResource });
        });

      });
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('should get all priorities', function() {
      $httpBackend.whenGET('/priorities.json').respond(priorities);
      prioritiesResource.query(function(data) {
        scope.priorities.list = data;
      });
      $httpBackend.flush();
      expect(JSON.stringify(scope.priorities.list)).toEqual(JSON.stringify(priorities));
    });

    it('should create new priority', function() {
      var prior;
      scope.priority = {
        name: 'kjfkg',
        value: 30,
        color: '#384393'
      };
      prior = scope.priority;
      $httpBackend.whenPOST('/priorities.json').respond(201);
      $httpBackend.whenGET('/priorities.json').respond(priorities);
      scope.addPriority();
      $httpBackend.flush();
      expect(JSON.stringify(scope.priorities.list)).toContain(JSON.stringify(prior));
    });

    it('should edit priority', function() {
      var prior = new prioritiesResource(priorities[0]);
      prior.value = 585
      priorities[0].value = 585;
      $httpBackend.whenPUT(prior.id + '.json').respond(204);
      $httpBackend.whenGET('/priorities.json').respond(priorities);
      scope.editPriority();
      $httpBackend.flush();
      expect(JSON.stringify(scope.priorities.list[0])).toMatch(JSON.stringify(prior));
    });
    it('should delete priority', function() {
      var prior = new prioritiesResource(priorities[0]);
      $httpBackend.whenDELETE('/priorities/' + prior.id + '.json').respond(204);
      $httpBackend.whenGET('/priorities.json').respond(priorities);
      scope.deletePriority(prior);
      $httpBackend.flush();
      expect(JSON.stringify(scope.priorities.list)).not.toContain(JSON.stringify(prior));
    })
  });
});
