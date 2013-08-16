var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.schema = {
    tipo: String,
    nome: String,
    email: String,
    password: String,
    telemovel: String,
    contacto2: String,
    nif: Number,
    obs: String,
    search: {
        tipo: String,
        nome: String,
        email: String
    },
    locations: [],
    normalized: {
        nome: String
    }
};

exports.config = {
    permissions: {
        GET: 100,
        POST: 10,
        PUT: 10,
        DEL: 10
    }
};

var schema = new mongoose.Schema(exports.schema);

exports.model = mongoose.model('User', schema);