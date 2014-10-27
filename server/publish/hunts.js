/*****************************************************************************/
/* Hunts Publish Functions
/*****************************************************************************/

Meteor.publish('hunts/current', function() {
    return Hunts.find({
        available: true
    });
});

Meteor.publish('hunts/live', function() {
    var user = Meteor.users.findOne(this.userId),
        live_hunts = _.pluck(user.live_hunts, '_id');
    query = {
        id: {
            $in: historyIds
        }
    };
    return Hunts.find(query);
});

Meteor.publish('hunts/user', function(query, options) {
    var user = Meteor.users.findOne(this.userId),
        historyIds = _.pluck(user.hunt_history, '_id');
    query = query || {};
    query._id = {
        $in: historyIds
    };
    return Hunts.find(query, options);
});

Meteor.publish('hunts/byId', function(huntIds) {
    return Hunts.find({
        _id: {
            $in: huntIds
        }
    });
});