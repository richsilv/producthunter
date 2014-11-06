/*****************************************************************************/
/* Utility Methods */
/*****************************************************************************/

Meteor.methods({
 /*
  * Example:
  *  '/app/utility/update/email': function (email) {
  *    Users.update({_id: this.userId}, {$set: {'profile.email': email}});
  *  }
  *
  */
    'utility/impersonate': function(userId, password) {
        if (!userId) {
            var user = Meteor.users.findOne({});
            if (user) userId = user._id;
            else throw new Meteor.Error('no_users', 'No users in database');
        }
        check(userId, String);

        if (!Meteor.users.findOne(userId))
            throw new Meteor.Error('user_not_found', 'User not found');

        Meteor.connection.setUserId(userId);
        return userId
    }

});