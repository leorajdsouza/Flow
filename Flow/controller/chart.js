app.controller('chartCtrl', function ($scope, localStore) {
    //boardcast chart update when stop event triggers

    //gridLines
    //https://jsfiddle.net/o534w6jj/1/
    //https://i.stack.imgur.com/TZpib.png

    $scope.labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    $scope.series = ['Minutes '];
    $scope.totalFlow = resetClock(0);
    $scope.todayFlow = resetClock(0);
    $scope.weekTotal = resetClock(0);
    console.log($scope.totalFlow);
    $scope.data = [
        [0, 0, 0, 0, 0, 0, 0]
    ];
    $scope.sms = 0;
    $scope.totalDay = 0;

    var weekArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var weekObj = JSON.parse(localStore.get("weeks"));


    if (localStore.get("weeks") != null) {

        //today update
        var todayToday = new Date();
        var todayDaynum = todayToday.getDay();
        $scope.todayFlow = resetClock(weekObj[weekArray[todayDaynum]]);

        //Week updates
        var data = [getMin(0), getMin(1), getMin(2), getMin(3), getMin(4), getMin(5), getMin(6)];
        $scope.data = [data];
        var weekCount = 0;
        for (var i = 0; i < data.length; i++) {
            weekCount = weekCount + weekObj[weekArray[i]];
        }

        // var weekDate = new Date();
        // weekDate.setHours(0);
        // weekDate.setSeconds(0);
        // $scope.weekTotal = weekDate.setMinutes(weekCount);

        $scope.weekTotal = formatTime(weekCount);
    }

    if (localStore.get("total") != null) {
        $scope.totalFlow = formatTime(parseInt(localStore.get("total")));
    }

    //sms count 
    if (localStore.get("sms") != null) {
        $scope.sms = localStore.get("sms");
    }

    function formatTime(min) {
        var seconds = (min * 60);
        var hours = parseInt(seconds / 3600);
        seconds = seconds % 3600;
        var minutes = parseInt(seconds / 60);
        seconds = seconds % 60;
        return hours + " Hr " + minutes + " Min";
    }
    function getMin(index) {
        //  var today = new Date(new Date().setHours(0,0,0,0));
        // today.setHours(0);
        // today.setSeconds(0);
        // today.setMinutes(weekObj[weekArray[index]]);
        return weekObj[weekArray[index]];

    }
    function resetClock(min) {
        var today = new Date();
        today.setHours(0);
        today.setSeconds(0);
        today.setMinutes(min);
        return today;
    }
 
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

    };

});