"use strict";



app.controller("dashboardCtrl",

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
        let thisGuy = [];
        $scope.myDoges = [];
        // 

        $scope.dogUID = breedSearchFactory.getDoges()
            .then(dataObj => {
                $scope.myDoges = dataObj;
                thisGuy = dataObj;
                // console.log("here are my doges", thisGuy);
            });

        // DELETE the SAVED DOG from the DASHBOARD:
        $scope.deleteBreed = function(dog, index) {

            console.log('DELETE breed clicked ');
            console.log('Deleting this breed from user', dog);
            breedSearchFactory.deleteBreed(dog.id)
                .then((data) => {
                    $scope.myDoges.splice(index, 1);
                    // console.log("response from firebase", data);
                    // $location.url("#!/dashboard");

                });
        };

        let user = userFactory.getCurrentUser();


        // end Dependecy Func 
    });