'use strict';

angular.module('efAppApp')
  .controller('ChatRoomCtrl', function ($scope, authenticateService, messageService, websocketService, $location, Notification) {
    $scope.$parent.loggedin = true;
    $scope.recipient = 'someone';
    $scope.chatMessages = [];
    $scope.conversationMessages = [];

    // Call few default function during chat room load using init() function
    $scope.init = function () {
      messageService.registeredUsers(sessionStorage.AuthToken).then(function(response) {
        //remove the current logged in user to show the list of registered users
        var index = response.data.users.indexOf(sessionStorage.username);
        response.data.users.splice(index, 1);
        $scope.users = response.data.users;

        if(response.status === 400) {
          $location.path('main');
        }
      });

      websocketService.connect(sessionStorage.AuthToken, function(response) {
        var obj = JSON.parse(response.data);
        console.log(obj);

        // On UserOnline event
        if(obj.topic === 'user-online') {
          // angular.forEach($scope.users, function(value, index) {
          //   if(value == obj.data.username) {
          //
          //   }
          // });
        }

        // On Message event
        if(obj.topic === 'message') {
          if(obj.data.to === sessionStorage.username) {
            // A notification is sent when the current user receives a message
            Notification.success({message: 'You got a new message from <span>'+ obj.data.from +'</span>'});
            if(obj.data.from === $scope.recipient) {
              // to update the chat of the message only if the message is from the current conversant.
              $scope.chatMessages.push(obj.data);
            }
          } else if (obj.data.from === sessionStorage.username) {
            // to update the chat of message just sent by the user
            $scope.chatMessages.push(obj.data);
          }
        }

        // A notification is sent when a new user is registered
        if(obj.topic === 'user-new') {
          Notification.primary('A new user with username '+ obj.data.username +' is now registered.');
        }

      });
    };
    $scope.init();

    $scope.startConversation = function(recipient) {
      $scope.chatMessages = [];
      $scope.recipient = recipient;
      $scope.conversate = true;
      $scope.seeConversations = false;
    };

    $scope.seeConversation = function(recipient) {
      messageService.seeConversation(sessionStorage.AuthToken).then(function(response) {
        console.log(response.data.conversations);
        if(response.statusText === 'OK') {

          var e = _.find(response.data.conversations, function(o) {
            return _.some(o.peers, function(p) {
              return p === recipient;
            });
          });
          console.log(e);
          $scope.conversationMessages = e.messages;
          $scope.seeConversations = true;
          $scope.conversate = false;
        }
      });
    };

    $scope.send = function (message, recipient) {
      var requestData = {
        'to': recipient,
        'content': message
      };

      // to clear the text after button is clicked
      $scope.message = '';

      messageService.send(sessionStorage.AuthToken, requestData).then(function(response) {
        if(response.status === 200) {
          Notification.success('Message successfully sent');
        }
      });
    };

  });
