(function () {
    
    'use strict';
    
    angular.module('mailTemplate').controller('templateGeneratorCtrl', templateGeneratorCtrl);

    templateGeneratorCtrl.$inject = ['$scope'];


    function templateGeneratorCtrl ($scope) {
        console.log('It works, you can start coding in templateGenerator Controller!');
    }
    
    
})();

