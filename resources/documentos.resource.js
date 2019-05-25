const mongoose = require('mongoose');
const docModel = mongoose.model('documentos');

module.exports = function (app) {
    app.get('/documentos', function (req, resp) {
        var perPage = req.query.limit;
        var page = req.query.offset
        var skip = perPage * (page - 1)

        docModel.find()
            .limit(15)
            .skip(skip)
            .exec(
                function (err, data) {
                    docModel.count().exec(function (err, count) {
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
    app.post('/documentos', function (req, resp) {
        docModel.create(req.body)
            .then(
                function (data) {
                    resp.status(201).send(data);
                },
                function (err) {
                    resp.status(500).send(err);
                }
            );
    });
    app.get('/documentos/:id', function (req, resp) {
        docModel.findById(req.params.id)
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
    app.put('/documentos/:id', function (req, resp) {
        docModel.findOneAndUpdate({'_id': req.params.id}, req.body)
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
    app.delete('/documentos/:id', function (req, resp) {
        docModel.deleteOne({'_id': req.params.id})
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