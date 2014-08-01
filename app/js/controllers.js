'use strict';

/* Controllers */
var app = angular.module('todoAngularApp.controllers', []);

app.controller('TodoCtrl', [
    '$scope', '$routeParams', '$timeout', 'todoPersistance',
    function($scope, $routeParams, $timeout, todoPersistance) {

        function syncScopeState() {
            $scope.completeAll = true;
            $scope.activeTasks = [];
            $scope.completedTasks = [];

            _.each($scope.tasks, function(task) {
                if (!task.completed) {
                    $scope.completeAll = false;
                    $scope.activeTasks.push(task);
                } else {
                    $scope.completedTasks.push(task);
                }
            });
        }

        $scope.tasks = todoPersistance.getObject('tasks') || [];
        $scope.activeTasks = [];
        $scope.completedTasks = [];

        $scope.$watch('tasks', function(newValue, oldValue) {

            syncScopeState();

            //We don't want to persist edit mode flag
            var tasksToPersist = _.map($scope.tasks, function(task) {
                var copy = angular.copy(task);
                copy.editing = false;
                return copy;
            });

            todoPersistance.setObject('tasks', tasksToPersist);
        }, true);

        $scope.addTask = function(taskText) {
            var task = { text: taskText, completed: false };
            $scope.tasks.push(task);
        };

        $scope.removeTask = function(index) {
            $scope.tasks.splice(index, 1);
        };

        $scope.completeAllTasks = function() {
            $timeout(function() {
                _.each($scope.tasks, function(task) {
                    task.completed = $scope.completeAll;
                });
            });
        };

        $scope.clearCompleted = function() {
            var task;

            //Go backwards otherwise removing items will alter index of following items
            for (var i = $scope.tasks.length - 1; i >= 0; i--) {
                task = $scope.tasks[i];
                if (task.completed) {
                    $scope.tasks.splice(i, 1);
                }
            }
        };

        $scope.taskFilter = function(item) {
            var showAll = $routeParams.filter === 'all';
            var matchesActive = $routeParams.filter === 'active' && !item.completed;
            var matchesCompleted = $routeParams.filter === 'completed' && item.completed;

            return showAll || matchesActive || matchesCompleted;
        };
    }
]);