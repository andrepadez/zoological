(function(undefined){

	LocationSpotterAdmin.User = {};

	var RECORD_LIMIT = 20;
	var SORT_PROP = 'nome';

	LocationSpotterAdmin.factory('User', function($resource) {
		return $resource('/api/users/:_id', {_id: ''}, { update: { method: 'PUT' } });
	});


	LocationSpotterAdmin.User.ListCtrl = function($scope, $location, $http, User){
		$scope.recordCount = 0;
		$scope.skip = 0;
		$scope.sortProp = '';
		$scope.limit = RECORD_LIMIT;
		$scope.users = [];
		$scope.search = {};
		$scope.search.nome = '';
		$scope.search.email = '';
		$scope.tiposUtilizador = [{val: '', text: 'Todos...'}].concat(tiposUtilizador);
		$scope.search.tipo = $scope.tiposUtilizador[0].val;

		$scope.filter = filter($scope, $http);
		$scope.more = more($scope);
		$scope.sort = sort($scope);
		$scope.resetFilter = resetFilter($scope);
		$scope.remove = remove($scope, User);
		
		$scope.sort(SORT_PROP);
	};

	LocationSpotterAdmin.User.CreateCtrl = function($scope, $location, User){
		$scope.action = 'Novo';
		$scope.tiposUtilizador = tiposUtilizador;
		$scope.save = function () {
			User.save($scope.user, function(data) {
				$location.path('/users/');
			});
		};
	};

	LocationSpotterAdmin.User.EditCtrl = function($scope, $location, $http, $routeParams, User){
		var id = $routeParams.id;
		$scope.tiposUtilizador = tiposUtilizador;
		$scope.action = "Editar";
		$scope.user = User.get({_id: id});
		$scope.save = function(){
			User.update($scope.user, function(data, status, headers, config) {
				$location.path('/users/');
			});
		};
	};


	var tiposUtilizador = [
		{val: 'Location Spotter', text: 'Location Spotter'},
		{val: 'Parceiro', text: 'Parceiro'},
		{val: 'Proprietário', text: 'Proprietário'},
		{val: 'Outros', text: 'Outros'}
	];

	var filter = function($scope, $http){
		return function(more){
			var data = {};
			data.sort = $scope.sorted;
			data.limit = $scope.limit;
			$scope.skip = more? $scope.skip + $scope.limit : 0;
			data.skip = $scope.skip;
			data.filter = {};
			for(var idx in $scope.search){
				if($scope.search[idx]){
					data.filter[idx] = $scope.search[idx];
				}
			}
			console.log(data.filter);
			$http.post('/api/users/filter', data).success(function(data, status, headers, config){
				$scope.recordCount += data.length;
				$scope.users = more ? $scope.users.concat(data) : data;
			});
		};
	};

	var more = function($scope){
		return function(){
			$scope.filter('more');
		};
	};

	var sort = function($scope, asc){
		return function(prop){
			$scope.sortDir = $scope.sortProp !== prop || asc? 1 : (- $scope.sortDir);
			$scope.sortProp = prop;
			$scope.sorted = {};
			$scope.sorted[prop] = $scope.sortDir;
			$scope.filter();
		};
	};

	var resetFilter = function($scope){
		return function(){
			$scope.search.nome = '';
			$scope.search.email = '';
			$scope.search.tipo = $scope.tiposUtilizador[0].val;
			$scope.filter();
		};
	};

	//a substituir por uma directive
	var remove = function($scope, User){
		return function(id){
			if(confirm('De certeza que quer apagar este utilizador?')){
				User.delete({_id: id}, function(){
					removeRow(id);
				});
			}
		};
	};

	var removeRow = function(id){
		$('#tr-'+id).fadeOut();
	};

})(undefined);