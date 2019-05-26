angular.module('app')
    .controller('CarrosFormController', CarrosFormController);

CarrosFormController.$inject = ['CarrosService',
    '$stateParams',
    '$state'];

function CarrosFormController(CarrosService, $stateParams, $state) {
    var vm = this;
    vm.carro = {};
    vm.service = CarrosService;
    vm.save = save;
    if ($stateParams.id) {
        CarrosService.findOne($stateParams.id)
            .then(function (data) {
                vm.carro = data;
            }).catch(function (data) {
            alert('Carro já removido da garagem!')
            $state.go('DocumentoList');

        });
    }


    function save(carro) {
        if ($stateParams.id) {
            vm.service
                .update($stateParams.id, carro)
                .then(function () {
                    $state.go('CarrosList');
                });
        } else {
            vm.service
                .insert(carro)
                .then(function () {
                    $state.go('CarrosList');
                });
        }
    }

}