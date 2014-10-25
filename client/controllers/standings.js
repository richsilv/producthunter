StandingsController = RouteController.extend({
    waitOn: function() {
        var cat1 = this.state.get('category1');
        var cat2 = this.state.get('category2');
        cat1 && Meteor.subscribe('users/' + cat1.subscription);
        cat2 && Meteor.subscribe('users/' + cat2.subscription);
    },

    onRun: function() {
    	var _this = this;
        Tracker.autorun(function(c) {
        	if (subscriptions.standingsCategories.ready()) {
	            var cat1 = StandingsCategories.findOne();
	            var cat2 = cat1 && StandingsCategories.findOne({
	                name: {
	                    $ne: cat1.name
	                }
	            });
	            _this.state.set('category1', cat1);
	            _this.state.set('category2', cat2);
	            c.stop();
            }
        })
    },

    data: function() {
        var cat1 = this.state.get('category1');
        var cat2 = this.state.get('category2');
        return {
            category1: {
                cat: cat1,
                users: cat1 && Meteor.users.find({}, {sort: cat1.sort})
            },
            category2: {
                cat: cat2,
                users: cat2 && Meteor.users.find({}, {sort: cat2.sort})
            }
        }
    },

    action: function() {
        this.render();
    }
});