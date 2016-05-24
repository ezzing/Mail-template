/**
 * Created by Rubén Rodríguez Fernández on 17/05/16.
 */

describe('mailGeneratorCtrl', function () {
    beforeEach(function () {
        module('mailTemplate');
    });

    var controller = null;
    var $scope = null;
    var $translate = null;
    var allTemplatesJSON = mockedAllTemplatesJSON;
    var templateJSON = mockedTempJSON;

    beforeEach(inject(function ($controller, $rootScope, $translate) {
        $scope = $rootScope.$new();
        $translate = $translate.use();
        controller = $controller('mailGeneratorCtrl', {
            $scope: $scope,
            $translate: $translate
        });
    }));

    it('When we select a language, language value must change', function () {
        // Test Spanish
        var selectedLanguage = 'es';
        $scope.changeLanguage(selectedLanguage);
        expect($translate).toBe(selectedLanguage);
        // Test English
        var selectedLanguage = 'en';
        $scope.changeLanguage(selectedLanguage);
        expect($scope.data.selectedLanguage.value).toBe(selectedLanguage);
    });

    it('When we select a template, variables will be charge', inject(function ($sce) {
        var response = templateJSON;
        $scope.actualTemplate = response.templates;
        $scope.loadVariables(response.templates);
        expect($scope.templateVariables[0][0]).toBe('name1');
        expect($scope.templateVariables[1][0]).toBe('surname1');
        expect($scope.templateVariables[2][0]).toBe('email1');
    }));

    it('When we select a template, it must be show on the screen', function () {
        var response = allTemplatesJSON;
        var selectedTemplate = '1';
        $scope.loadTemplate(selectedTemplate);
        expect($scope.selectedTemplate).toBe(selectedTemplate);
        expect(response.templates[selectedTemplate]).toBe(response.templates[$scope.selectedTemplate]);
    });
});
