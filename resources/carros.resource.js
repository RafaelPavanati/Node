const mongoose = require('mongoose');
const clienteModel = mongoose.model('carros');

module.exports = function (app) {
    app.get('/carros', function (req, resp) {
        var perPage = req.query.limit ? req.query.limit : null;
        var page = req.query.offset ? req.query.offset : null;
        var skip = perPage != null ? perPage * (page - 1) : null;

        clienteModel.find()
            .limit(15)
            .skip(skip)
            .exec(
                function (err, data) {
                    clienteModel.count().exec(function (err, count) {
                            var retorno = {
                                content: data
                                , offset: perPage * page
                                , total: count
                            };
                            resp.status(200).send(retorno)
                        }
                        ,
                        function (err) {
                            resp.status(500).send(err);
                        }
                    );
                })
    })
    app.post('/carros', function (req, resp) {
        clienteModel.create(req.body)
            .then(
                function (data) {
                    resp.status(201).send(data);
                },
                function (err) {
                    resp.status(500).send(err);
                }
            );
    });
    app.get('/carros/:id', function (req, resp) {
        clienteModel.findById(req.params.id)
            .then(
                function (data) {
                    if (!data) {
                        resp.status(404).send();
                    } else {
                        resp.status(200).send(data);
                    }
                },
                function (err) {
                    resp.status(500).send(err);
                }
            );
    });
    app.put('/carros/:id', function (req, resp) {
        clienteModel.findOneAndUpdate({'_id': req.params.id}, req.body)
            .then(
                function (data) {
                    if (!data) {
                        resp.status(404).send();
                    } else {
                        resp.status(200).send(data);
                    }
                },
                function (err) {
                    resp.status(500).send(err);
                }
            );
    });
    app.delete('/carros/:id', function (req, resp) {
        clienteModel.deleteOne({'_id': req.params.id})
            .then(
                function () {
                    resp.status(204).send();
                },
                function (err) {
                    resp.status(500).send(err);
                }
            );
    });
}