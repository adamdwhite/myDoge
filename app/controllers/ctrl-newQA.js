"use strict";

/*
    handle data and functionality needed in list.html
    using todoFactory and userFactory to interact with the database
 */

app.controller("listCtrl", function($scope, todoFactory, userFactory, filterFactory, $rootScope) {

    $scope.tasks = [];
    let user = userFactory.getCurrentUser();

    const showAllTasks = function() {
        todoFactory.getAllTasks(user)
            .then((tasks) => {
                console.log("showAllTasks from promise", tasks);
                $scope.tasks = tasks;
            });
    };


    $scope.deleteTask = function(id) {
        todoFactory.deleteTask(id)
            .then((irrelevant) => {
                showAllTasks();
            });
    };

    //TODO fix this toggle happens too quick
    $scope.toggleDoneTask = function(obj) {
        console.log("toggleDoneTask", obj.isCompleted);
        let status = obj.isCompleted ? true : false;
        let tmpObj = { isCompleted: status };
        todoFactory.editTask(obj.id, tmpObj)
            .then(() => {
                console.log("then is updated");
                showAllTasks();
            });
    };

    showAllTasks();

});