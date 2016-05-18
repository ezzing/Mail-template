/**
 * Created by Rubén Rodríguez Fernández on 17/05/16.
 */
describe('templateGeneratorController', function () {
    beforeEach(function () {
        module('Mail-Template', 'datatables', 'toaster', 'ngDialog');
    });

    var controller = null;
    var $scope = null;
    var _DTOptionsBuilder;
    var _DTColumnDefBuilder;
    var templateJSON = mockedTemplateJSON;

    beforeEach(inject(function ($controller, $rootScope, DTOptionsBuilder, DTColumnDefBuilder) {
        $scope = $rootScope.$new();
        _DTOptionsBuilder = DTOptionsBuilder;
        _DTColumnDefBuilder = DTColumnDefBuilder;
        controller = $controller('templateGeneratorController', {
            $scope: $scope,
            DTOptionsBuilder: _DTOptionsBuilder,
            DTColumnDefBuilder: _DTColumnDefBuilder
        });
    }));

    it('When we click on h1 botton, a h1 element will be create', function () {
        $scope.createTextElement("h1");
        var gridsterId = $scope.gridsterCont;
        expect($scope.currentCountry.zipcode_patterns.length).toBe(1);
    });

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
