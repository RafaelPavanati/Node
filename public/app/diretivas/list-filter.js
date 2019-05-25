angular.module('app')
    .directive('listFilter', listFilter);

listFilter.$inject = [];

function listFilter() {
    var controller = ['$scope', function ($scope) {
        var vm = this;
        vm.page = {
            number: 1,
            size: '15'
        };
        vm.isOpen = false;
        vm.filtros = [];
        vm.filtro = vm.filtros[0] ? vm.filtros[0] : '';
        vm.cols = $scope.cols;
        vm.service = $scope.service;
        vm.parans = $scope.parans;
        vm.readonly = vm.filtros.length > 0;

        function load() {
            vm.service.getList(vm.filtro, vm.page)
                .then(function (data) {
                    vm.data = data.data;
                    vm.list = data.data.content;
                });

        }

        $scope.$watch('vm.page', function (newVal) {
            if (newVal === undefined) {
                vm.service.getList(vm.filtro, vm.page)
                    .then(function (data) {
                        console.log(data)
                        vm.data = data.data;
                        vm.list = data.data.content;
                    });
            } else {
                vm.service.getList(vm.filtro, newVal)
                    .then(function (data) {
                        vm.data = data.data;
                        vm.list = data.data.content;
                    })
            }
        }, true);

        $scope.$on("update", function () {
            load();
        });

        $scope.$watch('vm.filtros', function (newVal) {
            if (newVal[0] === undefined) {
                vm.filtro = '';
                vm.service.getList('', vm.page)
                    .then(function (data) {
                        vm.data = data.data;
                        vm.list = data.data.content
                    });
            } else {
                vm.filtro = newVal[0];
                vm.service.getList(newVal[0], vm.page)
                    .then(function (data) {
                        vm.data = data.data;
                        vm.list = data.data.content
                    })
            }
        }, true);

        load();
    }];
    return {
        restrict: 'E',
        templateUrl: 'diretivas/list-filter.html',
        controller: controller,
        controllerAs: 'vm',
        transclude: {
            'button': 'button',
            'actions' : 'actions'
        },
        scope: {
            service: '=',
            cols: '=',
            parans: '=',
            refresh: '='
        },
    };
}
