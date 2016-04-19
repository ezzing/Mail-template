(function () {
    'use strict';
    angular
        .module('mailTemplate', [
            'ui.router',
            'ngRoute',
            'ngLodash',
            'gridster',
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
        
        $scope.changeVariables = changeVariables;
        
        $scope.closeDropdown = closeDropdown;
        
        /*
         * This function loads clicked template on #actualTemplate container, checks for variables on it, and loads them on dropdown menu
         * @param {type} id
         */
        
        function loadTemplate (id) {
            $http.get('getTemplate/' + id).then(function (response) {
                // Getting new template
                var htmlTemplate = response.data.templates || '<h1> No template received from server</h1>';
                console.log('loading...' + id);
                // If there is some '{{' string on template
                if (htmlTemplate.search('{{') !== -1) {
                    var startOfVariable = null;
                    var endOfVariable = null;
                    var variable = null;
                    $scope.templateVariables = [];
                    do {
                        startOfVariable = htmlTemplate.search('{{');
                        endOfVariable = htmlTemplate.search('}}');
                        variable = htmlTemplate.substring(startOfVariable + 2, endOfVariable);
                        $scope.templateVariables.push([variable, variable]);
                        htmlTemplate = htmlTemplate.substring(0, startOfVariable) +
                            '<label for=' + variable + ' ' + 'class="variables">' + variable + '</label>' +
                            htmlTemplate.substring(endOfVariable + 2, htmlTemplate.length);
                    } while (htmlTemplate.search('{{') !== -1);
                }
                    // Injecting new template in DOM
                    $('#actualTemplate').html(htmlTemplate);

                    // Compiling the new DOM content to enable angular on it
                    $compile($('#actualTemplate').contents())($scope);
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

        /*
         * This function set the variables of the template when the user change it on the form
         */
        function changeVariables () {

            // Getting the name of the variable and the value
            var NameVariable = this.variable[0];
            var ValueVariable = this.variable[1];

            // Getting the labels of the html
            var labels = angular.element(document).find("label");
            
            // Search and modify the label that the is modifing
            for (var i = 0; i < labels.length; i++){
                if (labels[i].getAttribute("for") === NameVariable && labels[i].getAttribute("class") === "variables"){
                    labels[i].innerHTML = ValueVariable;
                }
            }

        }
        
        /*
         * This function close the dropdown variables menu when hit enter
         */
        function closeDropdown (event) {
            (event.keyCode === 13) ? $('div#variables').removeClass('open') : '';
        }
    }
})();


(function () {
    
    'use strict';
    
    angular.module('mailTemplate').controller('templateGeneratorCtrl', templateGeneratorCtrl);

    templateGeneratorCtrl.$inject = ['$scope'];


    function templateGeneratorCtrl ($scope) {
        $scope.createTextElement = createTextElement;
        $scope.validateForm = validateForm;
        $scope.createLink = createLink;
        $scope.deleteItem = deleteItem;
        $scope.elementList = [];
        $scope.gridsterOpts = {
            'columns': 12,  // the width of the grid, in columns
            'pushing': true, // whether to push other items out of the way on move or resize
            'floating': false, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
            'swapping': true, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
            'width': 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
            'colWidth': 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
            'rowHeight': 100, // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
            'margins': [10, 10], // the pixel distance between each widget
            'outerMargin': true, // whether margins apply to outer edges of the grid
            'isMobile': false, // stacks the grid items if true
            'mobileBreakPoint': 600, // if the screen is not wider that this, remove the grid layout and stack the items
            'mobileModeEnabled': true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
            'minColumns': 1, // the minimum columns the grid must have
            'minRows': 1, // the minimum height of the grid, in rows
           'maxRows': 100,
            'defaultSizeX':1, // the default width of a gridster item, if not specifed
            'defaultSizeY': 1, // the default height of a gridster item, if not specified
            'minSizeX': 1, // minimum column width of an item
            'maxSizeX': null, // maximum column width of an item
            'minSizeY': 1, // minumum row height of an item
            'maxSizeY': null, // maximum row height of an item
           'resizable': {
               'enabled': true,
               'handles': ['se'],
               'start': function(event, $element, widget) {}, // optional callback fired when resize is started,
               'resize': function(event, $element, widget) {}, // optional callback fired when item is resized,
               'stop': function(event, $element, widget) {} // optional callback fired when item is finished resizing
            },
            'draggable': {
                'enabled': true, // whether dragging items is supported
                'handle': '.my-class', // optional selector for resize handle
                'start': function (event, $element, widget) {}, // optional callback fired when drag is started,
                'drag': function (event, $element, widget) {}, // optional callback fired when item is moved,
                'stop': function (event, $element, widget) {} // optional callback fired when item is finished dragging
            }
        };


        /*
         * This function creates a new gridster element when a button in the toolbar is clicked. It is used
         * for all buttons, so it receives as an argument which elements needs to be created.
         * @param {type} element
         * @returns {undefined}
         */
        function createTextElement (element) {
            $scope.elementList.push({
                'type': element,
                'sizeX': 1,
                'sizeY': 1
            });
        }

/*
 * This functions validates form displayed when link button is clicked on the toolbar and returns
 * the disability status for sending button.
 * @returns {Boolean}
 */
        function validateForm () {
            if (
                $scope.linkSettingsForm.link.$invalid ||
                $scope.linkSettingsForm.linkText.$invalid) {
                return true;
            }
        }
        
/*
 * This function is used to create a link element (this functionality will probably be deprecated in order
 * to use tinymce instead). It receives as arguments the href and text values for link and creates
 * a new gridster element.
 * @param {type} link
 * @param {type} linkText
 * @returns {undefined}
 */
        function createLink (link, linkText) {
            $scope.elementList.push({
                'type': 'a',
                'href': link,
                'text': linkText,
                'sizeX': 1,
                'sizeY': 1
            });
        }
        
/*
 * This function is used to delete a gridster element when trash icon is clicked
 * @param {type} index
 * @returns {undefined}
 */
        function deleteItem (index) {
            $scope.elementList.splice(index, 1);
        }

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
