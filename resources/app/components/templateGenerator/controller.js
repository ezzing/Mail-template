(function () {
    'use strict';
    angular.module('mailTemplate').controller('templateGeneratorCtrl', templateGeneratorCtrl);
    templateGeneratorCtrl.$inject = ['$scope', '$http', '$window', '$translate', '$timeout'];
    
    function templateGeneratorCtrl ($scope, $http, $window, $translate, $timeout) {

        // Declaring all scope methods
        $scope.saveTemplate = saveTemplate;
        $scope.validateTemForm = validateTemForm;
        $scope.createTextElement = createTextElement;
        $scope.validateForm = validateForm;
        $scope.deleteItem = deleteItem;
        $scope.onReaded = onReaded;
        $scope.openTinymce = openTinymce;
        $scope.newTemplate = newTemplate;
        $scope.setVariable = setVariable;
        $scope.saveOnEnter = saveOnEnter;
        $scope.updateTemplate = updateTemplate;
        $scope.openSave = openSave;
        $scope.changeLanguage = changeLanguage;

        // Declaring all scope properties
        $scope.variableName = '';
        $scope.texto = [];
        $scope.gridsterCont = 0;
        $scope.gridsterready = false;
        $scope.id = null;
        $scope.saveOrReplace = '#saveTemplate';
        $scope.readMethod = 'readAsDataURL';
        $scope.elementList = [];
        $scope.data = {
            'languages': [
                {'value': 'en', 'name': 'english'},
                {'value': 'es', 'name': 'spanish'}
            ],
            'selectedLanguage': {'value': 'en'}
        };
        $scope.gridsterOpts = {
            'columns': 24,
            'pushing': true,
            'floating': false,
            'swapping': true,
            'width': 'auto',
            'colWidth': 'auto',
            'rowHeight': 50,
            'margins': [10, 10],
            'outerMargin': true,
            'isMobile': false,
            'mobileBreakPoint': 600,
            'mobileModeEnabled': true,
            'minColumns': 1,
            'minRows': 1,
            'maxRows': 100,
            'defaultSizeX': 4,
            'defaultSizeY': 1,
            'minSizeX': 1,
            'maxSizeX': null,
            'minSizeY': 1,
            'maxSizeY': null,
            'resizable': {
                'enabled': true,
                'handles': ['se']
            },
            'draggable': {
                'enabled': false,
                'handle': '.my-class',
                'start': function (event, $element, widget) {
                    // Creates a new property on widget to store initial row
                    widget.initialRow = widget.row;
                },
                'drag': function (event, $element, widget) {
                    // Declares array too store all columns occupied by the clicked widget
                    var columnsOccupied = [widget.col];
                    // Injects occupied columns on the previous array
                    for (var counter = 1;counter <= widget.sizeX;counter++) {
                        columnsOccupied.push(widget.col + counter);
                    }
                    // For each gridster element,  checks if it ocuppies the inmediate row below  to the selected widget
                    angular.forEach($scope.elementList, function (value) {
                        if (value.row === widget.sizeY + widget.row) {
                            // Declares array to store all columns occupied by the widget below the clicked widget
                            var columnsOccupiedByTheBelowOne = [value.col];
                            // Injects occupied columns on the previous array
                            for (var counter = 1;counter < value.sizeX;counter++) {
                                columnsOccupiedByTheBelowOne.push(value.col + counter);
                            }
                            // Checks if any of the elements of array  columnsOccupiedByTheBelowOne is inside columnsOccupied array
                            for (var i = 0;i < columnsOccupiedByTheBelowOne.length;i++) {
                                if ($.inArray(columnsOccupiedByTheBelowOne[i], columnsOccupied) !== -1 && widget.row > widget.initialRow) {
                                    // If that is the case, the widget below our clicked widget is moved to the previous row
                                    value.row -= 1;
                                }
                            }
                        }
                    });
                }
            }
        };
        $scope.tinyMceTextOpts = {
            'selector': '.tinymceWidget',
            'font_formats': 'Andale Mono=andale mono, monospace;Arial=arial,helvetica,sans-serif;Courier New=courier new,courier;Times New Roman=times new roman,times;',
            'force_br_newlines': true,
            'force_p_newlines ': false,
            'forced_root_block': '',
            'inline': true,
            'resize': true,
            'plugins': [
                'link autolink image',
                'textcolor imagetools',
                'colorpicker'
            ],
            'menubar': false,
            'toolbar1': 'fontsizeselect fontselect | alignleft aligncenter alignright alignjustify | subscript superscript ',
            'toolbar2': 'undo redo | bold italic underline forecolor backcolor | mybutton | image  link unlink',
            'setup': function (editor) {
                editor.addButton('mybutton', {
                    'text': 'Variable',
                    'icon': false,
                    'onclick': function () {
                        $('#setVariables').modal('show');
                        $('#variableName').focus();
                    }
                });
            },
            'file_browser_callback': myFileBrowser,
            'fontsize_formats': '8pt 10pt 12pt 14pt 18pt 24pt 36pt 42pt 72pt',
            'imagetools_cors_hosts': ['www.tinymce.com', 'codepen.io']
        };
        $scope.tinyMceImgOpts = {
            'selector': '.imageExample',
            'inline': true,
            'resize': true,
            'plugins': [
                'image',
                'imagetools'
            ],
            'menubar': false,
            'toolbar': 'undo redo | image | alignleft aligncenter alignright',
            'file_browser_callback': myFileBrowser,
            'imagetools_cors_hosts': ['www.tinymce.com', 'codepen.io']
        };


        /**
         * changeLanguage: changes current language
         *
         * @param {string} lang : Selected language
         */
        function changeLanguage (lang) {
            $translate.use(lang.value);
            $scope.data.selectedLanguage.value = lang;
        }
        
        
        /**
         * setVariable : introduces the variable into the selected text
         */
        function setVariable () {
            tinymce.activeEditor.execCommand('mceInsertContent', false, '<span class="variables" style="color: red; background: yellow; font-weight: bold" contenteditable="false">{{' + $scope.variableName + '}}</span>');
            $('#setVariables').modal('hide');
            $scope.variableName = '';
        }


        /**
         * validateForm : validates form displayed when save button is clicked on the toolbar and returns
         * the disability status for saving button.
         *
         * @returns {Boolean} : true if form is invalid and save button must be disabled, false if that is no the case
         */
        function validateTemForm () {
            return $scope.saveTemplateForm.name_template.$invalid ? true : '';
        }


        /**
         * cleanHTML : cleans the HTML code to store it
         *
         * @returns {string} : cleaned html string
         */
        function cleanHTML () {
            // Extract the created template
            var template = document.getElementById('templateGeneratorMain').getElementsByTagName('ul')[0];
            var originalTemplate = document.getElementById('templateGeneratorMain').innerHTML;
            // Extract the lis
            var li = template.getElementsByTagName('li');
            // If exists Li
            if (li.length !== 0) {
                // clean all the lis
                for (var i = 0;i < li.length;i++) {
                    // Change the proporcion of the li to introduce in the database
                    var maxwidth = $('#templateGeneratorMain').width();
                    // Change the width
                    var styles = li[i].getAttribute('style');
                    var start = styles.search('width');
                    var sub = styles.substring(start, start + 17);
                    var end = sub.search('px');
                    var width = sub.substring(7, end);
                    width = Math.round(width * 100 / maxwidth);
                    styles = styles.substring(0, start) + 'width: ' + width + '%' + styles.substring(start + end + 2, styles.length) + 'display: block; position: absolute;';
                    li[i].setAttribute('style', styles);
                    // Change the left position
                    styles = li[i].getAttribute('style');
                    start = styles.search('left');
                    sub = styles.substring(start, start + 16);
                    end = sub.search('px');
                    var left = sub.substring(6, end);
                    left = Math.round(left * 100 / maxwidth);
                    styles = styles.substring(0, start) + 'left: ' + left + '%' + styles.substring(start + end + 2, styles.length);
                    li[i].setAttribute('style', styles);
                    li[i].removeAttribute('gridster-item');
                    li[i].removeAttribute('ng-repeat');
                    li[i].removeAttribute('ng-switch');
                    li[i].removeAttribute('on');
                    li[i].removeAttribute('class');
                    li[i].removeChild(li[i].firstChild);
                    li[i].removeChild(li[i].firstChild);
                    li[i].removeChild(li[i].lastChild);
                    var div = li[i].getElementsByTagName('div')[0];
                    div.removeAttribute('ng-click');
                    div.setAttribute('class', 'tinymceWidget');
                    div.removeAttribute('contenteditable');
                    div.removeAttribute('spellcheck');
                    // if there are divs
                    if (div.getElementsByClassName('widgetContent')[0]) {
                        div.getElementsByClassName('widgetContent')[0].removeAttribute('ng-if');
                    }
                    // If there are a P
                    if (div.getElementsByTagName('p')[0]) {
                        div.getElementsByTagName('p')[0].setAttribute('style', 'margin-top: 20px;');
                    }
                    // If there are a img
                    if (li[i].getElementsByTagName('img')) {
                        var img = li[i].getElementsByTagName('img');
                        for (var z = 0;z < img.length;z++) {
                            if (img[z].getAttribute('class') === null) {
                                var canvas = document.createElement('canvas');
                                var maxwidthli = li[i].offsetWidth;
                                var widthimg = Math.round(img[z].naturalWidth * 100 / maxwidthli);
                                canvas.width = widthimg;
                                canvas.height = img[z].naturalHeight;
                                img[z].removeAttribute('ng-if');
                                canvas.getContext('2d').drawImage(img[z], 0, 0);
                                img[z].setAttribute('src', canvas.toDataURL());
                                li[i].setAttribute('style', li[i].getAttribute('style') + ' overflow: hidden;');
                            }
                            else {
                                img[z].removeAttribute('ng-if');
                                img[z].setAttribute('style', img[z].getAttribute('style') + ' background-size: cover; height: 100%; width: 100%;');
                                img[z].removeAttribute('class');
                            }
                        }
                    }
                    var variables = div.getElementsByClassName('variables');
                    for (var j = 0;j < variables.length;j++) {
                        variables[j].removeAttribute('data-mce-style');
                        variables[j].removeAttribute('style');
                    }
                }
            }
            template = '<ul style="top: 34px; position: absolute; width: 100%; height: 90%;">' + template.innerHTML + '</ul>';
            document.getElementById('templateGeneratorMain').innerHTML = originalTemplate;
            return template;
        }
        
        
        /**
         * saveTemplate : store the template at DataBase
         */
        function saveTemplate () {
            $('#saveTemplate .spin').show();
            // Take a screenshot form the template for the icon
            var screenshot = document.getElementById('templateGeneratorMain');
            html2canvas(screenshot, {
                'onrendered': function (canvas) {
                    // Getting the cleaning HTML
                    var gridster = angular.toJson($scope.elementList);
                    var icon = canvas.toDataURL();
                    var html = cleanHTML();
                    var html_edit = $('#templateGeneratorMain').html();
                    // Getting template data
                    var templateData = {
                        'name_template': $scope.name_template,
                        'icon': icon,
                        'html': html,
                        'html_edit': html_edit,
                        'gridster': gridster
                    };
                    // Parsing js object to string
                    templateData = JSON.stringify(templateData);
                    // Ajax request to sabe new template
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
                            }, function () {
                                // This returns to sendEmail page (previous lines should be removed if this functionality is finally implemented)
                                $window.location.href = '#/mailGenerator';
                            });
                            // Hide the modal
                            $('#saveTemplate').modal('hide');
                            $('saveTemplate .spin').show();
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
                }});
        }
        
        /**
         * readURL : extract the url of the insert image
         *
         * @param input {type} HTML Element
         * @param field_name {type} string
         * @param win {type} window Object
         */
        function readURL (input, field_name, win) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    win.document.getElementById(field_name).value = e.target.result;
                };
                reader.readAsDataURL(input.files[0]);
            }
        }

        /**
         * myFileBrowser: expand the browser file to insert an image
         *
         * @param {string} field_name : field name
         * @param {string} url : url og the img
         * @param {type} type : type
         * @param {type} win  : window Object
         */
        function myFileBrowser (field_name, url, type, win) {
            var elemId = 'img';
            var elem = win.document.getElementById(elemId);
            if (elem && document.createEvent) {
                var evt = document.createEvent('MouseEvents');
                evt.initEvent('click', true, false);
                elem.dispatchEvent(evt);
            }
            $('#' + elemId).change(function () {
                readURL(this, field_name, win);
            });
            win.document.getElementById(field_name).value = 'Without file';
        }
        
        /**
         * createTextElement : creates a new gridster element when a button in the toolbar is clicked. It is used
         * for all buttons, so it receives as an argument which elements needs to be created.
         *
         * @param {type} element
         */
        function createTextElement (element) {
            $scope.elementList.push({
                'type': element,
                'sizeX': 4,
                'sizeY': 1,
                'gridsterId': $scope.gridsterCont,
                'innerBrNodes': 1
            });
            $scope.gridsterCont++;
        }
        
        /**
         * validateForm: validates form displayed when link button is clicked on the toolbar and returns
         * the disability status for sending button.
         *
         * @returns {Boolean}
         */
        function validateForm () {
            if (
                $scope.linkSettingsForm.link.$invalid) {
                return true;
            }
        }
        /**
         * deleteItem: delete a gridster element when trash icon is clicked
         *
         * @param {type} index
         */
        function deleteItem (index) {
            $scope.elementList.splice(index, 1);
        }
        
        /**
         * onReaded: create a gridster img element, in which the image source is used
         * as background.
         *
         * @param {event} e
         * @param {string} file : src of the img
         */
        function onReaded (e, file) {
            $scope.img = e.target.result;
            $scope.file = file;
            $scope.elementList.push({
                'type': 'img',
                'src': $scope.img,
                'sizeX': 1,
                'sizeY': 1,
                'gridsterId': $scope.gridsterCont
            });
            $('#askForImg').modal('hide');
        }
        
        
        /**
         *  openTinymce: opens tinymce menu when a gridster widget is clicked
         *   It also selects default text to change it
         *
         *   @param {event} event :manage event
         */
        function openTinymce (event) {
            var selection = $window.getSelection();
            var range = document.createRange();
            var parent = $(event.target).parent();
            
            if (!$(event.target).parent('.tinymceContainer').hasClass('tinymceWidget')) {
                // This creates a tinymcewidget on widget clicked
                $(event.target).parent('.tinymceContainer').addClass('tinymceWidget');
                tinymce.init($scope.tinyMceTextOpts);
                tinymce.activeEditor.focus();
                range.selectNodeContents(parent.children().get(0));
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
        
        
        /**
         * newTemplate: restart the edition of the template
         */
        function newTemplate () {
            $("#templateGeneratorMain ul li").remove();
            $scope.elementList = [];
            $scope.gridsterCont = 0;
        }


        /**
         * saveOnEnter: saves a new template when enter is pressed on modal window, and form is validated
         */
        function saveOnEnter (event) {
            if (event.keyCode === 13 &&
                 $('#saveTemplate .btn-success').is(':enabled')) {
                $scope.saveTemplate();
            }
        }
        
        
        /**
         * Focus the first input on the modal window when a modal is open
         */
        $('#setVariables, #saveTemplate').on('shown.bs.modal', function () {
            $('input:text:visible:first', this).focus();
        });


        /**
         * editGridster : get the template to edit it
         */
        function editGridster () {
            $http.get('getTemplateToEdit/' + $scope.id).then(function (response) {
                var html = response.data[0].html_edit;
                var gridster = angular.fromJson(response.data[0].gridster);
                $scope.gridsterCont = gridster[gridster.length - 1].gridsterId + 1;
                for (var i = 0;i < gridster.length;i++) {
                    $scope.elementList.push(gridster[i]);
                }
                html = $(html);
                var pos = null;
                for (var i = 0;i < html[4].getElementsByTagName('li').length;i++) {
                    if (html[4].getElementsByTagName('li')[i].getElementsByTagName('img').length === 0) {
                        pos = html[4].getElementsByTagName('li')[i].getAttribute('data-gridsterid');
                        $scope.texto[pos] = html[4].getElementsByTagName('li')[i].getElementsByTagName('div')[0].getElementsByClassName('widgetContent ng-scope')[0].innerHTML;
                    }
                }
                $timeout(function () {
                    editHtml();
                });
            });
        }


        /**
         * editHTML : introduce the text into the gridster elements
         */
        function editHtml () {
            for (var i = 0;i < $scope.texto.length;i++) {
                if ($scope.texto[i] != null && $scope.gridsterready == true) {
                    var route = "#templateGeneratorMain ul li[data-gridsterid='" + i + "'] div.tinymceContainer .widgetContent";
                    $(route).html($scope.texto[i]);
                }
            }
        }


        /**
         * chargeEditTemplate: evaluate if the edit bottom has been clicked on Mail Generator
         */
        function chargeEditTemplate () {
            var paramstr = window.location.hash;
            var paramarr = paramstr.split('&');
            var params = {};
            // Extract the variable
            for (var i = 0;i < paramarr.length;i++) {
                var tmparr = paramarr[i].split('=');
                params[tmparr[0]] = tmparr[1];
            }
            // If the id is define, introduce the template to edit it
            if (params['#/templateGenerator?id']) {
                $scope.id = params['#/templateGenerator?id'];
                $scope.saveOrReplace = '#replaceTemplate';
                $scope.gridsterready = true;
                editGridster();
            }
        }
        // Execute the function chargeEditTemplate
        chargeEditTemplate();
        
        
        
        /**
         * updateTemplate: update the template that has been edited
         */
        function updateTemplate () {
            $('#replaceTemplate .spin').show();
            // Take a screenshot form the template for the icon
            var screenshot = document.getElementById('templateGeneratorMain');
            html2canvas(screenshot, {
                'onrendered': function (canvas) {
                    // Getting the cleaning HTML
                    var gridster = angular.toJson($scope.elementList);
                    var icon = canvas.toDataURL();
                    var html = cleanHTML();
                    var html_edit = $('#templateGeneratorMain').html();
                    // Getting template data
                    var templateData = {
                        'id': $scope.id,
                        'icon': icon,
                        'html': html,
                        'html_edit': html_edit,
                        'gridster': gridster
                    };
                    // Parsing js object to string
                    templateData = JSON.stringify(templateData);
                    // Ajax request to sabe new template
                    $http.post('updateTemplate', {
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
                                'text': 'Your template have been updated!',
                                'type': 'success',
                                'confirmButtomText': 'cool'
                            }, function () {
                                // This returns to sendEmail page (previous lines should be removed if this functionality is finally implemented)
                                $window.location.href = '#/mailGenerator';
                            });
                            // Hide the modal
                            $('#replaceTemplate').modal('hide');
                            $('#replaceTemplate .spin').hide();
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
                }});
        }


        /**
         * openSave : open modal window saveTemplate
         */
        function openSave () {
            $('#saveTemplate').modal('show');
        }

        /**
         * Resize Toolbar when template is resize
         */
        $('#templateGeneratorMain').resize(function () {
            $('#templateGeneratorToolbar').css({'height': $('#templateGeneratorMain').height()});
        });
        // Able scroll
        $('body').css('overflow-y', 'scroll');
    }
})();
