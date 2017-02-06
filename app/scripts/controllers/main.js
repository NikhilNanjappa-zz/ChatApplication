'use strict';

angular.module('efAppApp')
  .controller('MainCtrl', function ($scope, authenticateService, $location, Notification) {

    $scope.authenticate = function (username, password, action) {

      // Validate if the username & password is not empty
      if(!username || !password) {
        Notification.error('The username and/or password is empty.');
      } else {
        //store the username in session storage to use it later
        sessionStorage.username = username;

        // storing the credentials into an object and pass the object to the login/register service
        var creds = {
          'username': username,
          'password': password
        };

        // Used only one service named 'verify' for both login / register as its implementation is identical taking the same parameters & giving the same response.
        // Only based on the parameter 'action' the respective api urls are substituted inside the service, this avoids creating two identical duplicate services
        // service call
        authenticateService.verify(creds, action).then(function(response) {

          if(response.statusText === 'OK') {
            sessionStorage.AuthToken = response.data.token;
            $location.path('chatroom');
            //Notify the user once in
            Notification.primary({message: 'Welcome '+ sessionStorage.username + '! <br><br>Click one of the users to start the conversation'});
          } else if (response.statusText === 'Conflict') {
            //Notify the user if there is conflict in the credentials
            Notification.error('This user name is already taken. Please try another');
          } else if (response.statusText === 'Unauthorized') {
            //Notify the user if credentials are invalid
            Notification.error('Incorrect username or password. Please try again.');
          }
        });
      }

    };
  });
