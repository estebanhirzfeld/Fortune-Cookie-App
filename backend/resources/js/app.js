angular.module('tareasApp', [])
    .controller('TareasController', function($scope, $http) {
        const apiUrl = 'http://localhost:8002/api/tareas';

        $scope.tareas = [];
        $scope.nuevaTarea = {};

        $http.get(apiUrl).then(function(res) {
            $scope.tareas = res.data;
        });

        $scope.agregarTarea = function() {
            $http.post(apiUrl, $scope.nuevaTarea, {
                headers: { 'Content-Type': 'application/json' }
            }).then(function(res) {
                $scope.tareas.push(res.data);
                $scope.nuevaTarea = {};
            });
        };

        $scope.actualizarTarea = function(tarea) {
            $http.put(apiUrl + '/' + tarea.id, tarea, {
                headers: { 'Content-Type': 'application/json' }
            });
        };

        $scope.eliminarTarea = function(tarea) {
            $http.delete(apiUrl + '/' + tarea.id).then(function() {
                const index = $scope.tareas.indexOf(tarea);
                if (index > -1) $scope.tareas.splice(index, 1);
            });
        };
    });
