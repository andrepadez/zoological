(function(){

	var Layout = {
		width: undefined,
		height: undefined,
		mainContainer: undefined,
		handlers: undefined,
		stylesheets: [
			'main.css',
			'navigation.css',
			'homeview.css',
			'landscape.css'
		],

		init: function(){
			this.width = isPortrait()? window.innerWidth : window.innerHeight;
			this.height = isPortrait()? window.innerHeight : window.innerWidth;
			this.writeStylesheets();
			this.registerHandlers();
			this.handleOrientation();
		},
		writeStylesheets: function(){
			var w = this.width,
				h = this.height;
			for(var i = 0; i < this.stylesheets.length; i++){
				document.write(
					'<link rel="stylesheet" type="text/css" href="/css/'+w+'/'+h+'/'+this.stylesheets[i]+'">'
				);
			}
		}, 
		handleOrientation: function(){
			window.addEventListener('orientationchange', this.handlers.onOrientationChange);
			window.addEventListener('load', this.handlers.onOrientationChange);
			window.addEventListener('resize', this.handlers.onOrientationChange);
		},

		registerHandlers: function(){
			this.handlers = {
				onOrientationChange: onOrientationChange.bind(this)
			}
		}

	};
	

	var isPortrait = function(){
		return window.orientation? 
				window.orientation % 180 === 0 : 
				window.innerWidth < window.innerHeight;
	};

	var onOrientationChange = function(e){
		if(!window.navigator.standalone){
			setTimeout( function(){ window.scrollTo(0, 1); }, 100);
		}
		if(typeof this.mainContainer === 'undefined'){
			this.mainContainer = document.querySelector('.main-container');
		}
		
		var method = isPortrait()? 'remove' : 'add';
		document.body.classList[method]('landscape');
	}

	

	Layout.init();	

})();