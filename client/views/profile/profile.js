/*****************************************************************************/
/* Profile: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Profile.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Profile.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

Template.profileButtons.events({
  'click [data-action="logout"]': function () {
    Meteor.logout();
  },
  'click [data-action="delete-account"]': function() {
    confirmModal({
      header: 'Delete Account?',
      content: 'Your live data and history will be permanently deleted.',
      callback: function() {
        Meteor.call('users/deleteMe');
        $('.uk-modal').hide();
        $('html').removeClass('uk-modal-page');
        $('.uk-modal').remove();
      }
    });
  }
});

/*****************************************************************************/
/* Profile: Lifecycle Hooks */
/*****************************************************************************/
Template.Profile.created = function () {
};

Template.Profile.rendered = function () {
};

Template.Profile.destroyed = function () {
};