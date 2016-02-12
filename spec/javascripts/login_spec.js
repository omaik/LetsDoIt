describe('Login tests', function() {

  var Auth, $rootScope, $http, $httpBackend, headerCallback;
  beforeEach(function() {
    module('letsDoIt');
    inject(function(_Auth_, _$rootScope_, _$http_, _$httpBackend_, _$location_) {
    Auth = _Auth_;
    scope = _$rootScope_;
    $http = _$http_;
    $location = _$location_;
    $httpBackend = _$httpBackend_;
  })});
  function forceSignIn(Auth, user) {
    user = (user === undefined) ? {} : user;
    Auth._currentUser = user;
    return user;
  }
  function constantTrue() {
    return true;
  }
  function headerWrapper(headers) {
    return headerCallback(headers);
  }
  describe('.login', function() {
    var user, postCallback, creds = {email: 'test', blah: true};
    function callbackWraper(data) {
      data = JSON.parse(data);
      return postCallback(data);
    }
    beforeEach(function() {
      headerCallback = postCallback = constantTrue;
      user = {email: 'aaa@aaa.aa', password: 'aaaaaaaa'};
      $httpBackend.expect('POST', '/users/sign_in.json', callbackWraper, headerWrapper).respond(user);
    });
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('broadcasts the session event and login events', function() {
      var loginCallback = jasmine.createSpy('login callback'), sessionCallback = jasmine.createSpy('session callback');
      scope.$on('devise:new-session', sessionCallback);
      scope.$on('devise:login', loginCallback);

      Auth.login(creds);
      $httpBackend.flush();

      expect(loginCallback).toHaveBeenCalledWith(jasmine.any(Object), user);
      expect(sessionCallback).toHaveBeenCalledWith(jasmine.any(Object), user);
    });
  });

  describe('.logout', function() {

    beforeEach(function() {
      headerCallback = constantTrue;
      $httpBackend.expect('DELETE', '/users/sign_out.json', null, headerWrapper).respond({});
    });
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('broadcasts the logout event', function() {
      var callback = jasmine.createSpy('logout callback');
      scope.$on('devise:logout', callback);

      Auth.logout();
      $httpBackend.flush();

      expect(callback).toHaveBeenCalled();
    });
  });

  describe('.currentUser', function() {
    describe('when authenticated', function() {
      var user;
      beforeEach(function() {
        user = forceSignIn(Auth);
      });

      it('does not broadcasts any events', function() {
        var callback = jasmine.createSpy('any callback');
        scope.$on('devise:new-session', callback);
        scope.$on('devise:login', callback);
        Auth.currentUser();
        scope.$apply();

        expect(callback).not.toHaveBeenCalled();
      });
    });

    describe('when unauthenticated', function() {
      describe('when user is logged in on server', function() {
        var user = {};
        beforeEach(function() {
          $httpBackend.expect('POST', '/users/sign_in.json').respond(user);
        });

        it('broadcasts the session event but not the login event', function() {
          var loginCallback = jasmine.createSpy('login callback'), sessionCallback = jasmine.createSpy('new-session callback');
          scope.$on('devise:new-session', sessionCallback);
          scope.$on('devise:login', loginCallback);

          Auth.currentUser();
          $httpBackend.flush();

          expect(sessionCallback).not.toHaveBeenCalled();
          expect(loginCallback).toHaveBeenCalledWith(jasmine.any(Object), user);
        });
      });
    });
  });

  describe('.isAuthenticated', function() {
    it('returns false if no currentUser', function() {
      forceSignIn(Auth, null);
      expect(Auth.isAuthenticated()).toBe(false);
    });

    it('returns true if a currentUser', function() {
      forceSignIn(Auth);
      expect(Auth.isAuthenticated()).toBe(true);
    });
  });
});
