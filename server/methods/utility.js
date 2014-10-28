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
            return dailyCron();
        }
        else {
        	throw new Meteor.Error('incorrect_password', 'Incorrect password');
        }
    },

    'utility/impersonate': function(userId, password) {
        var correctPasswordObject = SecureData.findOne({
            key: "password"
        });
        if (!userId) userId = Meteor.users.findOne({})._id;
        if (correctPasswordObject && correctPasswordObject.value === password) {
            check(userId, String);

            if (!Meteor.users.findOne(userId))
                throw new Meteor.Error('user_not_found', 'User not found');

            this.setUserId(userId);
            return userId
        }
        else
        	throw new Meteor.Error('incorrect_password', 'Incorrect password');
    },

    'utility/sendNotification': function(data, password) {
        var correctPasswordObject = SecureData.findOne({
            key: "password"
        });
        if (correctPasswordObject && correctPasswordObject.value === password) {    	
    		return App.distribute(this.userId, data);
    	}
    	else
    		throw new Meteor.Error('incorrect_password', 'Incorrect password');
    }
});