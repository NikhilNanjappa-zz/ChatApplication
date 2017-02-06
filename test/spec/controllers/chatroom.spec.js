'use strict';

describe('Controller: ChatRoomCtrl', function () {

  // load the controller's module
  beforeEach(module('efAppApp'));

  var ChatRoomCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChatRoomCtrl = $controller('ChatRoomCtrl', {
      $scope: scope
      // mocked dependencies
    });
  }));

});
