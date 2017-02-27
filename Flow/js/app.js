
var app = angular.module('flowApp', ['ionic','chart.js']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
       

    });
});

app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom')
    $stateProvider
        .state('tabs', {
            url: "/tab",
            abstract: true,
            templateUrl: "views/tabs.html"
        })
        .state('tabs.home', {
            url: "/home",
            views: {
                'home-tab': {
                    templateUrl: "views/home.html",
                    controller: 'homeCtrl'
                }
            }
        })
        .state('tabs.chart', {
            url: "/chart",
            views: {
                'home-chart': {
                    templateUrl: "views/chart.html",
                    controller: 'chartCtrl'
                }
            }
        }).state('tabs.settings', {
            url: "/settings",
            views: {
                'home-settings': {
                    templateUrl: "views/settings.html",
                    controller: 'settingsCtrl'
                }
            }
        });

    $urlRouterProvider.otherwise("/tab/home");


});
