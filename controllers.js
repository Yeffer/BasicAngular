var empleadoControllers = angular.module('empleadoControllers', []);

empleadoControllers.controller('EmpleadoListadoCtrl', ['$scope','$http', function($scope, $http) {

	empleados();
	profesiones();

	function empleados(){
		$http.get('http://localhost/BasicAngular/Api/?a=listar').then( function(r){
			$scope.empleados = r.data;
		});
	}

	function profesiones(){
		$http.get('http://localhost/BasicAngular/Api/?a=profesiones').then(function(r){
			$scope.profesiones = r.data;
		});
	}

	$scope.retirar = function(id){
		if (confirm('Esta seguro que desea elimar el registro?')){
			$http.get('http://localhost/BasicAngular/Api/?a=eliminar&id=' + id).then(function(r){
			  empleados();
			});
		}
	}

	$scope.registrar = function(){
		var model = {
			Correo:  			$scope.Correo,
			Nombre:  			$scope.Nombre,
			Apellido:  			$scope.Apellido,
			Sexo: 				$scope.Sexo,
			Sueldo:  			$scope.Sueldo,
			Profesion_id: 		$scope.Profesion_id,
			FechaNacimiento: 	$scope.FechaNacimiento
		}
		console.log(model);
		$http.post('http://localhost/BasicAngular/Api/?a=registrar', model).then( function(r){
			empleados();
		});		
	}
}]);

empleadoControllers.controller('EmpleadoVerCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
	$http.get('http://localhost/BasicAngular/Api/?a=obtener&id=').then( function(r){
		$scope.model = r.data;
	});				
}]);