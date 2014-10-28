var Future = Meteor.npmRequire('fibers/future');

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

    distribute: function(user, data) {
        if (typeof user === 'string') user = Meteor.users.findOne(user);
        if (!user || !user.regid) return false;
        var headers = {
            	'Content-Type': 'application/json',
            	'Authorization': 'key=AIzaSyBcytT1f2LWB-ENpd-gJxlrzmx2vAhchl0'
        	},
        	url = "https://android.googleapis.com/gcm/send",
        	payload = {
        		registration_ids: [user.regid],
        		data: data
        	},
        	fut = new Future();
        HTTP.post(url, {headers: headers, data: payload}, function(err, res) {
        	if (err) fut.throw(err);
        	else fut.return(res);
        });
        return fut.wait();
    }

});