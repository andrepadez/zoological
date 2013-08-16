(function(undefined){

	LocationSpotterAdmin.Location = {};

	var RECORD_LIMIT = 20;
	var SORT_PROP = 'titulo';


	LocationSpotterAdmin.factory('Location', function($resource) {
		return $resource('/api/locations/:referencia', {referencia: ''}, { update: { method: 'PUT' } });
	});

	LocationSpotterAdmin.Location.ListCtrl = function($scope, $location, $http, Location){
		$scope.recordCount = 0;
		$scope.skip = 0;
		$scope.sortProp = '';
		$scope.limit = RECORD_LIMIT;
		$scope.locations = [];
		//$scope.search = {};
		//$scope.search.nome = '';
		//$scope.search.email = '';
		//$scope.tiposUtilizador = [{val: '', text: 'Todos...'}].concat(tiposUtilizador);
		//$scope.search.tipo = $scope.tiposUtilizador[0].val;
		//$scope.locations = Location.query();

		$scope.sort = sort($scope);
		$scope.filter = filter($scope, $http);
		$scope.more = more($scope);		
		$scope.resetFilter = resetFilter($scope);
		$scope.remove = remove($scope, Location);
		
		$scope.sort(SORT_PROP);
	};

	LocationSpotterAdmin.Location.CreateCtrl = function($scope, $http, $location, Location){
		$scope.action = 'Nova';
		$scope.templates = templates;
		$scope.save = create($scope, $location, Location);
		$http.post('/api/comodidades/filter').success(function(data){
			$scope.comodidadesList = data;
		});
		$scope.optionsAnos = getOptionsAnos(new Date().getFullYear(), 1950);
		$scope.selectAccountType = selectAccountType($scope);
		$http.get('/api/locations/getnew').success(function(data){
			$scope.location = data;
			$scope.location.comodidades = {};
		});
		getUsers($scope, $http);
		
	};

	LocationSpotterAdmin.Location.EditCtrl = function($scope, $location, $http, $routeParams, Location){
		$scope.action = "Editar";
		$scope.save = update($scope, $location, Location);
		$scope.templates = templates;
		$http.post('/api/comodidades/filter').success(function(data){
			$scope.comodidadesList = data;
		});
		$scope.optionsAnos = getOptionsAnos(new Date().getFullYear(), 1950);
		$scope.selectAccountType = selectAccountType($scope, $http);
		$scope.location = Location.get({referencia: $routeParams.referencia}, function(){
			$scope.location.comodidades = $scope.location.comodidades || {};
			getUsers($scope, $http, function(){
				if($scope.location.account){
					$scope.selectAccountType($scope.location.account.tipo);
				}
			});
		});
	};

	var create = function($scope, $location, Location){
		return function () {
			$scope.location.account = $scope.location.account._id;
			$scope.location.proprietario = $scope.location.proprietario._id;
			//updateComodidades($scope);
			Location.save($scope.location, function(data) {
				$location.path('/locations/');
			});
		};
	};

	var update = function($scope, $location, Location){
		return function(){
			$scope.location.account = $scope.location.account._id;
			$scope.location.proprietario = $scope.location.proprietario._id;
			//updateComodidades($scope);
			Location.update($scope.location, function(data, status, headers, config) {
				$location.path('/locations/');
			});
		};
	};

	var updateComodidades = function($scope){
		var comodidades = [];
		for(var idx in $scope.location.comodidades){
			if($scope.location.comodidades[idx] === true){
				comodidades.push(idx);
			}
		}
		$scope.location.comodidades = comodidades;
	};

	var sort = function($scope){
		return function(prop){
			$scope.sortDir = $scope.sortProp !== prop? 1 : (- $scope.sortDir);
			$scope.sortProp = prop;
			$scope.sorted = {};
			$scope.sorted[prop] = $scope.sortDir;
			$scope.filter();
		};
	};

	var filter = function($scope, $http){
		return function(more){
			var data = {};
			data.sort = $scope.sorted;
			data.limit = $scope.limit;
			$scope.skip = more? $scope.skip + $scope.limit : 0;
			data.skip = $scope.skip;
			data.filter = {};
			
			$http.post('/api/locations/filter', data).success(function(data, status, headers, config){
				$scope.recordCount += data.length;
				$scope.locations = more ? $scope.users.concat(data) : data;
			});
		};
	};

	var more = function($scope){
		return function(){
			$scope.filter('more');
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

	var remove = function($scope, User){
		return function(referencia){
			if(confirm('De certeza que quer apagar este utilizador?')){
				User.delete({referencia: referencia}, function(){
					removeRow(referencia);
				});
			}
		};
	};

	//a substituir por uma directive
	var removeRow = function(referencia){
		$('#tr-'+referencia).fadeOut();
	};

	var getUsers = function($scope, $http, callback){
		$http.get('/api/users/').success(function(data){
			var users = {};
			for(var i = 0; i < data.length; i++){
				if(!users[data[i].tipo]){
					users[data[i].tipo] = [];
				}
				users[data[i].tipo].push(data[i]);
			}
			$scope.users = users;
			if(callback && typeof callback === 'function'){
				callback(users);
			}
		});
	};

	var selectAccountType = function($scope, $http){
		return function(tipo){
			$scope.selectedAccountType = tipo;
			var postData = {
				filter: {tipo: tipo},
				sort: {nome: 1}
			};
			$scope.accountsList = $scope.users[tipo];
			/*$http.post('/api/users/filter', postData).success(function(data){
				$scope.accountsList = data;
			});*/
		};
	};


	var templates = {
		location: '/views/location/form/location.html',
		proprietario: '/views/location/form/proprietario.html',
		account: '/views/location/form/account.html',
		morada: '/views/location/form/morada.html',
		possibilidade: '/views/location/form/possibilidade.html',
		comodidades: '/views/location/form/comodidades.html',
		acessibilidades: '/views/location/form/acessibilidades.html',
		descricao: '/views/location/form/descricao.html',
		outros: '/views/location/form/outros.html',
		imagens: '/views/location/form/imagens.html',
		gravar: '/views/location/form/gravar.html'
	};

	var getOptionsAnos = function(end, begin){
		var anos = [];
		for(var i = end; i > begin; i--){
			anos.push(i);
		}
		return anos;
	};

})(undefined);