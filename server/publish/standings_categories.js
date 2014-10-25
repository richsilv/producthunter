/*****************************************************************************/
/* StandingsCategories Publish Functions
/*****************************************************************************/

Meteor.publish('standings_categories', function () {
  return StandingsCategories.find();
});