var phRoot = 'https://api.producthunt.com/v1/',
	phToken = SecureData.findOneProperty({'key': 'phToken'}, 'value'),
	googleAppsProjectNumber = SecureData.findOneProperty({'key': 'googleAppsProjectNumber'}, 'value'),
	gcmKey = SecureData.findOneProperty({'key': 'gcmKey'}, 'value'),
	Future = Meteor.npmRequire('fibers/future'),
	HUNT_THRESHOLD = SecureData.findOneProperty({'key': 'huntThreshold'}, 'value') || 100;

SyncedCron.add({
	name: 'Daily process',
	schedule: function(parser) {
		return parser.text('at 05:00 am');
	},
	job: function() {
		return dailyCron();
	}
});

SyncedCron.add({
	name: 'Reload Hunts',
	schedule: function(parser) {
		return parser.text('every 1 mins');
	},
	job: function() {
		posts = [];
		for (var i = 0; i < 7; i++)
			posts.push(getPosts(i));
		return posts;
	}
});

Meteor.startup(function() {

	getPosts();
	SyncedCron.start();

});

function getPosts(daysAgo) {

	var fut = new Future();

	HTTP.get(phRoot + 'posts', {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + phToken
		},
		params: {
			'days_ago': daysAgo || 0
		}
	}, function(err, res) {
		var changedHunts = [],
			thresholdHunts = [];
		if (err) {
			fut.throw(new Meteor.Error(500, 'ProductHunt API Error', err));
		} else {
			res.data.posts.forEach(function(hunt) {
				hunt.points = hunt.votes_count + App.purchaseFee;
				var oldHunt = Hunts.findOne({
					id: hunt.id
				});
				if (oldHunt) {
					delete hunt.created_at;
					delete hunt.user;
					try {
						Hunts.update({
							id: hunt.id
						}, {
							$set: hunt
						});
					} catch (e) {
						console.log(Error, e, "at hunt", hunt, 'old hunt is', oldHunt);
					}
					changedHunts.push(oldHunt._id);
					if (Math.floor(hunt.votes_count / HUNT_THRESHOLD) > Math.floor(oldHunt.votes_count / HUNT_THRESHOLD)) {
						thresholdHunts.push({
							_id: oldHunt._id,
							name: oldHunt.name,
							threshold: Math.floor(hunt.votes_count / HUNT_THRESHOLD) * HUNT_THRESHOLD
						});
					}
				} else {
					hunt.created_at = new Date(hunt.created_at);
					hunt.added_at = new Date();
					if (hunt.user.created_at) hunt.user.created_at = new Date(hunt.user.created_at);
					Schema.phUsers.clean(hunt.user);
					Schema.Hunts.clean(hunt);
					Hunts.insert(hunt);
				}
			});
			var updatedUsers = Meteor.users.updatePoints({
				'profile.live_hunts._id': {
					$in: changedHunts
				}
			});
			console.log("Updated points for " + updatedUsers.length + " users");
			console.log(thresholdHunts.length.toString() + " hunts have reached a new threshold");
			_.each(thresholdHunts, function(huntObject) {
				App.distribute(Meteor.users.find({
					'profile.live_hunts._id': huntObject._id,
					'regid': {
						$exists: true
					}
				}), {
					title: "Notification from Product Hunter",
					message: "Your hunt " + huntObject.name + " has reached " + huntObject.threshold + " votes"
				});
			});
			fut.return(res.data.posts.length);
		}
	});
	return fut.wait();

};

dailyCron = function(date) {

	date = date || new Date();
	var oldDate = new Date(date);
	oldDate.setDate(date.getDate() - 1);
	var oldDateString = _.pad(oldDate.getFullYear(), 4, "0") + '-' + _.pad(oldDate.getMonth() + 1, 2, "0") + '-' + _.pad(oldDate.getDate(), 2, "0"),
		weekDay = date.getDay(),
		oldWeekDay = oldDate.getDay(),
		users = Meteor.users.find({
			'profile.week_ends': oldWeekDay
		}),
		hunts = Hunts.find({
			day: oldDateString
		}),
		usersCount = 0,
		huntsCount = 0;

	users.forEach(function(user) {
		var update = {},
			hunt_history = [],
			live_hunts = user.profile.live_hunts,
			medal = App.getMedal(user.points - App.defaultPoints);
		live_hunts.forEach(function(hunt) {
			var thisHunt = Hunts.findOne(hunt._id);
			_.extend(hunt, {
				week_end_price: thisHunt.votes_count,
				profit: thisHunt.votes_count - hunt.bought_price
			});
			hunt_history.push(hunt);
		});
		update['$push'] = {
			'profile.week_history': {
				week_ended: oldWeekDay,
				points: user.profile.points - App.defaultPoints
			},
			'profile.hunt_history': {
				$each: hunt_history
			}
		};
		update['$set'] = {
			'profile.live_hunts': [],
			'profile.points': App.defaultPoints,
			'profile.ave_points': (user.profile.total_points + user.profile.points - App.defaultPoints) / (user.profile.total_weeks + 1)
		};
		update['$inc'] = {
			'profile.total_points': user.profile.points - App.defaultPoints,
			'profile.total_weeks': 1
		};
		['gold', 'silver', 'bronze'].forEach(function(colour) {
			if (medal === colour) update['$inc']['profile.medals.' + colour] = 1;
		});

		usersCount += Meteor.users.update(user._id, update);

		if (medal) App.distribute(user, {
			message: "Congratulations, you've won a " + medal + " medal this week with " + (user.profile.points - App.defaultPoints) + " points!"
		});
		else App.distribute(user, {
			message: "Your week has ended with a total score of " + (user.profile.points - App.defaultPoints) + "points."
		});
	});

	hunts.forEach(function(hunt) {
		var update = {};
		update['$set'] = {
			available: false
		};
		huntsCount += Hunts.update(hunt, update);
	});

	return {
		hunts: huntsCount,
		users: usersCount
	};

};