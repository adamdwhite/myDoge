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
        // 

        $scope.dogUID = breedSearchFactory.getDoges().then(dataObj => {
            thisGuy = dataObj;
            console.log("here are my doges", thisGuy);
        });

        let user = userFactory.getCurrentUser();

        $scope.myDoges = [];

        // $scope.myDoges = breedSearchFactory.getDoges();

        // end Dependecy Func 
    });