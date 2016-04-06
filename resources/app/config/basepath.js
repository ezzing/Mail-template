(function () {
    'use strict';
    angular
        .module('mailTemplate')
        .constant('BASEPATH', {
            apiURL: '@@apiURL',
            webURL: '@@webURL'
        });
})();

