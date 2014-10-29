HomeController = RouteController.extend({
  waitOn: function () {
  },

  data: function () {
  	return {
  		mini: this.state.get('mini')
  	}
  },

  onBeforeAction: function() {
  	this.state.set('mini', App.mini);
  	this.next();
  },

  action: function () {
    this.render();
  }
});