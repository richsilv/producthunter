Mongo.Collection.prototype.findOneProperty = function(query, property) {
	var doc = this.findOne(query);
	return doc ? doc[property] : null;
};
