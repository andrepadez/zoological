Normalizer
========

Templating engine for CSS based on width and height of the window, used as a Connect/Express Middleware.
Relies on Swig, which is my templating engine of choice.  
I created this package to help me with a very specific need: when building apps for mobile i always have problems with my lack of ability with CSS so this allows me to build a UI based on percentages of the window's dimension.  
It's in a very early stage but it works as it should; take a look at the roadmap to check on the functionalities i'm working on.

<h3>you should use it because:</h3>
<ul>
    <li>You find it useful</li>
    <li>you need to build a UI that is proportionate wherever the device it is opened</li>
    <li>Simple to use</li>
    <li>Little or no overhead</li>
</ul>

<h3>you should look away if:</h3>
<ul>
    <li>you think it's stupid</li>
    <li>you're a guru with CSS and think this is stupid</li>
    <li>potato</li>
</ul>

Usage
-----

Install it with:
	
	npm install cssspitter

Or include it in the package.json file:
	
	{
		......,
		"dependencies": {
			....,
			"cssspitter": "*"
		}
	}

As always you have to require it:

    var cssspitter = require('cssspitter');

When configuring the Connect/Express server, include it like this:  
	- replace the path with the folder you have the templates)  
	- it's important to include it after the static middleware, for in the near future i will be implementing a caching service

    app.configure(function(){
    	.....
    	.....
    	app.use(express.static(path.join(__dirname, 'public')));
  		app.use( cssspitter( path.join(__dirname, 'public/css/templates/' ) ) );
    });
    
The structure of the requests should be:

    <link rel="stylesheet" type="text/css" href="css/_width_/_height_/_nameoffile_.css">

So what i do is something like:  
	- I will create a mechanism to serve bundles but for now, you have to request every file

	<script>
		var w = window.innerWidth,
		    h = window.innerHeight;
	    document.write(
			[
				'<link rel="stylesheet" href="/css/'+w+'/'+h+'/navigation.css">', 
				'<link rel="stylesheet" href="/css/'+w+'/'+h+'/homeview.css">'
			].join('\n')
		);
	</script>
    
Then, in the CSS template, use 'w' and 'h' at will:
    
    html, body {
    	width: {{w}}px;
    	height: {{h}}px;
    }
    .header {
    	width: {{w}}px;
    	height: {{h * 0.10}}px; /* 10% */
    }

Easy isn't it?  
You can also use all the functionality of Swig to pump up the jam...

Road Map
-----

* caching system that will save the files already requested
* bundling mechanism to join all the files into one response
* minimizing option

Feel free to use, fork and please contribute reporting bugs and with pull requests