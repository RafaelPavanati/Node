const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _model = new Schema({
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    ano: {
        type: Number,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    km: {
        type: Number,
        required: true
    },
    placa: {
        type: String,
        required: true
    },
    vendido: {
        type: Boolean
    }
});

mongoose.model('carros', _model);