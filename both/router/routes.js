/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.onBeforeAction(function() {
	if (!Meteor.user()) {
		this.redirect('login');
	}
	this.next();
}, {except: ['login', 'help']});

Router.onBeforeAction(function() {
	if (Meteor.user()) {
		this.redirect('home');
	}
	this.next();
}, {only: ['login']});

/*
 *  Example:
 *  Router.route('/', {name: 'home'});
*/

Router.route('/home', {name: 'home'});
Router.route('/standings', {name: 'standings'});
Router.route('/history', {name: 'history'});
Router.route('/profile', {name: 'profile'});
Router.route('/login', {name: 'login'});
Router.route('/', {
	name: 'root',
	onBeforeAction: function() {
		this.redirect('home');
	}
});
Router.route('/help', {name: 'help'});
