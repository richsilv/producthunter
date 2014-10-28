if (Meteor.isCordova) {

    Tracker.autorun(function(c) {

        if (Meteor.user()) {

            var pushNotification = window.plugins.pushNotification;
            pushNotification.register(Cordova.successHandler, Cordova.errorHandler, {
                "senderID": "626012802452",
                "ecb": "Cordova.onNotificationGCM"
            });
            c.stop();

        }

    });

    Cordova = {
        successHandler: function(data) {
            console.log("Success: " + JSON.stringify(data));
        },
        errorHandler: function(e) {
            console.log("Error " + e);
        },
        onNotificationGCM: function(res) {
        	console.log(res);
            if (res.event === 'registered') {
                Meteor.users.update(Meteor.userId(), {
                    $set: {
                        regid: res.regid
                    }
                });
            } else if (res.event === 'message') {
            	if (res.foreground) {
					$.UIkit.notify({
					    message : res.payload.message,
					    status  : 'info',
					    timeout : 0,
					    pos     : 'top-center'
					});
            	}
            }
        }
    }
}