(function () {
    
    'use strict';
    
    angular.module('mailTemplate').config(URLConfig);

    angular.module('mailTemplate').config(multilenguageConfig);
    multilenguageConfig.$inject = ['$translateProvider'];
    URLConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    
    
    function multilenguageConfig ($translateProvider) {
        $translateProvider.useUrlLoader('/getLanguages');
        $translateProvider.preferredLanguage('en');
        /*
        $translateProvider.translations('en', {
          HEADLINE: 'Hello there, This is my awesome app!',
          INTRO_TEXT: 'And it has i18n support!'
        })
        .translations('de', {
          HEADLINE: 'Hey, das ist meine großartige App!',
          INTRO_TEXT: 'Und sie untersützt mehrere Sprachen!'
        });
        $translateProvider.preferredLanguage('de');
        */
    }
    
    /**
     * URL Configurator
     * @param $stateProvider
     * @param $locationProvider
     * @param $urlRouterProvider
     * @param helper
     * @constructor
     */
    function URLConfig($stateProvider, $locationProvider, $urlRouterProvider, helper) {
        
        // Disabling HTML5
        $locationProvider.html5Mode(false);

        // default 
        $urlRouterProvider.otherwise('/mailGenerator');

        // Defining route to mailGenerator
        $stateProvider
            .state('mailGenerator', {
                url: '/mailGenerator',
                templateUrl: helper.basepath('components', 'mailGenerator'),
                controller: 'mailGeneratorCtrl'
            });
            
        // Defining route to templateGenerator    
        $stateProvider
            .state('templateGenerator', {
                url: '/templateGenerator',
                templateUrl: helper.basepath('components', 'templateGenerator'),
                controller: 'templateGeneratorCtrl'
            });            
    }
})();