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


        // This function will SEND a new object to FACTORY, using the 
        let user = userFactory.getCurrentUser();

        $scope.breeds = {
            image: "",
            name: "",
            description: "",
            uid: user
        };
        // submit the SAVED breed 
        $scope.submitBreed = function() {
            console.log('SAVE breed clicked ');
            console.log('Adding this breed to user', $scope.breeds);
            breedSearchFactory.submitBreed($scope.breeds)
                .then((data) => {
                    $scope.breeds.push(data);
                    // $location.url("/dashboard");
                });
        };
    }
);