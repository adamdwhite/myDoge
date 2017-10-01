'use strict';

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
        $scope.huh = new firebase(FBCreds.databaseURL).startAt('Lhe30woNEoOipUocmBnR7WbEfK92').endAt('Lhe30woNEoOipUocmBnR7WbEfK92').once('value', function(snap) {
            console.log('???', snap.val());
        })

        let user = userFactory.getCurrentUser();

        $scope.myDoges = [];

        $scope.myDoges = breedSearchFactory.getDoges();

        // End Denpency Func 
    });