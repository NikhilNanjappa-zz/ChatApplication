/**
 * Created by nikhilnanjappa on 02/02/2017.
 */

'use strict';

angular.module('efAppApp')
  .factory('authenticateService', function ($http) {
    var promise;
    var finalReturn = {
      verify : function(creds, action){
        var url = '';

        if(action === 'register') {
          url = 'http://localhost:8080/register';
        } else if(action === 'login') {
          url = 'http://localhost:8080/login';
        }

        promise = $http({
          method: 'POST',
          url: url,
          data: creds,
          headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
          return response;
        }, function(response) {
          return response;
        });

        return promise;
      },
      logout: function(token) {
        promise = $http({
          method: 'POST',
          url: 'http://localhost:8080/logout',
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
