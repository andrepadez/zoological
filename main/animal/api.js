var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var express = require('express');
var app = module.exports = express();
var api = module.exports.api = {};
var normalizer = require('normalizer');

var Location = require('./model').model;
var User = require('../users/model').model;


api.find = function(filter, sort, skip, limit){
    var callback = arguments[arguments.length - 1];
    filter = normalizer.treatFilter(filter, Location);
    sort = normalizer.treatSort(sort, Location);
    if(callback && typeof callback === 'function'){
        Location.find(filter).sort(sort).skip(skip).limit(limit).populate('proprietario').populate('account').exec(function(err, locations) {
            if(callback && typeof callback === 'function'){
                callback(err, locations);
            }
        });
    }
};

api.findOne = function(filter){console.log('filter', filter);
    var callback = arguments[arguments.length - 1];
    if(callback && typeof callback === 'function'){
        Location.findOne(filter).populate('proprietario').populate('account').exec(function(err, location){
            console.log('api', location);
            callback(err, location);
        });
    }
};

api.getNew = function(){
    var location = new Location();
    location.referencia = latestReferencia;
    location.data_levantamento = _getDate();
    return location;
};

api.create = function(body){
    var callback = arguments[arguments.length - 1];
    body.proprietario = ObjectId(body.proprietario);
    body.account = ObjectId(body.account);
    normalizer.normalizeSearchFields(body, Location);
    var location = new Location(body);
    location.save(function(err){
        if(callback && typeof callback === 'function'){
            latestReferencia++;
            callback(err, location);
        }
    });
};

api.update = function(body){
    var referencia = body.referencia;
    var callback = arguments[arguments.length - 1];
    delete body._id;
    body.proprietario = ObjectId(body.proprietario);
    body.account = ObjectId(body.account);
    normalizer.normalizeSearchFields(body, Location);
    Location.update({referencia: referencia}, body, function(err, count){
        if(callback && typeof callback === 'function'){
            latestReferencia++;
            callback(err, count);
        }
    });
};

api.destroy = function(referencia){
    var callback = arguments[arguments.length - 1];
    Location.findOne({referencia: referencia}, function(err, location){
        if(location){
            location.remove();
        }
        if(callback && typeof callback === 'function'){
            callback(err);
        }
    });
};

var rest = {
	list: function(req, res){
		api.find(function(err, locations){
			res.send(locations);
		});
	},
    filter: function(req, res){
        var limit = req.body.limit || 20;
        api.find(req.body.filter, req.body.sort, req.body.skip, limit, function(err, locations){
            if(!err){
                res.send(locations);
            }
        });
    },
    getNew: function(req, res){
        res.send(api.getNew());
    },
    findOne: function(req, res){console.log('rest');
        var referencia = req.params.referencia;
        api.findOne({referencia: referencia}, function(err, location){console.log('callback', location);
            res.send(location);
        });
    },
	create: function(req, res){
        api.create(req.body, function(err, location){
            console.log('err', err);
            if(!err){
                res.send(location);
            }
        });
	},
	update: function(req, res){
        api.update(req.body, function(err, count){
            var result = err? 'NotOK' : 'OK';
            res.send({result: result});
        });
    },
	destroy: function(req, res){
        var referencia = req.params.referencia;
        api.destroy(referencia, function(err){
            var result = err? 'NotOK' : 'OK';
            res.send({result: result});
        });
	}
};


app.get('/api/locations', rest.list);
app.get('/api/locations/getnew', rest.getNew);
app.post('/api/locations/filter', rest.filter);
app.get('/api/locations/:referencia', rest.findOne);
app.post('/api/locations', rest.create);
app.put('/api/locations', rest.update);
app.delete('/api/locations/:referencia', rest.destroy);


var _getDate = function(){
    var date = new Date();
    var str = date.getFullYear();
    str += '-';
    var month = date.getMonth() + 1;
    str += month < 10? '0' + month : month;
    str += '-';
    var day = date.getDate();
    str += day < 10? '0' + day : day;
    return str;
};

var updateLatestReferencia = function(){
    /*
     *  implementar mudança de ano   
     */
    Location.find(null, {referencia: 1}).sort({referencia: -1}).limit(1).exec(function(err, locations){
        if(err){console.log(err.stack);res.send(err.stack);return;}
        if(locations.length > 0){
            var referencia = locations[0].referencia;
            latestReferencia = referencia + 1;
        } else {
            latestReferencia += 1;
        }
        console.log('latestReferencia', latestReferencia);
    });
};
var latestReferencia = new Date().getFullYear() * 10000;
updateLatestReferencia();