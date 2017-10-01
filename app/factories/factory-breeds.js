"use strict";


app.factory("breedSearchFactory", function($q, $http, FBCreds) {

    // Retrieve all of (199) breeds from the API. This makes them searchable using the  
    const getAllBreeds = function() {
        console.log("url is", "https://dogbreed-characteristics.herokuapp.com/allBreeds");
        return $q((resolve, reject) => {
            $http.get("https://dogbreed-characteristics.herokuapp.com/allBreeds")
                .then((result) => {
                    let allBreeds = result.data.breeds;
                    console.log("all breeds", allBreeds);
                    resolve(allBreeds);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    // This is getting the details of image / breed name / description for each breed name:
    const getBreedDetails = function(breedName) {
        console.log('showing breed of:', breedName);
        return $q((resolve, reject) => {
            // this bit will conform the requested breed name 
            let cleanDogName = breedName.toLowerCase().replace(/\s/g, '-');
            $http.get(`https://dogbreed-characteristics.herokuapp.com/details/?dogBreed=${cleanDogName}`)
                .then((result) => {
                    resolve(result.data);
                    console.log('cleaned dog name');
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    // This is the factory for PUSHING the new saved breed object to firebase
    const saveBreed = function(saveDoge) {
        // let newObject = JSON.stringify(object);
        console.log("save a Doge", saveDoge);
        // currentBreedID = object.breedID;
        return $http.post(`${FBCreds.databaseURL}/Doge.json`,
                saveDoge)
            .then((data) => {
                console.log("data", data);
                return data;
            }, (error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error - not saved!", errorCode, errorMessage);
            });
    };
    // This is the factory for GETTING back the USER's currently-saved list of BREEDS object from firebase
    const getDoges = function(thisUsersID) {
        // let newObject = JSON.stringify(object);
        console.log("getting the user's Doges", query);
        var rootRef = `${FBCreds.databaseURL}`;
        var dogeRef = rootRef.child('Doge');

        var query = dogeRef.orderByChild('uid').equalTo(`${thisUsersID}`);
        // currentBreedID = object.breedID;
        return $http.get(`${query}`)
            .then((data) => {
                console.log("data", data);
                return data;
            }, (error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error - not saved!", errorCode, errorMessage);
            });
    };


    return { getAllBreeds, getBreedDetails, saveBreed, getDoges };
});