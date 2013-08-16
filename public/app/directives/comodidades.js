(function(undefined){

	var sortableComodidade = function(){
		var linkfn = function($scope, $element, $attr){
			var ul = $element.find('ul');
			var hidden = $element.find('input[type=hidden]');

			ul.sortable({
				stop: function(ev, ui){
					$scope.ordem = ul.sortable('toArray');
					$scope.ordena();
				}
			});
		};
		return {
			restrict: 'E',
			link: linkfn
		};
	};

	var editableComodidade = function(){
		var linkfn = function($scope, $element, $attr){
			$scope.editMode = false;
			var id = $scope.comodidade._id;
			var editButton = $element.find('i.icon-edit');
			var textBox = $element.find('input[type=text]');
			var span = $element.find('span');
			var removeButton = $element.find('i.icon-remove-sign');

			$scope.editModeOn = function(){
				$scope.editMode = true;
				setTimeout(function(){
					textBox.trigger('focus');
				}, 50);
			};

			$scope.editModeOff = function(e){
				if(e.type === 'blur' || e.keyCode === 13){
					$scope.editMode = false;
					$scope.update($scope.comodidade);
				}
			};

			textBox.bind('keyup', $scope.editModeOff);
			textBox.bind('blur', $scope.editModeOff);
		};

		return {
			restrict: 'A',
			link: linkfn
		};
	};

	

	LocationSpotterAdmin.directives
		.directive('sortableComodidade', sortableComodidade)
		.directive('editableComodidade', editableComodidade);
	
})(undefined);