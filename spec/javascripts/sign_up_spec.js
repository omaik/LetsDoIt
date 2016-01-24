describe('signUpController', function  () {
  var scope, ctrl, auth;
  beforeEach(function() {
    module('letsDoIt');
    inject(function(_$controller_) {
      scope = {};
      ctrl = _$controller_('signUpController', {$scope:scope});
    });
    inject(function(Auth) {
      auth = Auth;
    })
  });
  it('should respond with correct emailPattern', function() {
    expect(scope.emailPattern).toEqual(/.+@.+\..+/i);
  });
  it('should respond with correct namePattern', function() {
    expect(scope.namePattern).toEqual(/^[a-zA-Z\u0400-\u04FF]+$/);
  });
  it('should have isError property with value false', function() {
    expect(scope.err.isError).toEqual(false);
  });
  it('should not have current user', function() {
    expect(auth._currentUser).toEqual(null);
  });
  describe('errorMessages', function() {
    it('should have pattern property', function() {
      expect(scope.errorMessages.pattern).toEqual('incorrect');
    });
    it('should have minlength property', function() {
      expect(scope.errorMessages.minlength).toEqual('too_short');
    });
    it('should have maxlength property', function() {
      expect(scope.errorMessages.maxlength).toEqual('too_long');
    });
  });
});


