
var app = angular.module('flowApp', ['ionic', 'chart.js']);
var flowHistory = [];

app.run(function ($ionicPlatform, localStore) {
    $ionicPlatform.ready(function () {

        // set to default values
        localStore.set("debug", "false");

        setTimeout(function () {
            navigator.splashscreen.hide();
        }, 1000);
        

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
        }).state('tabs.history', {
            url: "/history",
            views: {
                'home-history': {
                    templateUrl: "views/history.html",
                    controller: 'historyCtrl'
                }
            }
        });

    $urlRouterProvider.otherwise("/tab/home");


});
