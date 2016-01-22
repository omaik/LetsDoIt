describe('Tasks tests', function() {


  describe('TasksListController', function() {

    var scope, TasksListController, tasks, priorities, resource;
    tasks = [
      { id: 1, name: 'task 1', priority_id: '1', status: '2', description: 'description 1' },
      { id: 2, name: 'task 2', priority_id: '1', status: '2', description: 'description 2' }
    ];
    priorities = [
      { name: 'priority', value: 1, color:'#ffffff', id: 1 }
    ];
    categories = [
      { name: 'category', id: 1 }
    ];

    beforeEach(function() {
      module('letsDoIt');
      inject(function(
        _$controller_,
        _$httpBackend_,
        _tasksResource_,
        _prioritiesResource_,
        $rootScope,
        $resource) {
          $httpBackend = _$httpBackend_;
          tasksResource = _tasksResource_;
          prioritiesResource = _prioritiesResource_;
          $controller = _$controller_;
          scope = $rootScope.$new();
          resource = $resource;
          TasksListController = $controller('TasksListController', { $scope: scope, tasksResource: tasksResource });
      });
    });

     afterEach(function() {
       $httpBackend.verifyNoOutstandingExpectation();
       $httpBackend.verifyNoOutstandingRequest();
     });

    it('should get tasks list', function() {
      $httpBackend.whenGET('/tasks.json').respond(tasks);
      $httpBackend.whenGET('/priorities.json').respond(priorities);
      $httpBackend.whenGET('/categories.json').respond(categories);
      tasksResource.query(function(data) {
        scope.tasks.list = data;
      });
      $httpBackend.flush();
      expect(JSON.stringify(scope.tasks.list)).toEqual(JSON.stringify(tasks));
    });

      it('should create new task', function() {
        var task;
        scope.task = {
          name: 'Task 3',
          priority_id: '3',
          status: '2'
        };
        task = scope.task;
        $httpBackend.whenPOST('/tasks.json').respond(201);
        $httpBackend.whenGET('/priorities.json').respond(priorities);
        $httpBackend.whenGET('/categories.json').respond(categories);
        $httpBackend.whenGET('/tasks.json').respond(tasks);
        tasksResource.query(function(data) {
          scope.tasks.list = data;
        });
        spyOn(tasksResource, 'query').and.callFake(function() {
          scope.tasks.list.push(task);
          return scope.tasks.list;
        });
        scope.addTask();
        $httpBackend.flush();
        expect(JSON.stringify(scope.tasks.list)).toContain(JSON.stringify(task));
      });

        it('should not create task with blank name', function() {
          var task;
          scope.task = {
            name: '',
            priority_id: '3',
            status: '2'
          };
          task = scope.task;
          $httpBackend.whenPOST('/tasks.json').respond(201);
          $httpBackend.whenGET('/priorities.json').respond(priorities);
          $httpBackend.whenGET('/categories.json').respond(categories);
          $httpBackend.whenGET('/tasks.json').respond(tasks);
          tasksResource.query(function(data) {
            scope.tasks.list = data;
          });
          spyOn(tasksResource, 'query').and.callFake(function() {
            scope.tasks.list.push(task);
            return scope.tasks.list;
          });
          scope.addTask();
          $httpBackend.flush();
          expect(JSON.stringify(scope.tasks.list)).not.toContain(JSON.stringify(task));
      });

    it('should delete task', function() {
      var task = new tasksResource(tasks[1]);
      $httpBackend.whenDELETE('/tasks/' + task.id + '.json').respond(204);
      $httpBackend.whenGET('/tasks.json').respond(scope.tasks.list);
      $httpBackend.whenGET('/priorities.json').respond(priorities);
      $httpBackend.whenGET('/categories.json').respond(categories);
      scope.deleteTask(task);
      $httpBackend.flush();
      expect(JSON.stringify(scope.tasks.list)).not.toContain(JSON.stringify(task));
    });
  });

});
