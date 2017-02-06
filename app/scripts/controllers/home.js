/**
 * Created by nikhilnanjappa on 05/02/2017.
 */

'use strict';

angular.module('efAppApp')
  .controller('HomeCtrl', function ($scope, $location, authenticateService) {
    // This controller is created only to access control outside the ng view scope - header logout etc.

    // to show-hide the logout button
    $scope.loggedin = false;

    // when logout button is clicked
    $scope.logout = function() {
      // service call
      authenticateService.logout(sessionStorage.AuthToken).then(function(response) {
        if(response.status === 204) {
          $location.path('main');

          // clear the sessionStorage data
          sessionStorage.AuthToken = '';
          sessionStorage.username = '';
        }
      });
    };
  });
