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
        $scope.huh = [];

        $scope.huh = breedSearchFactory.getDoges();
        // console.log('???', snap.val());


        let user = userFactory.getCurrentUser();

        $scope.myDoges = [];

        $scope.myDoges = breedSearchFactory.getDoges();

        // End Denpency Func 
    });