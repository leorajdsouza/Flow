app.controller('homeCtrl', function ($scope, $interval, $ionicLoading, $ionicPlatform) {


    document.addEventListener('onSMSArrive', function (e) {
        var sms = e.data;
        //alert(sms.address);

    });

    

    $scope.countDown = "00:00:00";
    $scope.status = "";
    $scope.timerCtrl = undefined;
    $scope.btnStatus = "START";

    $scope.startFlow = function (signal) {

        if (angular.isDefined($scope.timerCtrl) && (localStorage.getItem("flowTime") == null || signal == "STOP")) {
            //send stop signal to water pump  in stop flow
            $scope.stopFlow();
            $scope.status = "";
            $scope.btnStatus = "START";
        } else {
            //send sms and wait for confirmation then trigger timer
            $ionicLoading.show({
                template: 'Please wait, while sending signal to PUMP'
            });
            if (SMS) SMS.sendSMS("9591231640", "START", function () {
                $ionicLoading.hide();

            }, function () {

                $ionicLoading.hide();
            });



            $scope.btnStatus = "STOP";
            $scope.status = "RUNNING";
            var flowStartTime = timeCapsule();
            console.log(flowStartTime);
            function timeNow() {
                var tempTime = new Date();
                var difference = tempTime.getTime() - flowStartTime.getTime();
                $scope.countDown = new Date(difference);
            }

            $scope.timerCtrl = $interval(timeNow, 1000);
        }
    }

    //isRunning();
    function isRunning() {
        //start flow if running
        if (localStorage.getItem("flowTime") != null) {
            $scope.startFlow();
        }
    }

    $scope.stopFlow = function () {
        if (angular.isDefined($scope.timerCtrl)) {
            $interval.cancel($scope.timerCtrl);
            $scope.timerCtrl = undefined;
            $scope.countDown = "00:00:00";
            resetTime();
        }
    };

    $scope.$on('$destroy', function () {
        $scope.stopFlow();
    });

    $ionicPlatform.on('resume', function () {
        isRunning();
    });

    isRunning();

    function timeCapsule() {
        if (localStorage.getItem("flowTime") == null) {
            var flowStartTime = new Date();
            localStorage.setItem('flowTime', flowStartTime);
            return flowStartTime;
        } else {
            return new Date(localStorage.getItem("flowTime"));
        }
    }

    function resetTime() {
        localStorage.removeItem('flowTime');
    }


});