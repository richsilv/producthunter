var Future = Meteor.npmRequire('fibers/future'),
    gcmAuthorization = SecureData.findOneProperty({'key': 'gcmAuthorization'}, 'value');

_.extend(App, {

    medalThresholds: {
        bronze: 500,
        silver: 1000,
        gold: 2000
    },

    getMedal: function(points) {
        return _.reduce(App.medalThresholds, function(s, k, i) {
            return points >= k ? i : s;
        }, null);
    },

    maxUsers: 1000

});