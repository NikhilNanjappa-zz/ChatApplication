/**
 * Created by nikhilnanjappa on 05/02/2017.
 */

'use strict';

angular.module('efAppApp')
  .controller('HomeCtrl', function ($scope, $location, authenticateService) {

    //This controller is created only to access control outside the ng view scope - header logout etc.
    $scope.loggedin = false;

    $scope.logout = function() {
      authenticateService.logout(sessionStorage.AuthToken).then(function(response) {
        if(response.status === 204) {
          $location.path('main');
          sessionStorage.AuthToken = '';
          sessionStorage.username = '';
        }
      });
    };
  });
