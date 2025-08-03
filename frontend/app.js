angular.module('fortuneCookieApp', ['ngRoute'])
    .constant('API_URL', 'http://localhost:8000/api')
    
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/game.html',
                controller: 'GameController'
            })
            .when('/dashboard', {
                templateUrl: 'partials/dashboard.html',
                controller: 'DashboardController'
            })
            .otherwise({
                redirectTo: '/'
            });
    })

    // Controlador para la vista del juego (game.html)
    .controller('GameController', function($scope, $http, API_URL) {
        $scope.fortune = {};
        $scope.error = '';

        $scope.getFortune = function() {
            $scope.fortune = {}; // Limpia la frase anterior
            $scope.error = ''; // Limpia el error anterior

            $http.get(API_URL + '/cookies/random')
                .then(function(response) {
                    $scope.fortune = response.data;
                })
                .catch(function(error) {
                    console.error('Error al obtener la frase:', error);
                    $scope.error = error.data.message || 'No se pudo contactar al servidor.';
                });
        };

        // Cargar una frase al entrar a la vista
        $scope.getFortune();
    })

    // Controlador para la vista de administración (dashboard.html)
    .controller('DashboardController', function($scope, $http, API_URL) {
        $scope.cookies = [];
        $scope.newCookie = {};
        $scope.errorMessage = '';

        // Función para cargar todas las frases
        function loadCookies() {
            $http.get(API_URL + '/cookies')
                .then(function(response) {
                    $scope.cookies = response.data;
                })
                .catch(function(error) {
                    console.error('Error al cargar las frases:', error);
                    $scope.errorMessage = 'No se pudieron cargar las frases.';
                });
        }

        // Función para agregar una nueva frase
        $scope.addCookie = function() {
            $scope.errorMessage = ''; // Limpiar errores previos

            $http.post(API_URL + '/cookies', $scope.newCookie)
                .then(function(response) {
                    // Agrega la nueva frase al principio de la lista para verla inmediatamente
                    $scope.cookies.unshift(response.data); 
                    $scope.newCookie = {}; // Limpia el formulario
                })
                .catch(function(error) {
                    console.error('Error al agregar la frase:', error);
                    // Manejo de la excepción controlada de frase duplicada
                    if (error.status === 422 && error.data.errors.message) {
                        $scope.errorMessage = "La frase que intentas ingresar ya existe en la base de datos.";
                    } else {
                        $scope.errorMessage = 'Ocurrió un error inesperado al agregar la frase.';
                    }
                });
        };

        // Función para eliminar una frase
        $scope.deleteCookie = function(cookie) {
            // Confirmación antes de borrar
            if (!confirm('¿Estás seguro de que quieres eliminar esta frase?')) {
                return;
            }

            $http.delete(API_URL + '/cookies/' + cookie.id)
                .then(function() {
                    // Elimina la frase del array local para actualizar la vista sin recargar
                    const index = $scope.cookies.indexOf(cookie);
                    if (index > -1) {
                        $scope.cookies.splice(index, 1);
                    }
                })
                .catch(function(error) {
                    console.error('Error al eliminar la frase:', error);
                    $scope.errorMessage = 'No se pudo eliminar la frase.';
                });
        };

        // Función para editar una frase
        $scope.editCookie = function(cookie) {
            const newMessage = prompt('Ingrese la nueva frase:', cookie.message);
            if (newMessage == null) {
                return;
            }
            
            cookie.message = newMessage;
            $http.put(API_URL + '/cookies/' + cookie.id, { message: newMessage })
                .then(function() {
                    // Actualiza la frase en el array local
                    cookie.message = newMessage;
                })
                .catch(function(error) {
                    console.error('Error al editar la frase:', error);
                    $scope.errorMessage = 'No se pudo editar la frase.';
                });
        };
        
        // Cargar todas las frases al iniciar el controlador
        loadCookies();
    });