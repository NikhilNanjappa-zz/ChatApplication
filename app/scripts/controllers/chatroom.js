'use strict';

angular.module('efAppApp')
  .controller('ChatRoomCtrl', function ($scope, authenticateService, messageService, websocketService, $location, Notification) {
    $scope.$parent.loggedin = true;
    $scope.recipient = 'someone';
    $scope.chatMessages = [];
    $scope.conversationMessages = [];

    // Initializes few functions on ChatRoom controller instantiation
    $scope.init = function () {

      // Fetch all the registered users
      // service call
      messageService.registeredUsers(sessionStorage.AuthToken).then(function(response) {

        //remove the current logged in user from the array containing all registered users
        var index = response.data.users.indexOf(sessionStorage.username);
        response.data.users.splice(index, 1);

        // convert the response array into array of objects to add the property 'status' to update the status real time later
        // since the status is within an ng-repeat, using $scope is not advisable
        response.data.users = response.data.users.map(function (x) {
          return { name: x, status: 'offline' };
        });

        // assign the data to a scope variable to be used in ng-repeat
        $scope.users = response.data.users;

      });

      // Start the websocket connection - Created a service for websockets connect & onmessage event
      // created a callback on the onmessage event which delivers the response to the controller
      // service call
      websocketService.connect(sessionStorage.AuthToken, function(response) {
        var obj = JSON.parse(response.data);

        // On UserOnline event - iterate through each existing user list & update the status for the user who came online
        if(obj.topic === 'user-online') {
          angular.forEach($scope.users, function(value) {
            if(value.name === obj.data.username) {
              value.status = 'online';
            }
          });
          $scope.$apply();
        }

        // On UserOffline event - iterate through each existing user list & update the status for the user who went offline
        if(obj.topic === 'user-offline') {
          angular.forEach($scope.users, function(value) {
            if(value.name === obj.data.username) {
              value.status = 'offline';
            }
          });
          $scope.$apply();
        }

        // On Message event - when a user sends or receives a chat message
        if(obj.topic === 'message') {
          if(obj.data.to === sessionStorage.username) {
            // A notification is sent when the current user receives a message
            Notification.success({message: 'You got a new message from <span>'+ obj.data.from +'</span>'});
            if(obj.data.from === $scope.recipient) {
              // to update the chat window of the message only if the message is from the current conversant.
              $scope.chatMessages.push(obj.data);
            }
          } else if (obj.data.from === sessionStorage.username) {
            // to update the chat of message just sent by the current user
            $scope.chatMessages.push(obj.data);
          }
        }

        // On register event - A notification is sent when a new user is registered
        if(obj.topic === 'user-new') {
          Notification.primary('A new user with username '+ obj.data.username +' is now registered.');
        }

      });
    };
    $scope.init();

    // Function called when the current clicks on one of the users to start the conversation
    $scope.startConversation = function(recipient) {
      $scope.chatMessages = [];
      $scope.recipient = recipient;

      // hide-show the necessary divs in the markup
      $scope.conversate = true;
      $scope.seeConversations = false;
    };

    // Function called when the current wants to see the previous chat conversations of any user
    $scope.seeConversation = function(recipient) {
      $scope.conversationMessages = [];

      // service call
      messageService.seeConversation(sessionStorage.AuthToken).then(function(response) {
        if(response.statusText === 'OK') {

          // using lodash get all the messages of only the selected user from the response data
          var e = _.find(response.data.conversations, function(o) {
            return _.some(o.peers, function(p) {
              return p === recipient;
            });
          });

          if (e === undefined) {
            // If no conversations were found for that user
            Notification.error('Sorry, you have no conversation history');
          } else {
            $scope.conversationMessages = e.messages;

            // hide-show the necessary divs in the markup
            $scope.seeConversations = true;
            $scope.conversate = false;
          }
        }
      });
    };

    $scope.send = function (message, recipient) {
      // to clear the text after send button is clicked
      $scope.message = '';

      // the data to be sent to the api enclosed in a single object variable
      var requestData = {
        'to': recipient,
        'content': message
      };

      // calling the send message api in messageService
      // service call
      messageService.send(sessionStorage.AuthToken, requestData).then(function(response) {
        if(response.status === 200) {
          Notification.success('Message successfully sent');
        }
      });
    };

  });
