StandingsCategories = new Mongo.Collection('standings_categories', {
	transform: function(doc) {
		doc.sort = _.reduce(doc.sort, function(memo, val, oldKey) {memo[oldKey.replace(/#/g, '.')] = val; return memo;}, {});
		return doc;
	}
});
/*
 * Add query methods like this:
 *  StandingsCategories.findPublic = function () {
 *    return StandingsCategories.find({is_public: true});
 *  }
 */