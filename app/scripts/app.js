'use strict';

/**
 * @ngdoc overview
 * @name efAppApp
 * @description
 * # efAppApp
 *
 * Main module of the application.
 */
angular
  .module('efAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui-notification'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/chatroom', {
        templateUrl: 'views/chatroom.html',
        controller: 'ChatRoomCtrl',
        controllerAs: 'chatroom'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
