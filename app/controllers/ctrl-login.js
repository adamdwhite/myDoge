"use strict";

app.controller("loginCtrl", function($scope, $window, userFactory, $location, $q, FBCreds) {

    console.log("control-user has loaded!");

    $scope.account = {
        email: "",
        password: ""
    };

    $scope.register = () => {
        console.log("you clicked on register");
        userFactory.register({
                email: $scope.account.email,
                password: $scope.account.password
            })
            .then((userData) => {
                console.log("User controller newUser", userData);
                $scope.logIn();
            }, (error) => {
                console.log("error creating new user", error);
            });
    };

    $scope.logIn = () => {
        userFactory.logIn($scope.account)
            .then(() => {
                //Option One
                // $location.path("/dashboard");
                //need to update the view
                // $scope.$apply();
                //Option TWO
                $window.location.href = "#!/";
            });
    };

    let logout = () => {
        console.log("logout clicked");
        userFactory.logOut()
            .then(function() {
                console.log("logged out DONE");
                //no need to redirect since isAuth verifies login and will take care of re-direction
                $location.href = "#!/";
            }, function(error) {
                console.log("error occured on logout");
            });
    };

    $scope.loginGoogle = () => {
        console.log("you clicked on google login");

        userFactory.authWithProvider()
            .then((result) => {
                let user = result.user.uid;
                $location.path("/dashboard");
                $scope.$apply();
            }).catch((error) => {
                console.log("error with google login");
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("errors", errorCode, errorMessage);
            });
    };

    // when first loaded, make sure no one is logged in
    console.log("what is this?", userFactory.isAuthenticated());
    // if (userFactory.isAuthenticated())
    //     logout();

    // console.log("app isAuth", isAuth());
    // if (isAuth()) {
    //     console.log("app isAuth", isAuth());
    // }


});