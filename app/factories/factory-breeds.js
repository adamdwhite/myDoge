"use strict";

// This is the factory for the GET from the data set of all dog breed names 
app.factory("breedSearchFactory", function($q, $http, FBCreds) {
    let currentBreedID = null;
    console.log('breed search-bar factory!');
    let getBreedNames = () => {
        return $q((resolve, reject) => {
            let allBreedNames = [];
            // An array of promises which will start by pushing results into the "runningList"
            Promise.all([
                    getBreedsBySize('small', allBreedNames),
                    getBreedsBySize('medium', allBreedNames),
                    getBreedsBySize('size', allBreedNames)
                ])
                // Once all of the above are retrieved, then 
                // promises are generated for each breed (#199), and details are pushed to allDogDetails
                .then(() => {
                    console.log("breeds from search", allBreedNames);
                    let detailPromises = [];
                    let allDogDetails = [];
                    allBreedNames.forEach(function(dogName) {
                        // The url is expecting the dog names to be lower case and spaces are represented with dashes
                        let cleanDogName = dogName.toLowerCase().replace(/\s/g, '-');
                        detailPromises.push($http.get(`https://dogbreed-characteristics.herokuapp.com/details/?dogBreed=${cleanDogName}`)
                            .then((result) => {
                                allDogDetails.push(result.data);
                            }));
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