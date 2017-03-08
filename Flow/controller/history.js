app.controller('historyCtrl', function ($scope) {
    $scope.history = [];
    $scope.loadHistory = function () {

        $scope.history = flowHistory;
        console.log($scope.history);
    }
    $scope.$on("historyUpdated", function (event, args) {
        if (args) {
            $scope.loadHistory();
        }
    });
    $scope.loadHistory();
});