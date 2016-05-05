(function () {
    'use strict';
    angular
        .module('mailTemplate', [
            'ui.router',
            'ngRoute',
            'ngLodash',
            'gridster',
            'ngFileReader',
            'pascalprecht.translate'
        ])
        .run(['$rootScope', '$state', '$stateParams', '$window',
            function ($rootScope, $state, $stateParams, $window) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
                $rootScope.$storage = $window.localStorage;
            }]);
})();


