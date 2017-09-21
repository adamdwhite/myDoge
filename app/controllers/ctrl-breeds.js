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

        // This function will SEND breed object to a breed FACTORY
        let user = userFactory.getCurrentUser();

        $scope.breed = {
            image: "",
            name: "",
            description: "",
            uid: user

        };
        // submit the SAVED breed and redirect to the user "dashboard"
        $scope.submitBreed = function() {
            console.log('SAVE breed clicked ');
            console.log('breed adding to user', $scope.breed);
            breedSearchFactory.setBreed($scope.breed)
                .then((data) => {
                    $location.url("/dashboard");
                });
        };
    }
);