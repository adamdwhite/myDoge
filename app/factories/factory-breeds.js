"use strict";


app.factory("breedSearchFactory", function($q, $http, FBCreds) {

    // PART 1 -- Retrieve all of (199) breeds from the API 
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

    // PART 2 -- Get the details of image / breed name / description for each breed name:

    const getBreedDetails = function(breedName) {
        // console.log('showing breed of:', breedName);
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


    // Factory for PUSHING the new saved breed object to firebase

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


    // Factory for GETTING back the USER's currently-saved list of BREEDS object from firebase
    // (need to include the ugly Id rather than relying on the dog.name)
    const getDoges = function() {
        return $http.get(`${FBCreds.databaseURL}/Doge.json`)
            .then((data) => {
                var allMyDogs = {};
                var theseDoges = [];
                for (var key in data.data) {
                    if (data.data[key].uid === 'Lhe30woNEoOipUocmBnR7WbEfK92') {
                        allMyDogs[key] = data.data[key];
                    }
                }

                let dogCollection = allMyDogs;
                // console.log("dogCollection", dogCollection);

                Object.keys(dogCollection).forEach((key) => {
                    dogCollection[key].id = key;
                    theseDoges.push(dogCollection[key]);
                });
                return theseDoges;
            }, (error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error - not saved!", errorCode, errorMessage);
            });
    };

    // Factory allowing user to DELETE each breed from DASHBOARD:
    const deleteBreed = function(fbid) {
        console.log('fbid', fbid);

        return $q((resolve, reject) => {
            return $http.delete(`${FBCreds.databaseURL}/Doge/${fbid}.json`)

            .then((data) => {
                    console.log('data', data);
                    resolve();
                })
                .catch((error) => {
                    console.log('Deleting error', error);
                    reject(error);
                });
        });
    };

    return { getAllBreeds, getBreedDetails, saveBreed, getDoges, deleteBreed };
});