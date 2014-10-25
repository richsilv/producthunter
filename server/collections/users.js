Schema.Medals = new SimpleSchema({
	score: {
		type: Number,
		defaultValue: 0
	},
	gold: {
		type: Number,
		defaultValue: 0
	},
	silver: {
		type: Number,
		defaultValue: 0
	},
	bronze: {
		type: Number,
		defaultValue: 0
	}
});

Schema.UserProfile = new SimpleSchema({
	name: {
		type: String
	},
	week_ends: {
		type: Number,
		min: 0,
		max: 6,
		defaultValue: 0
	},
	points: {
		type: Number,
		min: 0,
		defaultValue: App.defaultPoints
	},
	live_hunts: {
		type: [Object],
		blackbox: true,
		defaultValue: []
	},
	hunt_history: {
		type: [Object],
		blackbox: true,
		defaultValue: []
	},
	week_history: {
		type: [Object],
		blackbox: true,
		defaultValue: []
	},
	medals: {
		type: Schema.Medals
	},
	total_points: {
		type: Number,
		defaultValue: 0
	},
	ave_points: {
		type: Number,
		defaultValue: 0
	},
	total_weeks: {
		type: Number,
		defaultValue: 0
	}

})

Schema.Users = new SimpleSchema({
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    }
});

Meteor.users.attachSchema(Schema.Users);

Meteor.users.updatePoints = function(query) {

	users = Meteor.users.find(query);

	return users.map(function(user) {
		var points = App.defaultPoints;
		_.each(user.profile.live_hunts, function(hunt) {
			var thisHunt = Hunts.findOne(hunt._id);
			points += thisHunt.votes_count - hunt.bought_price;
		});

		console.log("Updating points to " + points);
		Meteor.users.update(user, {$set: {'profile.points': points}});
		return points;	
	});

}

Meteor.users.allow({
	insert: function (userId, doc) {
		return false;
	},
	update: function (userId, doc, fields, modifier) {
		return false;
	},
	remove: function (userId, doc) {
		return false;
	}
});