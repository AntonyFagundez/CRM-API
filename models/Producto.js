const moongoose = require('mongoose');

const ProductoSchema = moongoose.Schema({
    nombre : {
        type: String,
        required: true,
        trim: true
    },
    existencia: {
        type: Number,
        required: true,
        trim: true
    },
    precio :{
        type: Number,
        required: true,
        trim: true
    },
    createdOn : {
        type: Date,
        default: Date.now()
    }
});

module.exports = moongoose.model('Producto', ProductoSchema);