gcmAuthorization = Meteor.isServer ? SecureData.findOneProperty({'key': 'gcmAuthorization'}, 'value') : null;

console.log("gcmAuthorization is " + gcmAuthorization);

App.notificationClient = new NotificationClient({
	senderId: "626012802452",
	gcmAuthorization: gcmAuthorization
});