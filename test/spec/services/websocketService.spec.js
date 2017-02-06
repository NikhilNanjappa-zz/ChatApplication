/**
 * Created by nikhilnanjappa on 05/02/2017.
 */

describe('Service: websocketService', function() {

  // load the controller's module
  beforeEach(module('efAppApp'));

  var ChatRoomCtrl, scope, websocketService, $q;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _websocketService_, _$q_, $rootScope) {
    scope = $rootScope.$new();
    $q = _$q_;
    websocketService = _websocketService_;
    ChatRoomCtrl = $controller('ChatRoomCtrl', {
      $scope: scope
    });
  }));

  // need to stub the WebSocket

});
