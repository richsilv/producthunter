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
    'utility/dailyCron': function(password) {
        var correctPasswordObject = SecureData.findOne({
            key: "password"
        });
        if (correctPasswordObject && correctPasswordObject.value === password) {
            dailyCron();
        }
    },

    'utility/impersonate': function(userId, password) {
        var correctPasswordObject = SecureData.findOne({
            key: "password"
        });
        if (correctPasswordObject && correctPasswordObject.value === password) {
            check(userId, String);

            if (!Meteor.users.findOne(userId))
                throw new Meteor.Error(404, 'User not found');

            this.setUserId(userId);
        }
    }
});