(function () {
    'use strict';
    angular.module('mailTemplate').controller('mailGeneratorCtrl', mailGeneratorCtrl);
    mailGeneratorCtrl.$inject = ['$scope', '$http', '$translate'];

    function mailGeneratorCtrl ($scope, $http, $translate) {
        // Disable the scroll
        $("body").css('overflow', 'hidden');
        
        // Declaring all scope methods
        $scope.loadTemplates = loadTemplates;
        $scope.loadTemplate = loadTemplate;
        $scope.deleteTemplate = deleteTemplate;
        $scope.changeLanguage = changeLanguage;
        $scope.disableSendingButton = disableSendingButton;
        $scope.sendEmail = sendEmail;
        $scope.changeVariables = changeVariables;
        $scope.closeDropdown = closeDropdown;
        $scope.sendOnEnter = sendOnEnter;


        // Declaring all scope properties
        $scope.selectedTemplate = null;
        $scope.templateVariables = [];
        $scope.data = {
            'languages': [
                {'value': 'en', 'name': 'english'},
                {'value': 'es', 'name': 'spanish'}
            ],
            'selectedLanguage': {'value': 'en', 'name': 'english'}
        };

                
       /**
        * loadTemplates: this function loads the template list when view is initialized
        */
        function loadTemplates () {
            $http.get('/getCreatedTemplates').then(function (response) {
                $scope.templateList = response.data.templates;
            });
        }
        
        
        /*
         * loadTemplate: loads clicked template on #actualTemplate container, checks for variables
         * on it, and loads them on dropdown menu.
         * @param {string} templateId --> id of the template that has been clicked
         */
        function loadTemplate (templateId) {
            // Save template id on scope so its reachable to remove it or edit it
            $scope.selectedTemplate = templateId;
            $http.get('getTemplate/' + templateId).then(function (response) {
                // Stores template content
                var htmlTemplate = response.data.templates || '<h1> No template received from server</h1>';
                // Remove possible variables saved from previous template
                $scope.templateVariables = [];
                /*
                 * Searchs for '{{' on template content, because this is how variables are identified. If some result
                 * is found, content between '{{' and '}}' is stored on $scope.templateVariables. Each variable
                 * needs to be stored as an array with two elements to use them for label and input
                 * tags separately, so them not get binded through angular.
                 */
                if (htmlTemplate.search('{{') !== -1) {
                    var startOfVariable = null;
                    var endOfVariable = null;
                    var variable = null;
                    do {
                        startOfVariable = htmlTemplate.search('{{');
                        endOfVariable = htmlTemplate.search('}}');
                        variable = htmlTemplate.substring(startOfVariable + 2, endOfVariable);
                        $scope.templateVariables.push([variable, variable]);
                        htmlTemplate = htmlTemplate.substring(0, startOfVariable) +
                            '<label for=' + variable + ' class="variables">' + variable + '</label>' +
                            htmlTemplate.substring(endOfVariable + 2, htmlTemplate.length);
                    } while (htmlTemplate.search('{{') !== -1);
                }
                // Loads template content on #actualTemplate container
                $('#actualTemplate').html(htmlTemplate);
            });
        }
        
        
        /**
        * deleteTemplate: removes a template from the database and updates $scope.templateList
        * removing deleted template from it, so no referesh is necessary.
         * @param {string} templateId --> id of the template that is going to be removed
         */
        function deleteTemplate (templateId) {
            $http.post('/deleteTemplate', {'data': templateId}).then(function () {
                // Search for element on $scope.template whose id_template is the same as removed id
                $scope.templateList.filter(function (obj, index) {
                    if (obj.id_template === templateId) {
                        $scope.templateList.splice(index, 1);
                        // If removed template is current template, #actualTemplate content is erased
                        if (templateId === $scope.selectedTemplate) {
                            $('#actualTemplate').empty();
                        }
                    }
                });
            });
        }
        
      
        /**
         * changeLanguage: changes current language
         * @param {string} lang --> Selected language
         */
        function changeLanguage (lang) {
            $translate.use(lang.value);
        }
        
        
        /**
         * disableSendingButton: validates enables or disables email sending button checking if
         * sendMailForm inputs are valid or invalid.
         * @returns {Boolean} --> true if form is invalid, false if form is valid
         */
        function disableSendingButton () {
            if ($scope.sendMailForm.email.$invalid || $scope.sendMailForm.subject.$invalid) {
                return true;
            }
        }
        
        
        /**
         * sendEmail: sends current #actualTemplate content as an email to one or multiple targets
         */
        function sendEmail () {
            // Recovering mail data
            var emailData = {
                'email': $scope.email,
                'subject': $scope.subject,
                'htmlContent': document.getElementById('actualTemplate').innerHTML
            };
            // Parsing mailData object to string
            emailData = JSON.stringify(emailData);
            // Sending mail
            $http.post('email', {
                'emailData': emailData
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


/**
 * changeVariables: Updates variables in template when they are changed on the form. This should be done
 * automatically by angular data binding, but as variables are added after dom is compiled by angular,
 * and no way of recompiling dom has been found, data binding on variables needs to be manually
 * implemented with js through this function. This function is called when a variable value
 * is modified on dropdown variables menu.
 */
        function changeVariables () {
            // Get name and value of variable that has been modified on dropdown menu
            var NameVariable = this.variable[0];
            var ValueVariable = this.variable[1];
            // Get all labels on #actualTemplate content (variables are stored on templates inside label tags)
            var labels = angular.element('#actualTemplate').find('label');
            // Search and modify  on #actualTemplate the variable that user has modified
            for (var i = 0;i < labels.length;i++) {
                if (labels[i].getAttribute('for') === NameVariable && labels[i].getAttribute('class') === 'variables') {
                    labels[i].innerHTML = ValueVariable;
                }
            }
        }
        
               
        /**
         * closeDropdown: Closes variables dropdown menu when enter is pressed
         * @param {type} event --> keypress event that triggers this functions
         */
        function closeDropdown (event) {
            (event.keyCode === 13) ? $('div#variables').removeClass('open') : '';
        }
        
                
       /**
        * sendOnEnter: triggers $scope.sendEmail() when enter is pressed on #sendMail modal window
        * @param {type} event
        */
        function sendOnEnter (event) {
            if (event.keyCode === 13 && $('#sendMail .btn-success').is(':enabled')) {
                $scope.sendEmail();
            }
        }
        
        //  Fix to focus on emial input when #sendMail modal is opened
        $('#sendMail').on('shown.bs.modal', function () {
            $('input:text:visible:first', this).focus();
        });
    }
})();
