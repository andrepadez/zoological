var swig = require('swig');
var express = require('express');
var cssspitter = require('cssspitter');
var path = require('path');
var app = module.exports = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.engine('.html', swig.renderFile);
  app.set('view engine', 'html');

  /*swig.init({
    root: path.join(__dirname, 'main'),
    allowErrors: true // allows errors to be thrown and caught by express instead of suppressed by Swig
  });*/
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('animalftw'));
  app.use(express.session());
  app.use( cssspitter( path.join(__dirname, 'public/css/templates/' ) ) );
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(require('./main/'));
});
