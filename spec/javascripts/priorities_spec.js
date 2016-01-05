/*describe('prioritiesController', function() {
  var scope, ctrl, prior, defaultPriority, service;
  beforeEach(function() {
    module('letsDoIt');
    inject(function(_$controller_) {
      scope = {};
      ctrl = _$controller_('prioritiesController',{ '$scope': scope })
    });
    defaultPriority = {
      name:'',
      value:1,
      color:'#ffffff',
      id: undefined
    };
    prior = {
      name: 'Ultra High',
      value: 224,
      color: '#adcd18',
      id:21
    }
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
*/
