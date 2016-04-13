(function () {
    
    'use strict';
    
    angular.module('mailTemplate').controller('mailGeneratorCtrl', mailGeneratorCtrl);

    mailGeneratorCtrl.$inject = ['$scope', '$http'];


    function mailGeneratorCtrl ($scope, $http) {

        /*
         * This function validates the form and its called by ng-disabled to enable or disabled 'send' button
         * @returns {Boolean}
         */
        
        /*
             
                    var amountOfNames = $scope.name.split(',').length;
                    var amountOfMails = $scope.email.split(',').length;
                    if (amountOfMails === amountOfNames) {
                        console.log ('misma cantidad');
                        return true;
                    }
                    else {
                        console.log ('distinta cantidad');
                        amountOfMails > amountOfNames?  $scope.sendMailForm.name.$invalid === true : $scope.sendMailForm.email.$invalid === true;
                        return false;
                    }
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
            
            // Getting mail data!
            var mailData = {
               'email' : $scope.email,
               'subject': $scope.subject, // why this is not working here??? $scope.sendMailForm.subject and it does upsters!;
               'htmlContent' : document.getElementById('actualTemplate').innerHTML
            };
            // Parsing js object to string!
            mailData = JSON.stringify(mailData);
            console.log(mailData);
            
            // Sending mail!
            $http.post('mail', {
                "mailData": mailData
            }).then(function(response) {
                if (response.data === 'invalidData') {
                   swal({
                        title: 'error!',
                        text: 'server could not validate your data!',
                        type: 'error',
                        confirmButtomText: 'close'
                     });
                }
                
                else {
                // This function is call on success
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

