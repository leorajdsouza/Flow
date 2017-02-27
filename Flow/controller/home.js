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



    // // .fromTemplate() method
    // var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

    // $scope.popover = $ionicPopover.fromTemplate(template, {
    //     scope: $scope
    // });

    // .fromTemplateUrl() method
    $ionicPopover.fromTemplateUrl('views/settings.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.popover = popover;
    });


    $scope.openPopover = function ($event) {
        $scope.popover.show($event);
    };
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });
    // Execute action on hidden popover
    $scope.$on('popover.hidden', function () {
        // Execute action
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function () {
        // Execute action
    });
    // document.addEventListener('onSMSArrive', function (e) {
    //     alert();
    //     $scope.log = "msg from 2nd" + JSON.stringify(e);

    //     SMS.stopWatch(onSuccess, onError);
    // });



    // function onSuccess(s) {
    //     console.log(s);
    // }
    // function onError(e) {
    //     console.log(e);
    // }


    //    SMS.startWatch(function () {
    //                 alert("started");
    //             }, function () {
    //                 alert("error");
    //             });

    //             if (SMS) {
    //                 SMS.sendSMS("9591231640", "START", function () {
    //                     $scope.log = "sent";
    //                 }, function () {
    //                     alert("error");
    //                 });
    //             }




});