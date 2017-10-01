"use strict";

/*
    handle data and functionality needed in list.html
    using todoFactory and userFactory to interact with the database
 */

app.controller("qaCtrl", function($q, $http, $scope, userFactory) {
    let user = userFactory.getCurrentUser();

    $scope.question1 = {
        // "questionId": "1",
        // "text": "What size of dog are you looking for?",
        "answer1": "https://dogbreed-characteristics.herokuapp.com/characteristic/?characteristic=small",
        // "Tiny (up to 11 pounds)",
        "answer2": "Small (12-22 pounds)",
        // INCLUDE https://dogbreed-characteristics.herokuapp.com/characteristic/?characteristic=small
        "answer3": "Medium (23-44 pounds)",
        // INCLUDE https://dogbreed-characteristics.herokuapp.com/characteristic/?characteristic=medium
        "answer4": "Large (45-88 pounds)",
        // INCLUDE https://dogbreed-characteristics.herokuapp.com/characteristic/?characteristic=medium
        // INCLUDE https://dogbreed-characteristics.herokuapp.com/characteristic/?characteristic=size
        "answer5": "Extra Large (89-140 pounds)",
        // INCLUDE https://dogbreed-characteristics.herokuapp.com/characteristic/?characteristic=size
        "answer6": "No preference"
            // NO FILTER
    };
    $scope.answer1 = [];

    $scope.getDogesByCharacteristic = function(characteristicUrlString) {
        return $q((resolve, reject) => {
            $http.get(`https://dogbreed-characteristics.herokuapp.com/characteristic/?characteristic=${characteristicUrlString}`)
                .then((result) => {
                    console.log('characteristic result');

                    let dogByChar = result.data.breeds;
                    console.log("char answered ##?", dogByChar);
                    resolve(dogByChar);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
});

// const showAllTasks = function() {
//     todoFactory.getAllTasks(user)
//         .then((tasks) => {
//             console.log("showAllTasks from promise", tasks);
//             $scope.tasks = tasks;
//         });
// };






//     $scope.deleteTask = function(id) {
//         todoFactory.deleteTask(id)
//             .then((irrelevant) => {
//                 showAllTasks();
//             });
//     };

//     //TODO fix this toggle happens too quick
//     $scope.toggleDoneTask = function(obj) {
//         console.log("toggleDoneTask", obj.isCompleted);
//         let status = obj.isCompleted ? true : false;
//         let tmpObj = { isCompleted: status };
//         todoFactory.editTask(obj.id, tmpObj)
//             .then(() => {
//                 console.log("then is updated");
//                 showAllTasks();
//             });
//     };

//     showAllTasks();

// });