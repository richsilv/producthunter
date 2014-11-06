var Future = Meteor.npmRequire('fibers/future'),
    gcmAuthorization = SecureData.findOneProperty({'key': 'gcmAuthorization'}, 'value');

_.extend(App, {

    medalThresholds: {
        bronze: 500,
        silver: 1000,
        gold: 2000
    },

    getMedal: function(points) {
        return _.reduce(App.medalThresholds, function(s, k, i) {
            return points >= k ? i : s;
        }, null);
    },

    maxUsers: 1000,

    distribute: function(userCursor, data) {
        var userCount = 0;
        if (typeof userCursor === 'string') userCursor = Meteor.users.find(userCursor);
        if (typeof userCursor === "object" && userCursor._id) userCursor = Meteor.users.find(userCursor._id);
        if (!userCursor) return null;
        var headers = {
            	'Content-Type': 'application/json',
            	'Authorization': gcmAuthorization
        	},
        	url = "https://android.googleapis.com/gcm/send";
        userCursor.forEach(function(user) {
            console.log("Distributing " + data + " to user " + user.profile.name);
            var payload = {
            		registration_ids: [user.regid],
            		data: data
            	};
            HTTP.post(url, {headers: headers, data: payload});
            userCount ++;
        });
        return userCount;
    }

});