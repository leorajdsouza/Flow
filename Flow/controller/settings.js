app.controller('settingsCtrl', function ($scope, $ionicPopup, localStore) {
    $scope.data = {};

    $scope.settingsChange = function () {
        console.log('settingsStats  Change');
        localStore.set("debug", $scope.settingsDebug);

    };

    $scope.settingsUsage = { checked: true };
    $scope.settingsSMS = { checked: true };
    $scope.settingsDebug = { checked: false };

    $scope.changeNumber = function () {
        var myPopup = $ionicPopup.show({
            template: '<input type="text" class="pad10" ng-model="data.flowNumber">',
            title: 'Mobile Number',
            scope: $scope,
            buttons: [
                {
                    text: 'Cancel',
                    onTap: function (e) {
                        if (!localStore.get("flowNumber")) {
                            e.preventDefault();
                        }

                    }
                },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        if ($scope.data.flowNumber.length > 9) {
                            localStore.set("flowNumber", $scope.data.flowNumber);
                        } else {
                            //return $scope.mobileNumber;
                            e.preventDefault();
                        }
                    }
                }
            ]
        });
    }

    if (localStore.get("flowNumber")) {
        console.log(localStore.get("flowNumber"));
        $scope.data.flowNumber = localStore.get("flowNumber");
    } else {
        $scope.data.flowNumber = "";
        $scope.changeNumber();
    }



});