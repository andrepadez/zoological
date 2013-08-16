var swig = require('swig');
var path = require('path');

var model = module.exports;

model.compile = function(params, callback){
	var min = /.min./g.test(params.filename);
	filename = params.filename.replace(/.min/g, '');

	var file = path.join(params.path, filename);
	var template = swig.compileFile(file);
	template = template(params);
	if(min){
		model.minimize(template, callback);
	} else {
		callback(null, template);
	}
};

model.minimize = function(template, callback){
	//TODO
	callback(null, template);
};