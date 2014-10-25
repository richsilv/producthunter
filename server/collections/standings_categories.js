/*
 * Add query methods like this:
 *  StandingsCategories.findPublic = function () {
 *    return StandingsCategories.find({is_public: true});
 *  }
 */
StandingsCategories.allow({
  insert: function (userId, doc) {
    return false;
  },

  update: function (userId, doc, fieldNames, modifier) {
    return false;
  },

  remove: function (userId, doc) {
    return false;
  }
});

StandingsCategories.deny({
  insert: function (userId, doc) {
    return false;
  },

  update: function (userId, doc, fieldNames, modifier) {
    return false;
  },

  remove: function (userId, doc) {
    return false;
  }
});