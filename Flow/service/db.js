
/* local Storage*/
app.factory("localStore", function () {
    return {
        set: function (key, val) {  
            localStorage.setItem(key, val);
            console.log("stored to local storage");
        },
        get: function (key) {
            var val = localStorage.getItem(key);
            return val;
        },
        remove: function (key) {
            localStorage.removeItem(key);
        }

    }
});