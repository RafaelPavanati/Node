angular.module('app')
    .controller('CarrosListController', CarrosListController);

CarrosListController.$inject = ['$scope', 'CarrosService'];

function CarrosListController($scope, CarrosService) {
    var vm = this;
    vm.clientes = [];
    vm.service = CarrosService;
    vm.cols = ['Código Veiculo', 'Marca', 'Modelo', 'Ano', 'Km', 'Placa', 'Valor'];
    vm.parans = ['_id', 'marca', 'modelo', 'ano', 'km', 'placa', 'valor'];


    vm.excluir = function (id) {
        if (confirm('Deseja realmente excluir?')) {
            CarrosService.remove(id)
                .then(function () {
                    $scope.$broadcast('update', [])
                });
        }
    }
}