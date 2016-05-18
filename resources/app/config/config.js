(function () {
    
    'use strict';
    
    angular.module('mailTemplate').config(URLConfig);

    angular.module('mailTemplate').config(multilenguageConfig);
    multilenguageConfig.$inject = ['$translateProvider'];
    URLConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    
    
    function multilenguageConfig ($translateProvider) {
        $translateProvider.useUrlLoader('/getLanguage');
        $translateProvider.preferredLanguage('en');
    }
    
    /**
     * URL Configurator
     * @param $stateProvider
     * @param $locationProvider
     * @param $urlRouterProvider
     * @param helper
     * @constructor
     */
    function URLConfig ($stateProvider, $locationProvider, $urlRouterProvider, helper) {
        
        // Disabling HTML5
        $locationProvider.html5Mode(false);

        // default
        $urlRouterProvider.otherwise('/mailGenerator');

        // Defining route to mailGenerator
        $stateProvider
            .state('mailGenerator', {
                'url': '/mailGenerator',
                'templateUrl': '/resources/EmailTemplateManager/app/views/components/mailGenerator/template.html',
                'controller': 'mailGeneratorCtrl'
            });
            
        // Defining route to templateGenerator
        $stateProvider
            .state('templateGenerator', {
                'url': '/templateGenerator',
                'templateUrl': '/resources/EmailTemplateManager/app/views/components/templateGenerator/template.html',
                'controller': 'templateGeneratorCtrl'
            });
    }
})();
