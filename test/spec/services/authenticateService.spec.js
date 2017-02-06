/**
 * Created by nikhilnanjappa on 05/02/2017.
 */

describe('Service: authenticateService', function() {

  // load the controller's module
  beforeEach(module('efAppApp'));

  var MainCtrl, HomeCtrl, scope, authenticateService, $q;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _authenticateService_, _$q_, $rootScope) {
    scope = $rootScope.$new();
    $q = _$q_;
    authenticateService = _authenticateService_;
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });

    HomeCtrl = $controller('HomeCtrl', {
      $scope: scope
    });

  }));

  it('should call the login method', function () {
    var deferred = $q.defer();
    var credentials = {
      'username': 'first',
      'password': 'pass'
    };

    spyOn(authenticateService, 'verify').and.returnValue(deferred.promise);
    scope.authenticate('first', 'pass', 'login');
    expect(authenticateService.verify).toHaveBeenCalledWith(credentials, 'login');
  });

  it('should call the register method', function () {
    var deferred = $q.defer();
    var credentials = {
      'username': 'first',
      'password': 'pass'
    };

    spyOn(authenticateService, 'verify').and.returnValue(deferred.promise);
    scope.authenticate('first', 'pass', 'register');
    expect(authenticateService.verify).toHaveBeenCalledWith(credentials, 'register');
  });

  it('should call the logout method', function () {
    var deferred = $q.defer();
    var token = sessionStorage.AuthToken;

    spyOn(authenticateService, 'logout').and.returnValue(deferred.promise);
    scope.logout();
    expect(authenticateService.logout).toHaveBeenCalledWith(token);
  });

});
