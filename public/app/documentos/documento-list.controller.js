angular.module('app')
    .controller('DocumentoListController', DocumentoListController);

DocumentoListController.$inject = ['$scope', 'DocumentoService'];

function DocumentoListController($scope, DocumentoService) {
    var vm = this;
    vm.clientes = [];
    vm.service = DocumentoService;
    vm.cols = ['codigo_veiculo', 'exercicio', 'valor', 'pago'];
    vm.parans = ['carro', 'exercicio', 'valor', 'pago'];


    vm.excluir = function (id) {
        if (confirm('Deseja realmente excluir?')) {
            CarrosService.remove(id)
                .then(function () {
                    $scope.$broadcast('update', [])
                });
        }
    }
}