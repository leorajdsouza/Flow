app.controller('chartCtrl', function ($scope) {

    $scope.labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    //$scope.labels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    $scope.series = ['Hours '];
    $scope.data = [
        [4, 2, 5, 9, 7, 2, 8]
    ];

    $scope.colors = [
        {
            backgroundColor: "transparent",
            pointBackgroundColor: "#EF7B47",
            pointHoverBackgroundColor: "rgba(159,204,0, 0.8)",
            borderColor: "#EF7B47",
            pointBorderColor: '#fff',
            pointHoverBorderColor: "rgba(159,204,0, 1)"
        }, "rgba(250,109,33,0.5)", "#9a9a9a", "rgb(233,177,69)"
    ];

    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
    $scope.options = {
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: false, 
                    
                }
            ]
        }, 
        showLine:false,
        steppedLine:false,
        pointBorderWidth: 20
    };
});