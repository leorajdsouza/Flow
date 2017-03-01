
app.factory("smsService", function (localStore) {
    return {
        send: function (txt,number) {

            if (localStore.get("sms") != null) {
                var count = parseInt(localStore.get("sms"));
                console.log(typeof count);
                count = count + 1;                 
                localStore.set("sms", count);
            } else {
                localStore.set("sms", 1);
            }
            // if (SMS) {
            //     SMS.sendSMS(number, txt, function () { 
            //         SMS.startWatch(onSuccess, onError);
            //         if (localStore.get("sms") != null) {
            //             var count = parseInt(localStore.get("sms"));
            //             console.log(typeof count);
            //             count = count + 1;
            //             localStore.set("sms", count);
            //         } else {
            //             localStore.set("sms", 1);
            //         }

            //     }, function () {
            //         alert("Error while sending sms.");
            //         SMS.stopWatch(onSuccess, onError);
            //     });
            // }
        }

    }

    function onSuccess(s) {
        console.log(s);
    }
    function onError(e) {
        console.log(e);
    }

});