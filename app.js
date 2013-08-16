var mongoose = require('mongoose');
var appConfig = require('./config');
var server = require('./server');
var dbUrl = 'mongodb://127.0.0.1/animal';
//var dbUrl = 'mongodb://nodejitsu_andrepadez:mp8k3uin0pinhijdn9qkb5b4lb@ds051947.mongolab.com:51947/nodejitsu_andrepadez_nodejitsudb4891227178';

/*mongoose.connect(dbUrl);
mongoose.connection.on('open', function(err){
    if(err){console.log(err);return;}
    server.listen(server.get('port'), function(){
      console.log("Express server listening on port " + server.get('port'));
    });
});*/


server.listen(server.get('port'), function(){
  console.log("Express server listening on port " + server.get('port'));
});