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

    mailGeneratorCtrl.$inject = ['$scope', '$http'];

    var variables = new Array;// Array with the names of the variables of the selected templates
    var allTemplates = new Array;// ARRAY DE PRUEBA

<<<<<<< HEAD
    function mailGeneratorCtrl ($scope, $http) {
        
        /*
         * This function loads the clicked template in the email view in order to be sent
         */
        $scope.loadTemplate = function (id) {
            $http.get('getTemplate/'+id).then(function (response) {
                //This is the way template would we recover once we merge front with back
               var htmlTemplate = response.templates || '<h1> No template received </h1>';
               $('#actualTemplate').html(htmlTemplate);
            });
        };
        
        /*
         * This function validates both fields in the mail sending form
         * @returns {Boolean}
         */
        $scope.validateForm = function () {
            // If any of the required fields are invalid...
            if (
                 $scope.sendMailForm.email.$invalid ||
                 $scope.sendMailForm.subject.$invalid) {
                     return true;
                 }
             };
             
             
        /*
         * This function send the email when button in header is clicked
         */
        $scope.sendMail = function () {
            
            // Getting mail data
            var mailData = {
               'email' : $scope.email,
               'subject': $scope.subject, // why this is not working here??? $scope.sendMailForm.subject and it does upsters!;
               'htmlContent' : document.getElementById('actualTemplate').innerHTML
            };
            
            // Parsing js object to string
            mailData = JSON.stringify(mailData);
            console.log(mailData);
            
            // Sending mail
            $http.post('mail', {
                "mailData": mailData
            }).then(function(response) {
                // This function is call on success
                if (response.data === 'invalidData') {
                   swal({
                        title: 'error!',
                        text: 'server could not validate your data!',
                        type: 'error',
                        confirmButtomText: 'close'
                     });
                }
                else {
                swal({
                    title: 'success!',
                    text: 'All your emails were sended!',
                    type: 'success',
                    confirmButtomText: 'cool'
                });
                
                // Hide the modal
                $('#sendMail').modal("hide");
                
                // Clear the modal data
                $scope.name = '';
                $scope.email = '';
                $scope.subject = '';
                
                // This removes the has-error class added when the input data was removed setting the form state to pristine
                $scope.sendMailForm.$setPristine();
                }    
                
            }, function () {
                // This function is call on failure
                swal({
                    title: 'error!',
                    text: 'Something is wrong with the server, please try again latter',
                    type: 'error',
                    confirmButtomText: 'close'
                });
            });
        };
=======
    function mailGeneratorCtrl ($scope) {
        console.log('It works, you can start coding in mailGenerator Controller!');

        // Call the function that includes the templates in the scrool toolbar
        //getScroolTemplates();

        // Call the function that extract the variables of the template
        //extractVar();

        // Introduce the variables in the dropdown menu
        //introduceVar();

        // Function that activates when click on a templated
        $(".templateSelector").click(function (){
            //Extract the id_template
            var id = this.id;
            // Extract the tables of the templates
            $.get("/getTemplate/" + id, function (data, status) {
                $("#actualTemaplate").html(data.templates[0]);
                var num = $("html").html();
                //$("html").html(num);
                console.log(num);
                extractVar(data.templates[0]);
                introduceVar();
            });
        })

    }

    // Function that get all the templates at the database and show at the scrool tool bar
    function getScroolTemplates ()
    {
        // Get all the templates located at table templates at the database
        $.get("/getCreatedTemplates", function (data, status) {
            // Define the variables html and htmlMob that includes the html code in the html global page
            var html = "<div class='scroolTool'>";
            var htmlMob = "<div class='dropdown'><button id='templatesButton' type='button' data-toggle='dropdown' class='btn btn-primary dropdown-toggle' aria-expanded='true'>Templates<span class='caret'></span></button><div class='scroolTool dropdown-menu'>";

            // introduce the different parameters in the diferentes templates selectors
            data.templates.forEach(function (element) {
                html += "<a href='#'>" +
                    "<div id=" + element.id_template + " ng-click='loadTemplate(" + element.id_template + ")' class='templateSelector col-xs-12'>" +
                    "<div class='col-xs-5 icono'><table><tbody><tr><td>" +
                    "<img src=" + element.icon + " class='img-responsive'>" +
                    "</td></tr></tbody></table></div>" +
                    "<div class='col-xs-7 textTemplSel'>" + element.name_template + "<br>Fecha de creación: " + element.created_at.substring(0, 10) + "</div>" +
                    "</div></a>";
                htmlMob += "<a href='#'>" +
                    "<div id=" + element.id_template + " ng-click='loadTemplate(" + element.id_template + ")' class='col-xs-12 textTemplSel templateSelector'>" + element.name_template + "" +
                    "<br>Fecha de creación:<br>" + element.created_at.substring(0, 10) + "</div></a>";
            });

            // Complete the html code
            html += "</div><a href='#/templateGenerator'>" + $("#refTemplateGenerator").html() + "</a>";
            htmlMob += "<div class='col-xs-12 textTemplSel templateSelector'>Create a new Template</div></div></div>";
            // Includes the new html code into the global html
            $("#emailGeneratorToolbar").html(html);
            $("#emailGeneratorToolbarButton").html(htmlMob);
        });
    }

    // Function that extract the variables of the selected template and introduce it in the Array 'variables'
    function extractVar (str){
        variables = [];
        var n;// start of the variable
        var m;// end of the variable

        // If the template has any variables, we extract them to manage
        if (str.search("{{") != -1){
            do {
                n = str.search("{{");
                m = str.search("}}");
                variables.push(str.substring((n + 2), m));
                str = str.substring(0, n) +
                    "<b>Variable</b>" +
                    str.substring((m + 2), str.length);
                //document.getElementById("emailGeneratorBody").innerHTML = res;
                //str = document.getElementById("emailGeneratorBody").innerHTML;
            } while (str.search("{{") != -1)
        }
        // Visualice the variables
        console.log(variables);

    }

    // Function that introduce the variables of the Array 'variables' in the dropdown menu to introduce the text
    function introduceVar (){
        var html = "";// HTML to introduce in the dropdown menu
        var type = "text";
        variables.forEach(function (element){
            html += "<label for=" + element + " class='col-xs-12 formLabel'>" + element + ":</label>" +
            "<input type=" + type + " id=" + element + " placeholder=" + element + " ng-model=" +element + " class='col-xs-12 form-control'>";
        });
        $("#variablesForm").html(html);
>>>>>>> feature-DB
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
