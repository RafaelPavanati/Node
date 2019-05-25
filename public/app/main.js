angular.module('app', [
    'ui.router'
]);

angular.module('app').config(ConfigMain);

function ConfigMain($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/cars");
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
    $stateProvider
        .state({
            name: 'CarrosList',
            url: '/cars',
            templateUrl: 'carros/carros-list.html',
            controller: 'CarrosListController',
            controllerAs: 'vm'
        })
        .state({
            name: 'CarrosForm',
            url: '/car/:id',
            templateUrl: 'carros/carros-form.html',
            controller: 'CarrosFormController',
            controllerAs: 'vm'
        })
        .state({
            name: 'DocumentoList',
            url: '/doc',
            templateUrl: 'documentos/documento-list.html',
            controller: 'DocumentoListController',
            controllerAs: 'vm'
        })
        .state({
            name: 'DocumentoForm',
            url: '/doc/:id',
            templateUrl: 'documentos/documento-form.html',
            controller: 'DocumentoFormController',
            controllerAs: 'vm'
        })

}