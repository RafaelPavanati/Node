angular.module('app')
    .service('CarrosService', CarrosService);

CarrosService.$inject = ['$http']

function CarrosService($http) {
    var URL = '/carros';

    var service = this;
    service.getAll = function () {
        return $http.get(URL)
            .then(function (resp) {
                return resp;
            });
    };

    service.getList = function (filter, page) {
        return $http.get(URL + '?' + 'filter=' + filter + '&limit=' + page.size + '&offset=' + page.number)
            .then(function (resp) {
                return resp;
            });
    };

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

    service.insert = function (carro) {
        return $http.post(URL, carro)
            .then(function (resp) {
                return resp.data;
            });
    }

}