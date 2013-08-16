(function(undefined){

	LocationSpotterAdmin.Comodidade = {};

	LocationSpotterAdmin.factory('Comodidade', function($resource) {
		return $resource('/api/comodidades/:_id', {_id: ''}, {update: { method: 'PUT' }});
	});


	LocationSpotterAdmin.Comodidade.ListCtrl = function($scope, $location, $http, Comodidade){
		$scope.create = create($scope, Comodidade);
		$scope.remove = remove($scope, Comodidade);
		$scope.update = update($scope, Comodidade);
		$scope.ordena = ordena($scope, $http);
		
		$http.post('/api/comodidades/filter').success(function(data){
			$scope.comodidades = data;
		});
	};

	var create = function($scope, Comodidade){
		return function(){
			var comodidade = {};
			comodidade.nome = $scope.novaComodidade;
			comodidade.ordem = $scope.comodidades.length;
			Comodidade.save(comodidade, function(data) {
				$scope.comodidades.push(data);
				$scope.novaComodidade = '';
			});
		};
	};

	var update = function($scope, Comodidade){
		return function(comodidade){
			Comodidade.update(comodidade);
		}
	};

	var remove = function($scope, Comodidade){
		return function(id){
			if(confirm('De certeza que quer apagar esta comodidade?')){
				Comodidade.delete({_id: id}, function(){
					$scope.comodidades = $scope.comodidades.filter(function(comodidade){
						return comodidade._id !== id;
					});
				});
			}
		};
	};

	var ordena = function($scope, $http){
		return function(){
			$http.post('/api/comodidades/ordenar', {newOrder: $scope.ordem});
		};
	};

})(undefined);