/*****************************************************************************/
/* Home: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Home.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.userSummary.helpers({

  points: function () {
    var user = Meteor.user();
    return user && user.profile.points;
  },

  week_ends: function() {
    var user = Meteor.user(),
        thisMoment = moment();
    if (user) return (thisMoment.day() === user.profile.week_ends) ?
      thisMoment.format("dddd DD MMM") :
      thisMoment.day(user.profile.week_ends + 7).format("dddd DD MMM");
  }

});

Template.liveHunts.helpers({

  liveHunts: function() {
    return Hunts.find({available: true}, {sort: {votes_count: -1}});
  }

});

Template.myHunts.helpers({

  myHunts: function() {
    var user = Meteor.user(),
        myHunts = user ? user.profile.live_hunts : [];
    return _.map(myHunts, function(hunt) {
      var thisHunt = Hunts.findOne(hunt._id);
      if (!thisHunt) return {};
      else return _.extend(thisHunt, hunt, {
        profit: thisHunt.points - (2 * hunt.bought_price),
        myHunt: true
      });
    }).sort(function(a, b) {return a.profit < b.profit;});
  }

});

Template.hunt.events({
  'click [data-action="buy"]:not(.disabled)': function () {
    confirmModal({
      header: "Purchase Hunt?",
      content: "<p>Are you sure you want to purchase this hunt for <strong>" +
               (this.points) + 
               "</strong> points? This includes the " + App.purchaseFee +
               " point purchase fee.",
      callback: function() {
        Meteor.call('hunts/purchase', this.hunt._id, function(err, res) {
          if (res) {
            $('.uk-modal').hide();
            $('html').removeClass('uk-modal-page');
            $('.uk-modal').remove();
          }
          else {
            $.UIkit.notify({
                message : 'An error occurred! ' + err,
                status  : 'danger',
                timeout : 5000,
                pos     : 'top-center'
            });
          }
        });
      },
      hunt: this
    });
  }
});

Template.hunt.helpers({
  affordable: function () {
    var user = Meteor.user();
    return user && this.points <= user.profile.points;
  }
});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.created = function () {
};

Template.Home.rendered = function () {
};

Template.Home.destroyed = function () {
};