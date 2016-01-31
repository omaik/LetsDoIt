describe('Profile tests', function() {

describe('EditProfilesController', function() {
    var scope, EditProfilesController, users, resource;
    users = [
      { id: 1, first_name: 'First', last_name: 'Last', sex: "Male", day: 1, month: 1, year: 1994, country: "Ukraine", city: "Lviv", avatar_file_name: "medium_Shrek.jpg", password: "qwerty123", password_confirmation: "qwerty123" }];

    beforeEach(function() {
      module('letsDoIt');
      inject(function(
        _$controller_,
        _$httpBackend_,
        _userProfile_,
        $rootScope,
        $resource) {
          $httpBackend = _$httpBackend_;
          userProfile = _userProfile_;
          $controller = _$controller_;
          scope = $rootScope.$new();
          resource = $resource;
          EditProfilesController = $controller('EditProfilesController', { $scope: scope, userProfile: userProfile });
      });
    });

     afterEach(function() {
       $httpBackend.verifyNoOutstandingExpectation();
       $httpBackend.verifyNoOutstandingRequest();
     });

it('should update user', function() {
      scope.profile = new userProfile(users[0]);
      scope.profile.first_name = 'New';
      $httpBackend.whenPUT('/users/'+ scope.profile.id +'.json').respond(204);
      $httpBackend.whenGET('/users/'+ scope.profile.id +'.json').respond(scope.profile);
      $httpBackend.whenGET('/users.json').respond(scope.profile);
      scope.editProfile = {$invalid: false}
      scope.updateProfile();
      $httpBackend.flush();
      expect(scope.profile.first_name).toMatch('New');
    });
});
});
