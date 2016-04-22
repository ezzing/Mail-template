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

