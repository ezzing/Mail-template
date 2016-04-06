(function () {
    
    'use strict';
    
    angular.module('mailTemplate').controller('mailGeneratorCtrl', mailGeneratorCtrl);

    mailGeneratorCtrl.$inject = ['$scope'];


    function mailGeneratorCtrl ($scope) {
        console.log('It works, you can start coding in mailGenerator Controller!');
    }
    
    
})();

