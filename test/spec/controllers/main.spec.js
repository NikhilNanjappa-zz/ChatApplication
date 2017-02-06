'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('efAppApp'));

  var MainCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('ChatRoomCtrl', {
      $scope: scope
      // mocked dependencies
    });
  }));

});
