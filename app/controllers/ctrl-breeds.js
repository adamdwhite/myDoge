"use strict";

console.log("here's the breed controller");


// var app = angular.module("myDoge App", []);

app.controller("breedCtrl",

    function(
        $scope,
        $q,
        $http,
        $window,
        $location,
        $filter,
        FBCreds,
        breedSearchFactory,
        userFactory
    ) {
        // $scope.breeds = [];

        breedSearchFactory.getBreedNames()
            .then(function(itemCollection) {
                // push items into the array for search functionality
                let breedArray = [];
                $scope.breeds = Object.keys(itemCollection);
                $scope.breeds.forEach((item) => {
                    breedArray.push(itemCollection[item]);
                });
                // console.log("breeds", itemCollection);
                $scope.breeds = breedArray;
            });


        // This is the SEARCH BAR and the $http it's calling from             
        $scope.setBreed = function(userInput) {
            console.log("setBreed function here", userInput);
            return $q((resolve, reject) => {
                $http.get(`https://dogbreed-characteristics.herokuapp.com/details/?dogBreed=${userInput}`)
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

        // This function will SEND breed object to a breed FACTORY
        let user = userFactory.getCurrentUser();

        $scope.breed = {
            image: "",
            name: "",
            description: "",
            uid: user

        };

        $scope.submitBreed = function() {
            console.log('SAVE breed clicked ');
            console.log('breed adding to user', $scope.breed);
            breedSearchFactory.sendBreed($scope.breed)
                .then((data) => {
                    $location.url("/task-list");
                });
        };
    }
);