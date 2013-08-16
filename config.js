module.exports = {
	mongo:{
		dev: 'mongodb://127.0.0.1/locationspotter',
		prod: 'mongodb://nodejitsu:ad73f20d28e4a278da54e460a38d0f1b@linus.mongohq.com:10094/nodejitsudb7942160568'
	}, 
		cloudPt: {
		requestTokenURL: 'https://cloudpt.pt/oauth/request_token',
		accessTokenURL: 'https://cloudpt.pt/oauth/access_token',
		userAuthorizationURL: 'https://cloudpt.pt/oauth/authorize',
		consumerKey: 'f04f2982-4ca7-4154-b077-061b28544b3e',
		consumerSecret: '268119913838490123959944675189033179296',
		callbackURL: 'http://localhost:8080/admin/'
	}
};