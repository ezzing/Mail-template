(function () {
    'use strict';
    angular
        .module('mailTemplate', [
            'ui.router',
            'ngRoute',
            'ngLodash'
        ])
        .run(['$rootScope', '$state', '$stateParams', '$window',
            function ($rootScope, $state, $stateParams, $window) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
                $rootScope.$storage = $window.localStorage;
            }]);
})();



(function () {

    'use strict';
    
    angular.module('mailTemplate').controller('mailGeneratorCtrl', mailGeneratorCtrl);
    
    mailGeneratorCtrl.$inject = ['$scope', '$http', '$compile'];

    function mailGeneratorCtrl ($scope, $http, $compile) {
        
        // Loading templates and saving in $scope.templateList in order to use it on div#emailGeneratorToolbar
        $http.get('/getCreatedTemplates').then(function (response) {
            $scope.templateList = response.data.templates;
        });

        $scope.loadTemplate = loadTemplate;

        $scope.validateForm = validateForm;
       
        $scope.sendMail = sendMail;
        
        /*
         * This function loads clicked template on #actualTemplate container, checks for variables on it, and loads them on dropdown menu
         * @param {type} id
         */
        
        function loadTemplate (id) {
            $http.get('getTemplate/' + id).then(function (response) {
                $scope.templateVariables = [];
                // Getting new template
                var htmlTemplate = response.data.templates || '<h1> No template received from server</h1>';
                
                // Injecting new template in DOM
                $('#actualTemplate').html(htmlTemplate);
                
                // Compiling the new DOM content to enable angular on it
                $compile($('#actualTemplate').contents())($scope);
                
                // If there is some '{{' string on template
                if (htmlTemplate.search('{{') !== -1) {
                    var startOfVariable = null;
                    var endOfVariable = null;
                    do {
                        startOfVariable = htmlTemplate.search('{{');
                        endOfVariable = htmlTemplate.search('}}');
                        $scope.templateVariables.push(htmlTemplate.substring(startOfVariable + 2, endOfVariable));
                        htmlTemplate = htmlTemplate.substring(0, startOfVariable) +
                            '<b>Variable</b>' +
                            htmlTemplate.substring(endOfVariable + 2, htmlTemplate.length);
                    } while (htmlTemplate.search('{{') !== -1);
                }
            });
        }
        
        /*
         * This function validates the fields in the mail sending form
         * @returns {Boolean}
         */
        function validateForm () {
            if (
                $scope.sendMailForm.email.$invalid ||
                $scope.sendMailForm.subject.$invalid) {
                return true;
            }
        }
        
       /*
         * This function sends the email when button in header is clicked
         */
        function sendMail () {

            // Getting mail data
            var mailData = {
                'email': $scope.email,
                'subject': $scope.subject,
                'htmlContent': document.getElementById('actualTemplate').innerHTML
            };

            // Parsing js object to string
            mailData = JSON.stringify(mailData);
            
            // Print actual request to debug with postman
            console.log(mailData);

            // Sending mail
            $http.post('mail', {
                'mailData': mailData
            }).then(function (response) {
                // If ajax call success but it returns a fail state
                if (response.data.status === 'fail') {
                    swal({
                        'title': 'error!',
                        'text': 'server could not validate your data!',
                        'type': 'error',
                        'confirmButtomText': 'close'
                    });
                }
                // If ajax call success and it return a success state
                else {
                    swal({
                        'title': 'success!',
                        'text': 'All your emails were sended!',
                        'type': 'success',
                        'confirmButtomText': 'cool'
                    });

                    // Hide the modal
                    $('#sendMail').modal('hide');

                    // Clear the modal data
                    $scope.name = '';
                    $scope.email = '';
                    $scope.subject = '';

                    // This removes the has-error class added when the input data was removed setting the form state to pristine
                    $scope.sendMailForm.$setPristine();
                }

            }, function () {
                // If ajax call does not success
                swal({
                    'title': 'error!',
                    'text': 'Something is wrong with the server, please try again latter',
                    'type': 'error',
                    'confirmButtomText': 'close'
                });
            });
        }
    }
})();


(function () {
    
    'use strict';
    
    angular.module('mailTemplate').controller('templateGeneratorCtrl', templateGeneratorCtrl);

    templateGeneratorCtrl.$inject = ['$scope'];


    function templateGeneratorCtrl ($scope) {
        console.log('It works, you can start coding in templateGenerator Controller!');
    }
    
    
})();


(function () {
    'use strict';
    angular
        .module('mailTemplate')
        .constant('BASEPATH', {
            apiURL: '[your API URL]',
            webURL: '[your WEB URL]'
        });
})();


(function () {
    
    'use strict';
    
    angular.module('mailTemplate').config(URLConfig);

    URLConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    
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
(function () {
    'use strict';
    angular
        .module('mailTemplate')
        .provider('RouteHelpers', RouteHelpers);

    function RouteHelpers() {
        this.basepath = basepath;

        function basepath(type, folder, template) {
            template = template || 'template';
            if (folder) {
                return '/app/views/' + type + '/' + folder + '/' + template + '.html';
            }
            return '/app/views/' + type + '/' + template + '.html';
        }

        this.$get = function () {
            return {
                basepath: this.basepath
            };
        };
    }
})();
