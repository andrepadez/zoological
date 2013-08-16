var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.schema = {
    referencia: {
        type: Number,
        unique: true
    },
    data_levantamento: String,
    proprietario: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    titulo: String,
    tipo: String,
    ano_construcao: Number,
    sinopse: String,
    rating: Number,
    comodidades: {},
    morada: {
        gps: {
            lon: String,
            lat: String
        },
        cp4: String,
        cp3: String,
        rua: String,
        num: String,
        andar: String,
        localidade: String,
        cidade: String
    },
    descricao: {
        area_bruta: String,
        area_util: String,
        remodelada: Boolean,
        remodelada_ano: Number,
        pe_direito: String,
        portas_facil_acesso: Boolean,
        utilizacao_electricidade: Boolean,
        utilizacao_electricidade_obs: String,
        utilizacao_agua: Boolean,
        utilizacao_agua_obs: String,
        utilizacao_wc: Boolean,
        utilizacao_wc_obs: String
    },
    possibilidade: {
        dia: Boolean,
        dia_obs: String,
        noite: Boolean,
        noite_obs: String,
        interior: Boolean,
        interior_obs: String,
        exterior: Boolean,
        exterior_obs: String,
        forfait: Boolean,
        forfait_obs: String,
        obs: String
    },
    acessibilidades: {
        autoestrada: {
            nome: String,
            distancia: String
        },
        hotel: {
            nome: String,
            distancia: String,
            telefone: String,
            morada: String
        },
        farmacia: {
            nome: String,
            distancia: String,
            telefone: String,
            morada: String
        },
        restaurante: {
            nome: String,
            distancia: String,
            telefone: String,
            morada: String
        },
        existe_raio: String,
        itinerario: String
    },
    elementos_descaracterizadores: {
        type: String
    },
    sound_friendly: String,
    normalized: {
        titulo: String, 
        tipo: String,
        morada: {
            cidade: String, 
            localidade: String
        }
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

exports.model = mongoose.model('Location', schema);