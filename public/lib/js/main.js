/**
 *  Module
 *
 * Description
 */
var app = angular.module('ngEditor', ['textAngular', 'ngSanitize', 'toastr']);

app.controller('textEditorCtrl', ['$scope', '$sce', '$timeout', 'toastr', function($scope, $sce, $timeout, toastr) {
    // var socket = io.connect("http://10.10.7.219:3000");
    var socket = io.connect("http://10.10.7.219:3000");

    socket.on("changedValue", function(data) {
        // console.log(data);
        var temp = $sce.trustAsHtml(data.data);
        $scope.$evalAsync(function(scope) {
            scope.htmlVariable = temp;
        });
    });

    socket.on("userAdded", function(data) {
        $scope.$evalAsync(function(scope) {
            if(data.joined !== $scope.userName) {
                toastr.success(data.joined + " has joined.");
            }
            scope.allUsers = data.allUsers;
        });
    });

    socket.on("userLeft", function(data) {
        angular.forEach($scope.allUsers, function(user, idx) {
            $scope.discIdx = user.name == data.left ? idx : '';
        });
        console.log($scope.discIdx);
        if(data.left) {
            toastr.warning(data.left + " has left.");
        }
        $scope.$evalAsync(function(scope) {
            $timeout(function() {
                scope.allUsers = data.allUsers;
            }, 1000);
        });
         console.log(data);
    });

    socket.on("addExistingContent", function(data) {
       $scope.$evalAsync(function(scope) {
            scope.allUsers = data.allUsers;
       });
    });

    $scope.addMe = function() {
        if (!$scope.userName) {
            return;
        }
        socket.emit("addUser", {
            name: $scope.userName
        });
        $scope.isUserAdded = true;
    };

    $scope.change = function(text) {
        socket.emit("triggerChange", {
            inputvalue: text
        });
    }
}]);
