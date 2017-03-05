
//to do

// store font offline *done
// intercept msg
// week stats *done
// debug alert
// update following week days to zero - use loop * test pending
// reset stats on first launch *
// set sec to min while setting min in local storage -- no required
// what if total hour exceeds 24hr ? reset after 30days *done , test pending
//chart date and hr format 20 hr 2 min *done
// reset date like todayflow - if no data available 1:0:0:0 *done
//change bg color of message box *done
// if timer count is in sec convert to 1 min and save *done
//---------------

// bug while saving time to localstorage stores only 1 min
//use list sms - start nd stop
//stop flowcode
//set localstorage to default value in config
// test with start ans stop sms
//test in low end phones 
//live status of motor
//notification sticky untill pump is off
//debugging test
// add beta feature mode in appconfig , to access pump verify features - based on it disable sms status verify



app.controller('homeCtrl', function ($scope, $timeout, $ionicLoading, $ionicPlatform, $ionicPopover, localStore, $state, usage, smsService, notification) {
    var mobileNumber = "";
    $scope.log = "Stopped";
    if (localStore.get("flowNumber")) {
        mobileNumber = localStore.get("flowNumber");
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
            usage.update(timeCapsule());
            $scope.stopFlow();
            $scope.status = "";
            $scope.countDown = "00:00:00";
            $timeout(function(){
                 $scope.countDown = "00:00:00";
            },1000);
            $scope.btnStatus = "START";
            notification.clear();
        } else {

            notification.show();

            //send sms and wait for confirmation then trigger timer
            // $ionicLoading.show({
            //     template: 'Please wait, while sending signal to PUMP'
            // });
            //$ionicLoading.hide();

            //check if timer is already running, then sinal was sent to pump

            if (localStorage.getItem("flowTime") == null) {
                smsService.send(appMsg.start, mobileNumber);
            }

            // smsService.list(function (msgs) {
            //     console.log(msgs);
            // });

            $scope.btnStatus = "STOP";
            $scope.status = "RUNNING";
            var flowStartTime = timeCapsule();
            // check pump status
            //  updateStatus(appMsg.start);

            function timeNow() {
                var tempTime = new Date();
                var difference = tempTime.getTime() - flowStartTime.getTime();
                $scope.countDown = new Date(difference);
                if (localStorage.getItem("flowTime") != null) {
                    $scope.timerCtrl = $timeout(timeNow, 1000);
                }
            }
            timeNow();
        }
    }

    function isRunning() {
        //start flow if running
        if (localStorage.getItem("flowTime") != null) {
            $scope.startFlow();
        }
    }

    $scope.stopFlow = function () {
        $timeout.cancel($scope.timerCtrl);
        $scope.timerCtrl = undefined;
        resetTime();
        smsService.send(appMsg.stop, mobileNumber);

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


    function onSuccess(s) {
        console.log(s);
    }
    function onError(e) {
        console.log(e);
    }

    var msgs = [
        {
            "address": "+919591231640",
            "date": 1488430379890,
            "date_sent": 1488430380000,
            "reply_path_present": 0,
            "body": "2 PUMP ON "
        },
        {

            "address": "JM-JIOOTP",
            "date": 1488384511760,
            "date_sent": 1488384509000,
            "reply_path_present": 0,
            "body": "59705 is your One Time Password(OTP) for +918660865067. Please enter the OTP to continue registration for Jio4GVoice.",

        }
    ]


    function getStatus(status) {

        // call sms list service
        angular.forEach(msgs, function (value, key) {
            //  this.push(key + ': ' + value);          
            //var test = "2 PUMP ON DATE:17/07/07";

            //get date from local storage 
            //get mobile number from local storage 
            var startDate = new Date(localStorage.getItem("flowTime"));
            var msgDate = new Date(value.date);
            console.log("****************");
            console.log(startDate);
            console.log(msgDate);

            if ("+91" + mobileNumber == value.address) {
                if ("+91" + mobileNumber == value.address) {
                    //  console.log(value.body);

                    // filter sms by date 
                    // for (var i = 0; i < Object.keys(SMSReply).length; i++) { 
                    // }

                    if (textLike(value.body, SMSReply.pumpON)) {
                        //currentStatus = appMsg.pumpON;
                        currentStatus = appMsg.start;
                    } else if (textLike(value.body, SMSReply.pumpOff)) {
                        //currentStatus = SMSReply.pumpOff;
                        currentStatus = appMsg.stop;
                        //} else if (textLike(value.body, SMSReply.on)) {
                        currentStatus = appMsg.start;
                        currentStatus = SMSReply.on;
                    } else if (textLike(value.body, SMSReply.off)) {
                        //currentStatus = SMSReply.off;
                        currentStatus = appMsg.stop;
                    }
                    //$scope.log = currentStatus;
                    if (localStorage.getItem("flowTime") == null && currentStatus == "START") {
                        //stop timer , pump not running
                        alert("Seems like PUMP is not Running.");
                        $scope.stopFlow();
                        //show custom alert
                    }
                    if (localStorage.getItem("flowTime") != null && currentStatus == "STOP") {
                        alert("Seems like PUMP is not Running.");
                        $scope.stopFlow();
                    }

                    // stopped & on -->> off pump
                    // stopped & off ->> no action required
                    // started & on ->>  no action 
                    // started & off ->> on it  
                }
            }

        }, []);


    }

    function textLike(body, str) {
        if (body.search(str) == -1) {
            return false;
        } else {
            return true;
        }
    }

    function updateStatus(status) {
        getStatus(status);
    }

});