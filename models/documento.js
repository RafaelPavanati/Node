const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _model = new Schema({
    carro: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'carros'
    },
    exercicio: {
        type: Number,
        required: true
    },
    pago: {
        type: Boolean
    }
    ,
    valor: {
        type: Number
    }
});

mongoose.model('documentos', _model);