'use strict';

angular.module('efAppApp')
  .controller('ChatRoomCtrl', function ($scope, $rootScope, authenticateService, messageService, websocketService, $location, Notification) {
    $rootScope.loggedin = true;
    $scope.recipient = '';

    // Call few default function during chat room load using init() function
    $scope.init = function () {
      messageService.registeredUsers($rootScope.AuthToken).then(function(response) {
        $scope.users = response.data.users;
        if(response.status === 400) {
          $location.path('main');
        }
      });

      websocketService.connect($rootScope.AuthToken, function(response) {
        var obj = JSON.parse(response.data);
        console.log(obj);

        if(obj.topic === 'user-online') {
          // angular.forEach($scope.users, function(value, index) {
          //   if(value == obj.data.username) {
          //
          //   }
          // });
        }

        if(obj.topic === 'message' && obj.data.to === sessionStorage.username) {
          Notification.success('You got a message');
        }

      });

    };
    $scope.init();

    $rootScope.logout = function() {
      authenticateService.logout($rootScope.AuthToken).then(function(response) {
        if(response.status === 204) {
          $location.path('main');
          $rootScope.AuthToken = '';
          sessionStorage.username = '';
        }
      });
    };

    $scope.startConversation = function(recipient) {
      $scope.recipient = recipient;
      $scope.conversate = true;
    };

    $scope.seeConversation = function() {
      messageService.seeConversation($rootScope.AuthToken).then(function(response) {
        console.log(response);
      });
    };

    $scope.send = function (message, recipient) {
      var requestData = {
        'to': recipient,
        'content': message
      };

      // to clear the text after button is clicked
      $scope.message = '';

      messageService.send($rootScope.AuthToken, requestData).then(function(response) {
        console.log(response);
        if(response.status === 200) {
          Notification.success('Message successfully sent');
        }
      });
    };

  });
