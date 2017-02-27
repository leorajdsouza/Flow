app.controller('homeCtrl', function ($scope, $interval, $ionicLoading, $ionicPlatform, $ionicPopover, localStore, $state) {

    if (localStore.get("flowNumber")) {
        var mobileNumber = localStore.get("flowNumber");
    } else {
        $state.go("tabs.settings");
    }
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
            // $ionicLoading.show({
            //     template: 'Please wait, while sending signal to PUMP'
            // });
            //$ionicLoading.hide();

            sendSignal(function () {
                alert("sent");
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

    // isRunning();

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

    function isFlowRunning() {

    }

    function sendSignal(callback) {
        if (SMS) {
            SMS.stopWatch(onSuccess, onError);
            SMS.startWatch(onSuccess, onError)
            sendSMS("START", callback());
        }

    }

    $ionicPlatform.on('onSMSArrive', function (e) {
        $scope.log = "msg from 2nd" + JSON.stringify(e);
        SMS.stopWatch(onSuccess, onError);
    });

    function onSuccess(s) {
        console.log(s);
    }
    function onError(e) {
        console.log(e);
    }
    function sendSMS(msg, callback) {
        SMS.sendSMS("9591231640", msg, function () {
            $scope.log = "sent";
            callback();
        }, function () {
            alert("Error while sending sms.");
        });
    }


});