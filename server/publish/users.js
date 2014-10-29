/*****************************************************************************/
/* Users Publish Functions
/*****************************************************************************/

Meteor.publish('users/me', function() {
    return Meteor.users.find(this.userId);
});

Meteor.publish('users/top_medals', function() {
    return Meteor.users.find({}, {
        sort: {
            'medals.gold': -1,
            'medals.silver': -1,
            'medals.bronze': -1
        },
        limit: 20
    });
});

Meteor.publish('users/top_current', function() {
    return Meteor.users.find({}, {
        sort: {
            'profile.points': -1
        },
        limit: 20
    });
});

Meteor.publish('users/top_total', function() {
    return Meteor.users.find({}, {
        sort: {
            'profile.total_points': -1
        },
        limit: 20
    });
});

Meteor.publish('users/top_ave', function() {
    return Meteor.users.find({}, {
        sort: {
            'profile.ave_points': -1
        },
        limit: 20
    });
});