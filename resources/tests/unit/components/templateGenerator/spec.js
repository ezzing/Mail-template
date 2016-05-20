/**
 * Created by Rubén Rodríguez Fernández on 17/05/16.
 */
describe('templateGeneratorCtrl', function () {
    beforeEach(function () {
        module('mailTemplate');
    });

    var controller = null;
    var $scope = null;
    var templateJSON = mockedTemplateJSON;

    beforeEach(inject(function ($controller, $rootScope) {
        $scope = $rootScope.$new();
        controller = $controller('templateGeneratorCtrl', {
            $scope: $scope
        });
    }));

    it('When we create an element, a new element will be create', function () {
        // Create some elements in the template
        var gridsterType1 = "h1";
        $scope.createTextElement(gridsterType1);
        var gridsterType2 = "h2";
        $scope.createTextElement(gridsterType2);
        var gridsterType3 = "h3";
        $scope.createTextElement(gridsterType3);
        var gridsterTypeP = "p";
        $scope.createTextElement(gridsterTypeP);
        expect($scope.elementList[0].gridsterId).toBe(0);
        expect($scope.elementList[0].type).toBe(gridsterType1);
        expect($scope.elementList[1].gridsterId).toBe(1);
        expect($scope.elementList[1].type).toBe(gridsterType2);
        expect($scope.elementList[2].gridsterId).toBe(2);
        expect($scope.elementList[2].type).toBe(gridsterType3);
        expect($scope.elementList[3].gridsterId).toBe(3);
        expect($scope.elementList[3].type).toBe(gridsterTypeP);
    });

    it('When we click on delete Template botton, actual template will be delete', function () {
        // Create some elements in the template
        var gridsterType1 = "h1";
        $scope.createTextElement(gridsterType1);
        var gridsterType2 = "h2";
        $scope.createTextElement(gridsterType2);
        var gridsterType3 = "h3";
        $scope.createTextElement(gridsterType3);
        var gridsterTypeP = "p";
        $scope.createTextElement(gridsterTypeP);
        $scope.newTemplate();
        expect($scope.elementList.length).toBe(0);
        expect($scope.gridsterCont).toBe(0);
    });

    it('When we select a language, language value must change', function () {
        // Test Spanish
        var selectedLanguage = 'es';
        $scope.changeLanguage(selectedLanguage);
        expect($scope.data.selectedLanguage.value).toBe(selectedLanguage);
        // Test English
        var selectedLanguage = 'en';
        $scope.changeLanguage(selectedLanguage);
        expect($scope.data.selectedLanguage.value).toBe(selectedLanguage);
    });
});
