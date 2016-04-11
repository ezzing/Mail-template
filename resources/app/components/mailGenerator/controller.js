(function () {
    
    'use strict';
    
    angular.module('mailTemplate').controller('mailGeneratorCtrl', mailGeneratorCtrl);

    mailGeneratorCtrl.$inject = ['$scope', '$http'];


    function mailGeneratorCtrl ($scope, $http) {
        // Just for testing
        console.log('It works, you can start coding in mailGenerator Controller!');
        
        /*
         * This function validates the form and its called by ng-disabled to enable or disabled 'send' button
         * @returns {Boolean}
         */
        $scope.validateForm = function () {
            if (!($scope.sendMailForm.name.$valid &&
                 $scope.sendMailForm.email.$valid &&
                 $scope.sendMailForm.subject.$valid)) {
                    return true;
                 };
        };
        /*
         * This function send the email when button in header is clicked
         */
        $scope.sendMail = function () {
            
            // Getting mail data!
            var mailData = {
               'name' : $scope.name,
               'email' : $scope.email,
               'subject': $scope.subject, // why this is not working here??? $scope.sendMailForm.subject and it does upsters!;
               'htmlContent' : document.getElementById('actualTemplate').innerHTML
            };
            // Parsing js object to string!
            mailData = JSON.stringify(mailData);
            
            // Sending mail!
            $http.post('mail', {
                "mailData": mailData
            }).then(function() {
                
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
                
            }, function () {
                // This function is call on failure
                swal({
                    title: 'error!',
                    text: 'server could not validate your data!',
                    type: 'error',
                    confirmButtomText: 'close'
                });
            });
        };
    }
})();

