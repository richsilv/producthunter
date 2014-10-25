HistoryController = RouteController.extend({
  waitOn: function () {
  	Meteor.subscribe('hunts/byId', _.pluck(Hunts.history(this.state.get('limit')), '_id'));
  },

  onRun: function() {
  	this.state.set('limit', 20);
  },

  data: function () {
  	return {
  		huntRecords: _.map(Hunts.history(this.state.get('limit')), function(hunt) {
  				return _.extend(hunt, Hunts.findOne(hunt._id));
  			})
  	}
  },

  action: function () {
    this.render();
  }
});