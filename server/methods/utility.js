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
  	var correctPasswordObject = SecureData.findOne({key: "password"});
  	if (correctPasswordObject && correctPasswordObject.value = password) {
  		dailyCron();
  	}
  }
});