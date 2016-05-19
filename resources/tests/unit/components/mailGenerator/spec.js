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

describe('mailGeneratorCtrl', function () {
    beforeEach(function () {
        module('mailTemplate');
    });

    var controller = null;
    var $scope = null;
    var $urlRouterProvider = null;
    var mailJSON = mockedMailJSON;
    var languageJSON = mockedLanguageJSON;

    beforeEach(inject(function ($controller, $rootScope) {
        $scope = $rootScope.$new();
        controller = $controller('mailGeneratorCtrl', {
            $scope: $scope
        });
        $controller('URLConfig', {
            $urlRouterProvider: $urlRouterProvider
        });
    }));

    it('When we select a template, variables will be charge', function () {
        $urlRouterProvider.otherwise('/mailGenerator');
        var response = mailJSON;
        var selectedTemplate = '1';
        $scope.loadTemplate(selectedTemplate);
        expect($scope.templateVariables[0]).toBe('name1');
        expect($scope.templateVariables[1]).toBe('surname1');
        expect($scope.templateVariables[2]).toBe('email1');
    });

    /**
    it('When we select a template, it must be show on the screen', function () {
        var response = mailJSON;
        var selectedTemplate = '1';
        var template = response.data.templates;
        $scope.loadTemplate(selectedTemplate);
        expect($scope.actualTemplate).toBe(template);
    });
     */

    /**
     it('When we send an email, ....an email', function () {
         $scope.email = "ejemplo@ejemplo.com";
         $scope.subject = "Subject";
         $scope.sendEmail();
         expect($scope.email).toBeUndefined();
         expect($scope.subject).toBeUndefined();
    });
     */
     /**
    it('When we select a language, language value must change', function () {
        var response = languageJSON;
        var selectedLanguage = 'es';
        var language = response.data.templates;
        $scope.loadTemplate(selectedLanguage);
        expect($("#actualTemplate").html()).toBe(template);
    });
      */
});
