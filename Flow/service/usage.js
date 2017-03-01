
app.factory("usage", function (localStore) {
    return {
        update: function (usage) {
            var currentday = new Date();
            var Usage = new Date(usage);
            var usageInMil = currentday - Usage;
            var minutes = Math.floor(usageInMil / 60000);
            updateTotal(minutes);
            updateWeek(minutes);
        }

    }

    function updateTotal(min) {
        
        if (localStore.get("total")) {
            var total = parseInt(localStore.get("total"));
            total = total + min;
            localStore.set("total", total);
        }else{
             localStore.set("total", 1);
        }
    }

    function updateWeek(min) {
        console.log(localStore.get("weeks"));
        // add in run method
        if (localStore.get("weeks") == null) {
            var weekObj = { "Monday": 0, "Tuesday": 0, "Wednesday": 0, "Thursday": 0, "Friday": 0, "Saturday": 0, "Sunday": 0 }
            localStore.set("weeks", JSON.stringify(weekObj));
        }

        if (localStore.get("weeks") != null) {
            var weekObj = JSON.parse(localStore.get("weeks"));
            console.log(weekObj);
            var weekArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            var today = new Date();
            var todayDaynum = today.getDay();
            //console.log(today.getDay());

            switch (todayDaynum) {
                case 0:
                    weekObj["Sunday"] = weekObj["Sunday"] + min;
                    break;
                case 1: weekObj["Monday"] = weekObj["Monday"] + min;
                    break;
                case 2:
                    weekObj["Tuesday"] = weekObj["Tuesday"] + min;
                    break;
                case 3:
                    weekObj["Wednesday"] = weekObj["Wednesday"] + min;
                    break;
                case 4:
                    weekObj["Thursday"] = weekObj["Thursday"] + min;
                    break;
                case 5:
                    weekObj["Friday"] = weekObj["Friday"] + min;
                    break;
                case 6:
                    weekObj["Saturday"] = weekObj["Saturday"] + min;
                    break;
            }
            localStore.set("weeks", JSON.stringify(weekObj));
        }



    }

});