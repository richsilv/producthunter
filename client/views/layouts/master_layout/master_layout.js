/*****************************************************************************/
/* MasterLayout: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.MasterLayout.events({

	'click [data-link]': function(event, template) {
		Router.go(template.$(event.currentTarget).data('link'));
	}

});

Template.Topbar.helpers({

  mainMenu: function() {
  	var route = Router.current().route.getName();
  	return _.map(App.mainMenu, function(item) {
  		var _item = _.clone(item);
  		if (_item.route === route) _item.active = true;
  		return _item;
  	});
  },

  status: function() {
    var user = !!Meteor.user();
    return !(user || this.user) || (user && this.user) || (this.user === -1); 
  }

});

Template.confirmModal.events({
  'click [data-action="confirm"]': function (event, template) {
    this.callback && this.callback.apply(this, $(event.currentTarget));
  },
  'click [data-action="cancel"]': function (event, template) {
    var modal = $.UIkit.modal(".uk-modal");
    modal && modal.hide();
  }
});

/*****************************************************************************/
/* MasterLayout: Lifecycle Hooks */
/*****************************************************************************/
Template.MasterLayout.created = function () {
};

Template.MasterLayout.rendered = function () {
};

Template.MasterLayout.destroyed = function () {
};

templateAttach = function(template, callback, data) {
  var instance;
  if (typeof template === "string") template = Template[template];
  if (!template) return false;
  if (data)
    instance = Blaze.renderWithData(template, data, document.body);
  else
    instance = Blaze.render(template, document.body);
  return callback && callback.call(this, instance);
};

confirmModal = function(options, postRender) {
  templateAttach(
    Template.confirmModalWrapper, 
    function(instance) {
      var modal = $.UIkit.modal(".uk-modal");
      modal.on({
        'uk.modal.hide': function() {
          $('.uk-modal').remove();
        }
      });
      modal.show();
      postRender && postRender.call(instance, options);
    },
    _.extend({
      content: '',
      header: '',
      callback: null,
      noButtons: false
    }, options)
  );
};