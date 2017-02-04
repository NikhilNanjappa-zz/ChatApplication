/**
 * Created by nikhilnanjappa on 02/02/2017.
 */

'use strict';

angular.module('efAppApp')
  .factory('messageService', function ($http) {
    var promise;
    var finalReturn = {
      send: function(token, requestData) {
        promise = $http({
          method: 'POST',
          url: 'http://localhost:8080/message',
          data: requestData,
          headers: {'x-auth-token': token}
        }).then(function(response) {
          return response;
        }, function(response) {
          return response;
        });

        return promise;
      },

      registeredUsers: function(token) {
        promise = $http({
          method: 'GET',
          url: 'http://localhost:8080/users',
          headers: {'x-auth-token': token}
        }).then(function(response) {
          return response;
        }, function(response) {
          return response;
        });

        return promise;
      },

      seeConversation: function(token) {
        promise = $http({
          method: 'GET',
          url: 'http://localhost:8080/conversations ',
          headers: {'x-auth-token': token}
        }).then(function(response) {
          return response;
        }, function(response) {
          return response;
        });

        return promise;
      }
    };
    return finalReturn;
  });
