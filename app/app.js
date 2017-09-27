"use strict";

const app = angular.module("myDoge App", ["ngRoute"]);

let isAuth = function(userFactory) {
    new Promise((resolve, reject) => {
        console.log("userFactory is calling", userFactory);
        userFactory.isAuthenticated()
            .then((userExists) => {
                if (userExists) {
                    console.log("Authenticated, go ahead");
                    resolve();
                } else {
                    console.log("Authentication reject, GO AWAY");
                    reject();
                }
            });
    });
};


app.config(($routeProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/splash.html',
            controller: 'splashCtrl',
        })
        .when('/item/breedSearch', {
            templateUrl: 'partials/splash.html',
            controller: 'breedCtrl',
        })

    .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'loginCtrl',
    })

    .when('/about', {
        templateUrl: 'partials/about.html',
        controller: 'aboutCtrl',
    })

    .when('/dashboard', {
            templateUrl: 'partials/dashboard.html',
            controller: 'dashboardCtrl',
            resolve: { isAuth }
        })
        .when('/item/newQA', {
            templateUrl: 'partials/new-QA.html',
            controller: 'newQACtrl',
            // resolve: { isAuth }
        })
        .when('/dashboard/savedQA', {
            templateUrl: 'partials/dashboard.html',
            controller: 'savedQACtrl',
            resolve: { isAuth }
        })
        .when('/dashboard/savedBreeds', {
            templateUrl: 'partials/dashboard.html',
            controller: 'savedBreedsCtrl',
            resolve: { isAuth }
        })
        .otherwise('/');
});

app.run(($location, FBCreds) => {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.apiKey,
        authDomain: creds.authDomain,
        databaseURL: creds.databaseURL
    };

    firebase.initializeApp(authConfig);
});

app.run(function($rootScope) {
    $rootScope.showSearch = false;
});