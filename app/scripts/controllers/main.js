'use strict';

angular.module('efAppApp')
  .controller('MainCtrl', function ($scope, authenticateService, $location, Notification) {

    $scope.authenticate = function (username, password, action) {
      //store it in session storage to use it later
      sessionStorage.username = username;

      // storing the credentials into an object and pass the object to the login/register service
      var creds = {
        'username': username,
        'password': password
      };

      if(action === 'register') {
        authenticateService.verify(creds, 'register').then(function(response) {
          sessionStorage.AuthToken = response.data.token;

          if(response.statusText === 'OK') {
            $location.path('chatroom');
            Notification.primary({message: 'Welcome '+ sessionStorage.username + '! <br><br>Click one of the users to start the conversation'});
          } else if (response.statusText === 'Conflict') {
            Notification.error('This user name is already taken. Please try another');
          }
        });
      } else if (action === 'login') {
        authenticateService.verify(creds, 'login').then(function(response) {
          sessionStorage.AuthToken = response.data.token;
          if(response.statusText === 'OK') {
            $location.path('chatroom');
            Notification.primary({message: 'Welcome '+ sessionStorage.username + '! <br><br>Click one of the users to start the conversation'});
          } else if (response.statusText === 'Unauthorized') {
            Notification.error('Incorrect username or password. Please try again.');
          }
        });
      }
    };
  });
