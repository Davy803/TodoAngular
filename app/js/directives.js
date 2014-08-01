'use strict';

/* Directives */


var app = angular.module('todoAngularApp.directives', []);
var KEYCODE_ENTER = 13;
var KEYCODE_ESC = 27;

app.directive('todoTaskInput', [
    function () {
        return {
            link: function (scope, element, attrs) {
                element.keydown(function (event) {
                    var keycode = (event.keyCode ? event.keyCode : event.which);
                    var taskText = element.val().trim();

                    if (keycode == KEYCODE_ENTER && taskText) {
                        scope.addTask(taskText);
                        element.val('');
                        scope.$apply();
                    }
                });
            }
        }
    }
]);

app.directive('focusWhen', function() {
    return function(scope, element, attr) {

        // Add a watch on the `focus-when` attribute.
        // Whenever the `focus-when` statement changes this callback function will be executed.
        scope.$watch(attr.focusWhen, function(value) {
            // If the `focus-when` statement evaluates to `true`
            // then use jQuery to set focus on the element.
            if (value) {
                setTimeout(function() {
                    element.select();
                });
            }
        });
    };
});
    // Here is the directive to raise the 'blur' event.
app.directive('todoOnBlur', [
    '$parse', function($parse) {
        return function(scope, element, attr) {

            var fn = $parse(attr['todoOnBlur']);
            return element.on('blur', function(event) {

                return scope.$apply(function() {
                     return fn(scope, {
                        $event: event
                     });
                });

            });

        };
    }
]);

app.directive('todoTaskEdit', [
    function () {
        return {
            restrict: 'A',
            scope: true,
            link: function (scope, element, attrs, controller) {
                element.on('keydown', function (event) {
                    var keycode = (event.keyCode ? event.keyCode : event.which);
                    var taskText = element.val().trim();
                    if (keycode == KEYCODE_ENTER) {
                        if (taskText) {
                            scope.task.text = taskText;
                        } else {
                            scope.removeTask(scope.$index);
                        }
                        scope.task.editing = false;
                        scope.$apply();
                    }
                    else if (keycode == KEYCODE_ESC) {
                        element.val(scope.task.text);
                        scope.task.editing = false;
                        scope.$apply();
                    }
                });
            }
        }
    }
]);

app.directive('activeLink', ['$location', function (location) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs, controller) {
            var clazz = attrs.activeLink;
            var path = attrs.href;
            path = path.substring(1); //path does not return including hashbang
            scope.location = location;
            scope.$watch('location.path()', function (newPath) {
                if (path === newPath) {
                    element.addClass(clazz);
                } else {
                    element.removeClass(clazz);
                }
            });
        }
    };
}])