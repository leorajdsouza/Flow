
app.factory("smsService", function (localStore) {
    return {
        send: function (txt, number) {

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
            //        // SMS.stopWatch(onSuccess, onError);
            //     localStorage.removeItem('flowTime');
            //     });
            // }
        },
        list: function (callback) {
            var msg;
            var filter = {
              //  box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

                // following 4 filters should NOT be used together, they are OR relationship
               read: 0, // 0 for unread SMS, 1 for SMS already read
                //  _id: '', // specify the msg id
               //address: '9591231640', // sender's phone number
                body: 'starr', // content to match
               // service_center: "+919591231640",
                // following 2 filters can be used to list page up/down
                indexFrom: 0, // start from index 0
                maxCount: 10, // count of SMS to return each time
            };
            if (SMS) {

                SMS.listSMS({}, function (data) {
                    // updateStatus('sms listed as json array');
                    //  updateData(JSON.stringify(data));

                    if (Array.isArray(data)) {
                        for (var i in data) {
                            var sms = data[i];
                        }
                    }
                    msg = sms;
                    console.log(JSON.stringify(data));

                }, function (err) {
                    alert('error list sms: ' + err);
                    msg = { error: false };
                });

                callback(msg);
            }
        }

    }

    function onSuccess(s) {
        console.log(s);
    }
    function onError(e) {
        console.log(e);
    }

});