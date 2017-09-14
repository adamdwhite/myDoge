"use strict";

app.controller("navCtrl", function($scope, $window, userFactory, filterFactory) {

    //these are functions to be injected
    $scope.searchText = filterFactory;
    $scope.isLoggedIn = false;

    //On page load, it's going to look for a user - if there is a user, it will show, if not, 
    //it will kick back to the login page
    $scope.logout = () => {
        userFactory.logOut();
    };

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $scope.isLoggedIn = true;
            console.log("currentUser logged in?", user);
            console.log("logged in t-f", $scope.isLoggedIn);
            $scope.$apply();
            $window.location.href = "#!/login";
        } else {
            $scope.isLoggedIn = false;
            console.log("user logged in?", $scope.isLoggedIn);
            $window.location.href = "#!/login";
        }
    });
});