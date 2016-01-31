describe('Category tests', function() {

  describe('CategoriesController', function() {

    var scope, CategoriesController, categories, resource;
    categories = [
      { id: 1, name: 'category 1' },
      { id: 2, name: 'category 2' }
    ];

    beforeEach(function() {
      module('letsDoIt');
      inject(function(
        _$controller_,
        _$httpBackend_,
        _categoryList_,
        $rootScope,
        $resource) {
          $httpBackend = _$httpBackend_;
          categoryList = _categoryList_;
          $controller = _$controller_;
          scope = $rootScope.$new();
          resource = $resource;
          CategoriesController = $controller('CategoriesController', { $scope: scope, categoryList: categoryList });
      });
    });

    afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get all categories', function() {
      $httpBackend.whenGET('/categories.json').respond(categories);
      categoryList.query(function(data) {
        scope.categories = data;
      });
      $httpBackend.flush();
      expect(JSON.stringify(scope.categories)).toEqual(JSON.stringify(categories));
    });
  });

});

