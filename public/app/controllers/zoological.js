(function(undefined){

	window.Zoological = angular.module("Zoological", ['ngResource', 'directives']);
	Zoological.config(function($routeProvider) {
		$routeProvider.when('/', {
			//controller: LocationSpotterAdmin.Location.ListCtrl,
			templateUrl: '/views/index.html'
		/*}).when('/locations/new', {
			controller: LocationSpotterAdmin.Location.CreateCtrl,
			templateUrl: '/views/location/form.html'
		}).when('/locations/:referencia', {
			controller: LocationSpotterAdmin.Location.EditCtrl,
			templateUrl: '/views/location/form.html'
		}).when('/users/', {
			controller: LocationSpotterAdmin.User.ListCtrl,
			templateUrl: '/views/user/list.html'
		}).when('/users/new', {
			controller: LocationSpotterAdmin.User.CreateCtrl,
			templateUrl: '/views/user/form.html'
		}).when('/users/:id', {
			controller: LocationSpotterAdmin.User.EditCtrl,
			templateUrl: '/views/user/form.html'
		}).when('/comodidades/', {
			controller: LocationSpotterAdmin.Comodidade.ListCtrl,
			templateUrl: '/views/comodidade/list.html'*/
		}).otherwise({ redirectTo: '/' });
	});

	Zoological.directives = angular.module('directives', []);

})(undefined);