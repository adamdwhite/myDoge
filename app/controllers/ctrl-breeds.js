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
                $scope.breeds = allBreeds;
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