"use strict";

// This is the factory for the GET from the data set of all dog breed names 
app.factory("breedSearchFactory", function($q, $http, FBCreds) {
    let currentBreedID = null;
    console.log('breed search-bar factory!');
    let getBreedNames = () => {
        return $q((resolve, reject) => {
            let allBreedNames = [];
            Promise.all([
                    getBreedsBySize('small', allBreedNames),
                    getBreedsBySize('medium', allBreedNames),
                    getBreedsBySize('size', allBreedNames)
                ])
                .then(() => {
                    console.log("breeds from search", allBreedNames);
                    let detailPromises = [];
                    let allDogDetails = [];
                    allBreedNames.forEach(function(dogName) {
                        detailPromises.push($http.get(`https://dogbreed-characteristics.herokuapp.com/details/?dogBreed=${dogName}`))
                            .then((result) => {
                                allDogDetails.push(result.data);
                            });
                    }, this);
                    Promise.all(detailPromises)
                        .then(() => {
                            resolve(allDogDetails);
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const getBreedsBySize = (size, runningList) => {
        return $http.get(`https://dogbreed-characteristics.herokuapp.com/characteristic/?characteristic=${size}`)
            .then((results) => {
                results.data['breeds'].forEach(function(dogName) {
                    runningList.push(dogName);
                }, this);
            });
    }

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