export default function routes($stateProvider, $urlRouterProvider) {
  'use strict';
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'assets/views/main.html',
      controller: 'mainController',
      controllerAs: 'main'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'assets/views/about.html',
      controller: 'aboutController',
      controllerAs: 'about'
    });
  $urlRouterProvider.otherwise('/');
}
routes.$inject = ['$stateProvider', '$urlRouterProvider'];
