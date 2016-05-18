/**
 * Autor= Ruben Rodríguez Fernández
 * Fecha= 13/05/16
 * Licencia= gpl30
 * Version= 1.0
 * Descripcion=
 * */
/*
 * Copyright (C) 2016 Rubén Rodríguez Fernández
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

describe('mailGeneratorController', function () {
    beforeEach(function () {
        module('mailTemplate');
    });

    var controller = null;
    var $scope = null;
    var mailJSON = mockedMailJSON;
    var languageJSON = mockedLanguageJSON;

    beforeEach(inject(function ($controller, $rootScope) {
        $scope = $rootScope.$new();
        controller = $controller('mailGeneratorCtrl', {
            $scope: $scope
        });
    }));

    /**
    it('When we select a template, it must be show on the screen', function () {
        var response = mailJSON;
        var selectedTemplate = '1';
        var template = response.data.templates;
        $scope.loadTemplate(selectedTemplate);
        //element(by.id('ggg')).getText()
        expect($("#actualTemplate").html()).toBe(template);
    });
     */

    /**
    it('When we select a language, language value must change', function () {
        var response = languageJSON;
        var selectedLanguage = 'es';
        var language = response.data.templates;
        $scope.loadTemplate(selectedLanguage);
        //element(by.id('ggg')).getText()
        expect($("#actualTemplate").html()).toBe(template);
    });
     */

    
    

    /**
    it('When we add a pattern for the selected country which is already in the patterns list, it mustnt be added', function () {
        var response = leadsJSON;
        var newPattern = 't1';
        var theSamePattern = 't1';
        $scope.criteria_data = response.data.criteria_data;
        $scope.addPattern(newPattern);
        $scope.addPattern(theSamePattern);
        expect($scope.currentCountry.zipcode_patterns.length).toBe(1);
    });

    it('When we change the country, the zipcodes musth change from the last selected.', function () {
        var response = leadsJSON;
        // Con estas asignaciones de $scope simulamos el comportamiento de getCurrentCriteriaState()
        $scope.installers = response.data.installers;
        $scope.criteria_data = response.data.criteria_data;
        $scope.criteria = response.data.criteria;
        $scope.currentCountry.assignments = response.data.criteria_data.UK.assignments;
        $scope.currentCountry.zipcode_patterns = response.data.criteria_data.UK.zipcode_patterns;
        // Tras estar seleccionado por defecto UK, seleccionamos ahora España
        $scope.getCountrySelected('ES');
        // Se comprueba que hayan cambiado las asignaciones.
        expect($scope.currentCountry.assignments).toBe(response.data.criteria_data.ES.assignments);
        expect($scope.currentCountry.zipcode_patterns).toBe(response.data.criteria_data.ES.zipcode_patterns);
    });

    it('When we change the installer and change the ZIP below, it must be changed below patterns.', function () {
        var response = leadsJSON;
        var installer;
        var patternsSize;
        // Simulamos getCurrentCriteriaState()
        $scope.installers = response.data.installers;
        $scope.criteria_data = response.data.criteria_data;
        $scope.criteria = response.data.criteria;
        $scope.currentCountry.assignments = response.data.criteria_data.UK.assignments;
        $scope.currentCountry.zipcode_patterns = response.data.criteria_data.UK.zipcode_patterns;
        // Obtenemos el primer instalador de la lista y lo seleccionamos. Necesario crearnos variable installer.current en el scope.
        $scope.installer.current = response.data.installers[0];
        installer = $scope.installer.current;
        expect(installer.id).toBe(3);
        $scope.clientSelected(installer);
        expect($scope.installer.current.assignments).toBeDefined();
        // Seleccionamos un patrón de los que aparece
        patternsSize = $scope.criteria_data.UK.assignments[0].patterns.length;
        $scope.selectPattern('UK3');
        // Esperamos que la nueva lista de asignaciones contenga también a UK3
        expect($scope.criteria_data.UK.assignments[0].patterns.length).toBe(patternsSize + 1);
        expect($scope.criteria_data.UK.assignments[0].patterns).toContain('UK3');
    });
     */
});
