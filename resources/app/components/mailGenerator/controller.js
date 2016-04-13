(function () {
    
    'use strict';
    
    angular.module('mailTemplate').controller('mailGeneratorCtrl', mailGeneratorCtrl);

    mailGeneratorCtrl.$inject = ['$scope', '$http'];


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
    }
})();

