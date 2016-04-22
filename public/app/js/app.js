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

                    // Injecting new template in DOM
                    $('#actualTemplate').html(htmlTemplate);

                    // Compiling the new DOM content to enable angular on it
                    $compile($('#actualTemplate').contents())($scope);
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

    templateGeneratorCtrl.$inject = ['$scope', '$http'];


    function templateGeneratorCtrl ($scope, $http) {

        eventFire(document.getElementById("comprobar"), 'click');

        function eventFire(el, etype){
            if (el.fireEvent) {
                console.log("ff");
                el.fireEvent('on' + etype);
            } else {
                var evObj = document.createEvent('Events');
                evObj.initEvent(etype, true, false);
                el.dispatchEvent(evObj);
            }
        }
        
        function comprueba(){
            console.log("comprueba");
        }

        $("#comprobar").click(function () {
            var screeshot = document.getElementById("templateGeneratorBody");
            html2canvas(screeshot, {
                onrendered: function (canvas) {
                    canvas.id = "canvas";
                    document.body.appendChild(canvas);
                    var link = document.getElementById("download");
                    console.log(link);
                    downloadCanvas(link, canvas, "test.png");
                    //var link = document.getElementById("download");
                    //downloadCanvas(link, 'canvas', 'template1.png');
                }
            })
        });

        document.getElementById('download').addEventListener('click', function() {
            var link = document.getElementById("download");
            downloadCanvas(link, 'canvas', 'test.png');
        }, false);

        /**
         * This is the function that will take care of image extracting and
         * setting proper filename for the download.
         * IMPORTANT: Call it from within a onclick event.
         */
        function downloadCanvas(link, canvas, filename) {
            link.href = canvas.toDataURL();
            link.download = filename;
            $("#download").trigger('click');
        }

        $scope.saveTemplate = saveTemplate;

        $scope.validateTemForm = validateTemForm;

        $scope.icon_list = [{'name': 'icon1', 'url': '/app/img/plantilla.png'},
            {'name': 'icon2', 'url': '/app/img/template.png'},
            {'name': 'icon3', 'url': '/app/img/plantilla.png'},
            {'name': 'icon4', 'url': '/app/img/template.png'}];

        /*
         * This function validates the fields in the mail sending form
         * @returns {Boolean}
         */
        function validateTemForm () {
            if (
                $scope.saveTemplateForm.name_template.$invalid||
                $scope.saveTemplateForm.icon_template.$invalid) {
                return true;
            }
        }

        /*
         * This function saves the template when button in header is clicked
         */
        function saveTemplate () {

            // Getting template data
            var templateData = {
                'name_template': $scope.name_template,
                'icon': $scope.icon_template, //Solo obtengo el nombre CAMBIAR
                'html': document.getElementById('templateGeneratorBody').innerHTML
            };

            // Parsing js object to string
            templateData = JSON.stringify(templateData);

            // Saving Template
            $http.post('saveTemplate', {
                'template': templateData
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
                        'text': 'Your template is save!',
                        'type': 'success',
                        'confirmButtomText': 'cool'
                    });

                    // Hide the modal
                    $('#saveTemplate').modal('hide');

                    // Clear the modal data
                    $scope.name_template = '';
                    $scope.icon_template = '';

                    // This removes the has-error class added when the input data was removed setting the form state to pristine
                    $scope.saveTemplateForm.$setPristine();
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

        //TinyMCE image selector
        tinymce.init({
            selector: '.imageExample',
            inline: true,
            resize: true,
            plugins: [
                "image",
                "imagetools"
            ],
            menubar: false,
            toolbar: 'undo redo | image | alignleft aligncenter alignright',
            file_browser_callback : myFileBrowser,
            imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io']
        });

        //TinyMCE Text selector
        tinymce.init({
            selector: '.textExample',
            inline: true,
            resize: true,
            plugins: [
                "link autolink image",
                "textcolor imagetools"
            ],
            menubar: false,
            toolbar1: 'fontsizeselect fontselect | alignleft aligncenter alignright alignjustify | subscript superscript ',
            toolbar2: 'undo redo | bold italic underline forecolor backcolor | mybutton | image  link unlink',
            setup: function(editor) {
                editor.addButton('mybutton', {
                    text: 'Variable',
                    icon: false,
                    onclick:function() {
                        editor.insertContent('<span class="variables" style="color: red; background: yellow; font-weight: bold">' +
                            '<span class="uneditable" contenteditable="false">{{</span>Variable<span class="uneditable" contenteditable="false">}}' +
                            '</span></span>');
                    }
                });
            },
            file_browser_callback : myFileBrowser,
            fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt 42pt 72pt',
            imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io']
        });

        /*
        * This Function extract the url of the insert image
        * @param input {type} HTML Element
        * @param field_name {type} string
        * @param win {type} window Object
         */
        function readURL(input, field_name, win) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    win.document.getElementById(field_name).value = e.target.result;
                }

                reader.readAsDataURL(input.files[0]);
            }
        }

        /*
        * This Function expand the browser file to insert an image
         */
        function myFileBrowser (field_name, url, type, win)
        {
            var elemId = "img";
            var elem = win.document.getElementById(elemId);
            if(elem && document.createEvent) {
                var evt = document.createEvent("MouseEvents");
                evt.initEvent("click", true, false);
                elem.dispatchEvent(evt);
            }
            $("#" + elemId).change(function (){
                readURL(this, field_name, win);
            });
            win.document.getElementById(field_name).value = 'Without file';
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
