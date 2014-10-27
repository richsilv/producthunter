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
        liveHunts = user && _.pluck(user.profile.live_hunts, '_id');
    query = {
        _id: {
            $in: liveHunts
        }
    };
    return Hunts.find(query);
});

Meteor.publish('hunts/user', function(query, options) {
    var user = Meteor.users.findOne(this.userId),
        historyIds = user && _.pluck(user.profile.hunt_history, '_id');
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