(function () {

    'use strict';

    angular.module('mailTemplate').controller('templateGeneratorCtrl', templateGeneratorCtrl);

    templateGeneratorCtrl.$inject = ['$scope', '$http'];


    function templateGeneratorCtrl ($scope, $http) {

        $scope.saveTemplate = saveTemplate;
        $scope.validateTemForm = validateTemForm;
        $scope.createTextElement = createTextElement;
        $scope.validateForm = validateForm;
        $scope.createLink = createLink;
        $scope.deleteItem = deleteItem;
        $scope.readMethod = 'readAsDataURL';
        $scope.onReaded = onReaded;
        $scope.elementList = [];
        $scope.gridsterOpts = {
            'columns': 24,  // the width of the grid, in columns
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
                'enabled': false,
                'handle': '.my-class',
                'start': function (event, $element, widget){
                    widget.initialRow = widget.row;
                },
                'drag': function (event, $element, widget) {
                    // Declare array too store all columns occupied by the clicked widget
                    var columnsOccupied = [widget.col];
                    // Inject occupied columns on the previous array
                    for (var counter = 1;counter <= widget.sizeX;counter++) {
                        columnsOccupied.push(widget.col + counter);
                    }
                    // For each gridster element,  we check if it ocuppies the inmediate row below  to the selected widget
                    angular.forEach($scope.elementList, function (value) {
                        if (value.row === widget.sizeY + widget.row) {
                            // Declare array to store all columns occupied by the widget below the clicked widget
                            var columnsOccupiedByTheBelowOne = [value.col];
                            // Inject occupied columns on the previous array
                            for (var counter = 1;counter < value.sizeX;counter++) {
                                columnsOccupiedByTheBelowOne.push(value.col + counter);
                            }
                            // Check if any of the elements of array  columnsOccupiedByTheBelowOne is inside columnsOccupied array
                            for (var i = 0;i < columnsOccupiedByTheBelowOne.length;i++) {
                                if ($.inArray(columnsOccupiedByTheBelowOne[i], columnsOccupied) !== -1 && widget.row > widget.initialRow) {
                                    // If that is the case, the widget below our clicked widget is moved to the previous row
                                    value.row -= 1;
                                }
                            }
                        }
                    });
                }
                // 'stop': function (event, $element, widget) {}
            }
        };

        /*
         * This function validates the fields in the mail sending form
         * @returns {Boolean}
         */
        function validateTemForm () {
            if (
                $scope.saveTemplateForm.name_template.$invalid) {
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
        
        /*
         * This function creates a new gridster element when a button in the toolbar is clicked. It is used
         * for all buttons, so it receives as an argument which elements needs to be created.
         * @param {type} element
         * @returns {undefined}
         */
        function createTextElement (element) {
            $scope.elementList.push({
                'type': element,
                'sizeX': 2,
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
                $scope.linkSettingsForm.link.$invalid) {
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
        
    /*
     * This function is used to create a gridster img element, in which the image source is used
     * as background.
     */

        /*
         * This function is used to delete a gridster element when trash icon is clicked
         * @param {type} index
         * @returns {undefined}
         */
        function deleteItem (index) {
            $scope.elementList.splice(index, 1);
        }

        /*
         * This function is used to create a gridster img element, in which the image source is used
         * as background.
         */
        function onReaded (e, file) {
            $scope.img = e.target.result;
            $scope.file = file;
            $scope.elementList.push({
                'type': 'img',
                'src': $scope.img,
                'sizeX': 1,
                'sizeY': 1
            });
            $('#askForImg').modal('hide');
        }
    }
})();
