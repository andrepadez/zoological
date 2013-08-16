var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var express = require('express');
var app = module.exports = express();
var api = module.exports.api = {};
var normalizer = require('normalizer');

var User = require('./model').model;
var Location = require('../locations/model').model;


api.find = function(filter, sort, skip, limit){
	var callback = arguments[arguments.length - 1];
	filter = normalizer.treatFilter(filter, User);
	sort = normalizer.treatSort(sort, User);
	if(callback && typeof callback === 'function'){
		User.find(filter).sort(sort).skip(skip).limit(limit).exec(function(err, users){
			if(users.length === 0){
				callback(err, users);
			}
			for(var i = 0, complete = 0; i < users.length; i++){
				(function(idx){
					var user = users[idx];
					var id = user.id;
					Location.find({ $or: [{proprietario: id}, {account: id}] }, function(err, locations){
						user.locations = locations;
						if(++complete === users.length){
							callback(err, users);
						}
					});
				})(i);
			}
		});
	}
};

api.findOne = function(filter){
	var callback = arguments[arguments.length - 1];
	if(callback && typeof callback === 'function'){
		User.findOne(filter, callback);
	}
};

api.getNew = function(){
	return new User();
};

api.create = function(body){
	var callback = arguments[arguments.length - 1];
	normalizer.normalizeSearchFields(body, User);
	user = new User(body);
	user.save(function(err){
		if(callback && typeof callback === 'function'){
			callback(err, user);
		}
	});
};

api.update = function(body){
	var id = ObjectId(body._id);
	delete(body._id);
	normalizer.normalizeSearchFields(body, User);
	var callback = arguments[arguments.length - 1];

	User.update({_id: id}, body, function(err, numAffected){console.log('err', err);
		if(callback && typeof callback === 'function'){
			callback(err, numAffected);
		}
	});
};

api.destroy = function(id){
	var callback = arguments[arguments.length - 1];
	User.findOne({_id: ObjectId(id)}, function(err, user){
		if(user){
			user.remove();
		}
		if(callback && typeof callback === 'function'){
			callback(err);
		}
	});
};

var rest = {
	list: function(req, res){
		api.find(function(err, users){
			if(!err){
				/*
					martelada, por alguma razão isto
					está a correr duas vezes
				 */
				try{
					console.log('once');
					res.send(users);
				} catch(e){
					console.log('twice');
				}
			}
		});
	},
	filter: function(req, res){
		var limit = req.body.limit || 20;
		api.find(req.body.filter, req.body.sort, req.body.skip, limit, function(err, users){
			if(!err){
				res.send(users);
			}
		});
	},
	findOne: function(req, res){
		api.findOne({_id: ObjectId(req.params._id)}, function(err, user){
			res.send(user);
		});
	},
	create: function(req, res){
		api.create(req.body, function(err, user){
			if(!err){
				res.send(user);
			}
		});
	},
	update: function(req, res){console.log('put');
		api.update(req.body, function(err, numAffected){console.log('callback');
			var result = err? 'NotOK' : 'OK';
			res.send({result: result});
		});
	},
	destroy: function(req, res){
		var id = req.params._id;
		api.destroy(id, function(err){
			var result = err? 'NotOK' : 'OK';
			res.send({result: result});
		});
	}
};

app.get('/api/users', rest.list);
app.post('/api/users/filter', rest.filter);
app.get('/api/users/:_id', rest.findOne);
app.post('/api/users', rest.create);
app.put('/api/users', rest.update);
app.delete('/api/users/:_id', rest.destroy);

