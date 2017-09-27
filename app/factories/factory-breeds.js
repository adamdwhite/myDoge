"use strict";

// This is the factory for the GET from the data set of all dog breed names 
app.factory("breedSearchFactory", function($q, $http, FBCreds) {


    const getAllBreeds = function() {
        console.log("url is", "https://dogbreed-characteristics.herokuapp.com/allBreeds");
        return $q((resolve, reject) => {
            $http.get("https://dogbreed-characteristics.herokuapp.com/allBreeds")
                .then((result) => {
                    let allBreeds = result.data;
                    console.log("all breeds", allBreeds);
                    resolve(allBreeds);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    //         let currentBreedID = null;
    //         console.log('breed search-bar factory!');
    //         let getBreedNames = () => {
    //             return $q((resolve, reject) => {
    //                 let allBreedNames = [];

    //                 // This is the SEARCH factory and the $http it's calling from...            
    //                 const setBreed = function(userInput) {
    //                     console.log("setBreed function here", userInput);
    //                     $http.get(`https://dogbreed-characteristics.herokuapp.com/details/?dogBreed=${userInput}`)
    //                         .then((itemObject) => {
    //                             let itemCollection = itemObject.data;
    //                             console.log("breeds from search", itemCollection);
    //                             // $scope.breeds = itemCollection;
    //                             // console.log('scope breeds', $scope.breeds);
    //                         })
    //                         .catch((error) => {
    //                             console.log('ERROR setbreed');
    //                         });
    //                 };


    //                 const getAllBreeds = (breeds) => {
    // return $http.get(`https://dogbreed-characteristics.herokuapp.com/allBreeds`)

    //                     // ***** This is the back-up of all breeds from the local combined-breeds.json file
    //                     // ('data/combined-breeds.json')
    //                     // console.log('get breeds by size from combined-breeds.json', getBreedsBySize)

    //                     .then((results) => {
    //                         results.data.breeds.forEach(function(dogName) {
    //                             runningList.push(dogName);
    //                         }, this);
    //                     });

    //                 };

    //                 // An array of promises which will start by pushing results into the "runningList"
    //                 // Promise.all([
    //                         getAllBreeds('breeds', allBreedNames),
    //                         // getBreedsBySize('medium', allBreedNames),
    //                         // getBreedsBySize('size', allBreedNames)
    //                     ])
    //                 //     // Once all of the above are retrieved, then promises are generated for every breed available (#199), and details are pushed to allDogDetails
    //                 //     .then(() => {
    //                 //         console.log("breeds from search", allBreedNames);
    //                 //         let detailPromises = [];
    //                 //         let allDogDetails = [];
    //                 //         allBreedNames.forEach(function(dogName) {
    //                 //             // The url is expecting the dog names to be lower case and spaces are represented with dashes, therefore:
    //                 let cleanDogName = dogName.toLowerCase().replace(/\s/g, '-');
    //                 detailPromises.push($http.get(`https://dogbreed-characteristics.herokuapp.com/details/?dogBreed=${cleanDogName}`)
    //                     .then((result) => {
    //                         allDogDetails.push(result.data);
    //                     }));
    //             }, this);

    //             //     Promise.all(detailPromises)
    //             //         .then(() => {
    //             //             resolve(allDogDetails);
    //             //         });
    //             // }

    //             .catch((error) => {
    //                 reject(error);
    //             });

    //             // This is the factory for PUSHING the saved breed object to firebase
    //             const saveBreed = function(object) {
    //                 let newObject = JSON.stringify(object);
    //                 console.log("object.breedID", object.breedID);
    //                 currentBreedID = object.breedID;
    //                 return $http.post(`${FBCreds.databaseURL}/Doge.json`,
    //                         newObject)
    //                     .then((data) => {
    //                         console.log("data", data);
    //                         return data;
    //                     }, (error) => {
    //                         let errorCode = error.code;
    //                         let errorMessage = error.message;
    //                         console.log("error", errorCode, errorMessage);
    //                     });
    //             });
    //     };
    return { getAllBreeds };
});