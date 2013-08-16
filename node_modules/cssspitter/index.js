var connect = require('connect');
var url = require('url');
var api = require('./api').api;
var app = connect();

module.exports = function(pathToCss){
	return function(req, res, next) {
		var rx = new RegExp(/^\/css\/\d+\/\d+\/\w+(\.min)?\.css$/);
		if(rx.test(req.url)){
			url = req.url.split('/');
			var params = {
				w: parseInt(url[2], 10),
				h: parseInt(url[3]),
				filename: url[4],
				path: pathToCss
			};
			api.spit(params, function(err, template){
				if(err){
					next();
				} else {
					res.setHeader('Content-Type', 'text/css');
					res.send( template );
				}
			});
			
		} else {
			next();
		}
	}
}