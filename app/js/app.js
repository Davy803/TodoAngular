'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('todoAngularApp', [
    'ngRoute',
    'todoAngularApp.filters',
    'todoAngularApp.services',
    'todoAngularApp.directives',
    'todoAngularApp.controllers'
]);
app.config([
    '$routeProvider', function($routeProvider) {
        $routeProvider.when('/todo/:filter', { templateUrl: 'partials/todo-list.html', controller: 'TodoCtrl' });
        $routeProvider.otherwise({ redirectTo: '/todo/all' });
    }
]);