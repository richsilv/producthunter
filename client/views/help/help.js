/*****************************************************************************/
/* Help: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Help.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Help.helpers({

  defaultPoints: function() {
    return App.defaultPoints;
  },
  purchaseFee: function() {
    return App.purchaseFee
  }

});

/*****************************************************************************/
/* Help: Lifecycle Hooks */
/*****************************************************************************/
Template.Help.created = function () {
};

Template.Help.rendered = function () {
};

Template.Help.destroyed = function () {
};