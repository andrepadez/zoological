var fs = require('fs');

var model = require('./model');
var api = module.exports.api = {};

api.spit = function(params, callback){
	var extension = params.filename.split('.').pop();
	if(extension !== 'css'){
		callback( Error('invalid extension') );
		return;
	}	
	model.compile(params, callback);	
};