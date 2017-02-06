/**
 * Created by nikhilnanjappa on 05/02/2017.
 */

describe('Service: messageService', function() {

  // load the controller's module
  beforeEach(module('efAppApp'));

  var ChatRoomCtrl, scope, messageService, $q;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _messageService_, _$q_, $rootScope) {
    scope = $rootScope.$new();
    $q = _$q_;
    messageService = _messageService_;
    ChatRoomCtrl = $controller('ChatRoomCtrl', {
      $scope: scope
    });
  }));

  it('should call the send method', function () {
    var deferred = $q.defer();
    var token = 'xxx';
    var requestData = {
      'to': 'recipient',
      'content': 'hello'
    };

    spyOn(messageService, 'send').and.returnValue(deferred.promise);
    scope.send('hello', 'recipient');
    expect(messageService.send).toHaveBeenCalledWith(token, requestData);
  });

  it('should call the registeredUser method', function () {
    var deferred = $q.defer();
    var token = 'xxx';

    spyOn(messageService, 'registeredUsers').and.returnValue(deferred.promise);
    scope.init();
    expect(messageService.registeredUsers).toHaveBeenCalledWith(token);
  });

  it('should call the seeConversation method', function () {
    var deferred = $q.defer();
    var token = 'xxx';
    var recipient = 'name';

    spyOn(messageService, 'seeConversation').and.returnValue(deferred.promise);
    scope.seeConversation(recipient);
    expect(messageService.seeConversation).toHaveBeenCalledWith(token);
  });

});
