"use strict";

/*
provide the basic crud interactions with firebase

*/

app.factory("factoryQA", function($q, $http, FBCreds) {


    const addBreedAnswers = function(obj) {
        let newObj = JSON.stringify(obj);
        return $http.post(`${FBCreds.databaseURL}/items.json`, newObj)
            .then((data) => {
                console.log("data", data);
                return data;
            }, (error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error", errorCode, errorMessage);
            });
    };

    return { addBreedAnswers };
});