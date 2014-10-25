/*****************************************************************************/
/* Standings: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Standings.events({
  'click [data-category]': function(event, template) {
    Router.current().state.set(template.$(event.currentTarget).data('category'), this);
  }
});

Template.Standings.helpers({
  categoryList: function() {
    return StandingsCategories.find();
  },
  isActive: function(catDetails) {
    return catDetails && catDetails.cat && this._id === catDetails.cat._id;
  }
});

Template.standing.helpers({
  getStat: function (category) {
    return this.profile[category];
  }
});

/*****************************************************************************/
/* Standings: Lifecycle Hooks */
/*****************************************************************************/
Template.Standings.created = function () {
};

Template.Standings.rendered = function () {
};

Template.Standings.destroyed = function () {
};