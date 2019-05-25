angular.module('app')
    .controller('DocumentoFormController', DocumentoFormController);

DocumentoFormController.$inject = ['DocumentoService',
    '$stateParams',
    '$state', 'CarrosService'];

function DocumentoFormController(DocumentoService, $stateParams, $state, CarrosService) {
    var vm = this;
    vm.carros = [];
    vm.documento = {};
    vm.carrosService = CarrosService;
    vm.service = DocumentoService;
    vm.save = save;


    vm.carrosService.getAll().then(function (data) {
        if (data.data.content && data.data.content.length > 0) {
            vm.carros = data.data.content;
            console.log(vm.carros)
        }
    });


    if ($stateParams.id) {
        vm.service.findOne($stateParams.id)
            .then(function (data) {
                vm.documento = data;
            });
    }

    function save(documento) {
        if ($stateParams.id) {
            vm.service
                .update($stateParams.id, documento)
                .then(function () {
                    $state.go('DocumentoList');
                });
        } else {
            vm.service
                .insert(documento)
                .then(function () {
                    $state.go('DocumentoList');
                });
        }
    }
}