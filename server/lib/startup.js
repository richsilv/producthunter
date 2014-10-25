var phRoot = 'https://api.producthunt.com/v1/',
	phToken = '5def860d4b60e2db4868b82c2f7369802d755ab6480e19477a05182bb9616109';

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
    return getPosts();
  }
});

Meteor.startup(function() {

	getPosts();
	SyncedCron.start();

});

function getPosts() {

	HTTP.get(phRoot + 'posts', {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + phToken
		},
		params: {
			'days_ago': 0
		}
	}, function(err, res) {
		var changedHunts = [];
		if (err) {
			throw new Meteor.Error(500, 'ProductHunt API Error', err);
		} else {
			res.data.posts.forEach(function (hunt) {
				hunt.points = hunt.votes_count + App.purchaseFee;
				var oldHunt = Hunts.findOne({id: hunt.id});
				if (oldHunt) {
					delete hunt.created_at;
					delete hunt.user;
					try {
						Hunts.update({id: hunt.id}, {$set: hunt});
					} catch(e) {
						console.log(Error, e, "at hunt", hunt, 'old hunt is', oldHunt);
					}
					changedHunts.push(oldHunt._id);
				} else {				
					hunt.created_at = new Date(hunt.created_at);
					hunt.added_at = new Date();
					if (hunt.user.created_at) hunt.user.created_at = new Date(hunt.user.created_at);
					Schema.phUsers.clean(hunt.user);
					Schema.Hunts.clean(hunt);
					Hunts.insert(hunt);
				}
			});
			var updatedUsers = Meteor.users.updatePoints({'profile.live_hunts._id': {$in: changedHunts}});
			console.log("Updated points for " + updatedUsers.length + " users");
			return res.data.posts.length;
		}
	});	

};

function dailyCron(date) {

	date = date || new Date();
	var oldDate = new Date(date);
	oldDate.setDate(date.getDate() - 1);
	var oldDateString = _.pad(oldDate.getFullYear(), 4, "0") + '-' + _.pad(oldDate.getMonth() + 1, 2,"0") + '-' + pad(oldDate.getoldDate(), 2, "0"),
		weekDay = date.getDay(),
		oldWeekDay = oldDate.getDay(),
		users = Meteor.users.find({'profile.week_ends': oldWeekDay}),
		hunts = Hunts.find({day: oldWeekDay});

	users.forEach(function(user) {
		var update = {},
			hunt_history = [],
			live_hunts = user.profile.live_hunts,
			medal = App.getMedal(user.points);
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
				points: user.profile.points
			},
			'profile.hunt_history': {$each: hunt_history}
		};
		update['$set'] = {
			'profile.live_hunts': [],
			'profile.points': App.defaultPoints,
			'profile.ave_points': (user.profile.total_points + user.profile.points) / (user.profile.total_weeks + 1)
		};
		update['$inc'] = {
			'profile.total_points': user.profile.points,
			'profile.total_weeks': 1
		};
		['gold', 'silver', 'bronze'].forEach(function (colour) {
			if (medal === colour) update['$inc']['profile.medals.' + colour] = 1;
		});

		Meteor.users.update(user, update);
	});

	hunts.forEach(function(hunt) {
		var update = {};
		update['$set'] = {
			available: false
		};
		Hunts.update(hunt, update);
	});

};