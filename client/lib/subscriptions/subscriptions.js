subscriptions = {};

Tracker.autorun(function() {

	subscriptions.hunts = Meteor.subscribe('hunts/current');
	subscriptions.thisUser = Meteor.subscribe('users/me');
	subscriptions.myHunts = Meteor.subscribe('hunts/live');
	subscriptions.standingsCategories = Meteor.subscribe('standings_categories');

});