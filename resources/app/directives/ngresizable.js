(function () {
    angular.module('mailTemplate').directive('ngResizable', function () {
        return {
            'restrict': 'A',
            'link': function ($scope, element) {
                // Check fi some new node is inserted
                $(element).bind('DOMNodeInserted', function (e) {

                    // Check if new node is a br tag
                    if ($(e.target)[0].tagName === 'BR') {
                        
                        // Get id of li node where gridster is implemented
                        var gridsterId = $(element).parent('li').attr('data-gridsterId');

                        // Get gridster element needed to change its sizeY
                        var gridsterElement = $scope.elementList[gridsterId];
                        
                        // Get actual number of br children in element
                        var actualBrNodes = $(element).children().first().children('br').length;
                        
                        // Save new br count
                        gridsterElement.innerBrNodes = actualBrNodes;
                        
                        // Get tinymce height
                        var tinymceHeight = $(element).children().first().height();
                        
                        // Get gridster height
                        var gridsterHeight = $(element).parent('li').height();
                        
                        // Check if tinymce height is bigger than gridster height
                        if (tinymceHeight > gridsterHeight + 10) {
                            console.log('ITS INCREASED--> tinymce height: ' + tinymceHeight + ' gridster height: ' + gridsterHeight);

                            // Increase gridster rows until its smaller or equal to tinymce height
                            var diff = Math.ceil((tinymceHeight - gridsterHeight) / 100);

                           // Refresh $scope to apply new size changes
                            $scope.$apply(function () {
                                gridsterElement.sizeY += diff;
                                console.log('new height: ' + gridsterElement.sizeY);
                            });
                        }
                        else {
                            console.log('ITS NOT INCREASED--> tinymce height: ' + tinymceHeight + 'gridster height: ' + gridsterHeight);
                        }
                    }
                });
                
                 // Check if some node is removed
                element.bind('keydown', function (event) {
              // Check if back key is enter
                    if (event.keyCode === 8) {

                        // Get actual number of br children in element
                        var actualBrNodes = $(element).children().first().children('br').length;
                        
                        // Get previus saved number of br elements
                        var lastBrCheck =  $(element).parent('li').attr('data-innerBrNodes');
                        
                        // Compare it with previus saved number of br elements
                        if (actualBrNodes < lastBrCheck) {
                            
                            // Get id of li node where gridster is implemented
                            var gridsterId = $(element).parent('li').attr('data-gridsterId');
                            
                            // Get gridster element we need to change its sizeY
                            var gridsterElement = $scope.elementList[gridsterId];
                            
                            // Save new br count
                            gridsterElement.innerBrNodes = actualBrNodes;
                            
                            // Get the tinymce height
                            var tinymceHeight = $(element).children().first().height();

                            // Get gridster height
                            var gridsterHeight = $(element).parent('li').height();
                            
                            // Check if lost br implies an enough decresment of tinymce height
                            if (tinymceHeight + 40 < gridsterHeight) {
                                console.log('IT IS DECREASED--> tinymce: ' + tinymceHeight + ' gridster: ' + gridsterHeight);

                                 // Get id of li node where gridster is implemented
                                var gridsterId = $(element).parent('li').attr('data-gridsterId');

                                 // Get gridster element we need to change its sizeY
                                var gridsterElement = $scope.elementList[gridsterId];

                                 // Refresh $scope to apply new size changes
                                $scope.$apply(function () {
                                    gridsterElement.sizeY -= 1;
                                    console.log('new height: ' + gridsterElement.sizeY);
                                });
                            }
                             
                            else {
                                console.log('IT IS NOT DECREASED--> tinymce: ' + tinymceHeight + ' gridster: ' + gridsterHeight);
                            }
                            
                        }
                        // This resolves the bug that causes to remove h1/h2/h3/p tags
                        if ($(element).children().first().html() === '<br>') {
                            $(element).children().first().html('&nbsp');
                        }
                    }
                });
            }
        };
    });
})();
