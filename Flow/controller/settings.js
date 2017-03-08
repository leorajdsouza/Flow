app.controller('settingsCtrl', function ($scope, $ionicPopup, localStore, $rootScope) {
    $scope.data = {};

    $scope.settingsChange = function () {
        console.log('settingsStats  Change');
        localStore.set("debug", $scope.settingsDebug.checked);
        localStore.set("settingsSMS", $scope.settingsSMS.checked);
        $rootScope.$broadcast('usageUpdated', true);
    };

    $scope.settingsUsage = { checked: true };
    // $scope.settingsSMS = { checked: true };
    $scope.settingsDebug = { checked: false };

    if (localStore.get("settingsSMS") != null) {
        if (localStore.get("settingsSMS") == "false") {
            $scope.settingsSMS = { checked: false };
        } else {
            $scope.settingsSMS = { checked: true };
        }

    }

    $scope.changeNumber = function () {
        var myPopup = $ionicPopup.show({
            template: '<input type="tel" class="pad10" ng-model="data.flowNumber">',
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
                        if ($scope.data.flowNumber.length == 10) {
                            localStore.set("flowNumber", $scope.data.flowNumber);
                        } else {
                            //return $scope.mobileNumber;
                            if ($scope.data.flowNumber.length != 10) {
                                alert("Invalid Mobile Number");
                            }
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