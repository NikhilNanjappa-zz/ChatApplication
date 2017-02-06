/**
 * Created by nikhilnanjappa on 05/02/2017.
 */

describe('Authenticate Service', function() {

  var authenticateService = null;

  // load the controller's module
  beforeEach(module('efAppApp'));

  beforeEach(inject(function (_authenticateService_, _$httpBackend_) {
    authenticateService = _authenticateService_;
    $httpBackend = _$httpBackend_;
  }));

  it('should return a token string', function(){
    var creds = {};
    creds.userName = 'foo';
    creds.password = 'bar';
    var expectedData = '';
    var actualResult;

    $httpBackend.whenPOST('http://localhost:8080/login').respond(200, expectedData);
    authenticateService.verify(creds, 'login').then(function(response) {
      actualResult = response;
    });

    $httpBackend.flush();

  });

});
