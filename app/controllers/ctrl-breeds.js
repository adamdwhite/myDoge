"use strict";

console.log("here's the breed controller");


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
        $scope.isLoggedIn = function() {
            return userFactory.isAuthenticated();
        };

        breedSearchFactory.getAllBreeds()
            .then(function(allBreeds) {
                $scope.allBreeds = [];
                allBreeds.forEach(function(breedName) {
                    breedSearchFactory.getBreedDetails(breedName)
                        .then((breedDetails) => {
                            $scope.allBreeds.push(breedDetails);
                        });
                }, this);
            });


        let user = userFactory.getCurrentUser();

        // submit the SAVED breed to the user table
        $scope.saveBreed = function(breed) {
            var breedToSave = {
                image: breed.image,
                name: breed.name,
                description: breed.description,
                uid: user
            };
            console.log('SAVE breed clicked ');
            console.log('Adding this breed to user', breed);
            breedSearchFactory.saveBreed(breedToSave)
                .then((data) => {
                    $scope.breeds = data;
                    // $location.url("/dashboard");
                });
        };
    }
);