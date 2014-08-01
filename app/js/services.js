'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var app = angular.module('todoAngularApp.services', []);

app.factory('todoPersistance', function() {

    var instance = {
        setObject: function(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        getObject: function(key) {
            var value = localStorage.getItem(key);
            return value && JSON.parse(value);
        }
    }

    return instance;

});
