/*
 * Add query methods like this:
 *  Hunts.findPublic = function () {
 *    return Hunts.find({is_public: true});
 *  }
 */
 Hunts.history = function(limit) {
 	var user = Meteor.user();
 	if (!user) return [];
 	return user.profile.hunt_history.sort(function(a, b) {
			return a.bought_at < b.bought_at;
		}).slice(0, limit);
 }