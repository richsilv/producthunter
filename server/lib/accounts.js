Accounts.onCreateUser(function(options, user) {
	if (Meteor.users.find().count() >= App.maxUsers) throw new Meteor.Error("too_many_users");
	if (options.profile) {
		user.profile = options.profile;
	}
	user.profile.week_ends = Math.floor(Math.random()*7);
	Schema.Users.clean(user);
	return user;
})