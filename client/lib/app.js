/*****************************************************************************/
/* Client App Namespace  */
/*****************************************************************************/
_.extend(App, {
	mainMenu: [
		{
			route: 'login',
			icon: 'sign-in',
			user: 0
		},
		{
			route: 'home',
			icon: 'home',
			user: 1
		},
		{
			route: 'standings',
			icon: 'list-ul',
			user: 1
		},
		{
			route: 'history',
			icon: 'history',
			user: 1
		},
		{
			route: 'help',
			icon: 'question',
			user: -1,
		},
		{
			route: 'profile',
			icon: 'user',
			user: 1
		}
	],
	subscriptions: {
	}
});

App.helpers = {
	formatDate: function(date) {
		return moment(date).format('ddd DD MMM YY');
	},
	positive: function(num) {
		return num >= 0;
	},
	exists: function(property) {
		return property in this;
	}
};

_.each(App.helpers, function (helper, key) {
  Handlebars.registerHelper(key, helper);
});