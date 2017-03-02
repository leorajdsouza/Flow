
app.factory("debug", function (localStore) {
    return {
        alert: function (msg) {
            var isDebug = localStore.get("debug");
            if ((isDebug.toLowerCase() === 'true')) {
                alert(msg);
            }

        }
    }
});