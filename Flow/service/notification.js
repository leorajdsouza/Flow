
app.factory("notification", function ($ionicPlatform) {
    return {
        show: function () { 
            
            $ionicPlatform.ready(function () {
                cordova.plugins.notification.local.schedule({
                    id: 1,
                    text: "Water Pump is running.",
                    //sound: isAndroid ? 'file://sound.mp3' : 'file://beep.caf',
                    ongoing: true,
                    icon: 'file://img/icon.png' 
                });
            });
        },
        clear: function () {
            $ionicPlatform.ready(function () {
                cordova.plugins.notification.local.clearAll(function () {
                    console.log("done");
                }, this);
            });
        }

    }
});