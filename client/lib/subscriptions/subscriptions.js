subscriptions = {};

Tracker.autorun(function() {

	subscriptions.hunts = Meteor.subscribe('hunts/current');
	subscriptions.thisUser = Meteor.subscribe('users/me');
	subscriptions.standingsCategories = Meteor.subscribe('standings_categories')

});