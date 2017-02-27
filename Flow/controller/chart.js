app.controller('chartCtrl', function ($scope) {


    //gridLines
//https://jsfiddle.net/o534w6jj/1/
//https://i.stack.imgur.com/TZpib.png


    // $scope.labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    //   $scope.series = ['Series A', 'Series B'];

    //   $scope.data = [
    //     [65, 59, 80, 81, 56, 55, 40] 
    //   ];


    $scope.labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    //$scope.labels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    $scope.series = ['Hours '];
    $scope.data = [
        [2, 2, 9, 3, 4, 2, 1]
    ];

    $scope.colors = [
        {
            backgroundColor: "rgba(239,123,71, 0.1)",
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

    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.options = {
       scales: {
            xAxes: [{ 
                gridLines: {
                    display: false,
                },
                ticks: {
                  fontColor: "#fff", // this here
                },
            }],
            yAxes: [{
                 id: 'y-axis-1',
                display: false,
                gridLines: {
                    display: false,
                },
            }],
        }

        // scales: {
        //     yAxes: [
        //         {
        //             id: 'y-axis-1',
        //             type: 'linear',
        //             display: true,
        //             position: 'left',
        //             gridLines: {
        //                 display: false,
        //             },
        //             ticks: {
        //                 fontColor: "#fff", // this here
        //             },
        //         },
        //         {
        //             id: 'y-axis-2',
        //             type: 'linear',
        //             display: false,
        //             position: 'right',
        //             lineColor: "blue",


        //         }
        //     ]
        // }



    };
});