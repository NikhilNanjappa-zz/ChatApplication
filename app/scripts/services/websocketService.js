/**
 * Created by nikhilnanjappa on 02/02/2017.
 */

'use strict';

angular.module('efAppApp')
  .factory('websocketService', function () {
    return {
      connect: function(token, callback) {
        var ws = new WebSocket('ws://localhost:8080?token=' + token);

        ws.onmessage = function(event) {
          callback(event);
        };
      }
    };
  });
