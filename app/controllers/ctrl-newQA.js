"use strict";

/*
    Handle data and functionality needed in the NEWQA.HTML (and DASHBOARD.HTML) 

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

    $scope.getDogesByCharacteristic = function(charUrlString) {
        return $q((resolve, reject) => {
            $http.get(`https://dogbreed-characteristics.herokuapp.com/characteristic/?characteristic=${charUrlString}`)
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