"use strict";

// This is the factory for the GET from the data set of all dog breed names 
app.factory("breedSearchFactory", function($q, $http, FBCreds) {
    let currentBreedID = null;
    console.log('breed search-bar factory!');
    let getBreedNames = () => {
        return $q((resolve, reject) => {
            $http.get("data/breed-set.json")
                .then((itemObject) => {
                    let itemCollection = itemObject.data;
                    console.log("breeds from search", itemCollection);
                    resolve(itemCollection);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    // This is the factory for PUSHING the saved breed object to firebase
    const saveBreed = function(object) {
        let newObject = JSON.stringify(object);
        console.log("object.breedID", object.breedID);
        currentBreedID = object.breedID;
        return $http.post(`${FBCreds.databaseURL}/Doge.json`,
                newObject)
            .then((data) => {
                console.log("data", data);
                return data;
            }, (error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error", errorCode, errorMessage);
            });
    };

    return { getBreedNames, saveBreed };
});