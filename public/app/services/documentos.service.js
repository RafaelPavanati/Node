angular.module('app')
    .service('DocumentoService', DocumentoService);

DocumentoService.$inject = ['$http']

function DocumentoService($http) {
    var URL = '/documentos';

    var service = this;

    service.getList = function (filter, page) {
        return $http.get(URL + '?' + 'filter=' + filter + '&limit=' + page.size + '&offset=' + page.number)
            .then(function (resp) {
                return resp;
            });
    }

    service.findOne = function (id) {
        return $http.get(URL + '/' + id)
            .then(function (resp) {
                return resp.data;
            });
    }

    service.update = function (id, carro) {
        return $http.put(URL + '/' + id, carro)
            .then(function (resp) {
                return resp.data;
            });
    }

    service.remove = function (id) {
        return $http.delete(URL + '/' + id);
    }

    service.insert = function (doc) {
        return $http.post(URL, doc)
            .then(function (resp) {
                return resp.data;
            });
    }

}