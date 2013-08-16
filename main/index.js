var express = require('express');
var url = require('url');
var app = module.exports = express();

app.set('views', process.cwd() + '/main/');

index = function(req, res){
	var data = {};
	res.render('views/index.html', data);
};

app.get('/', index);