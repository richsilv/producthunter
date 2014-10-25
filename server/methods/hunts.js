/*****************************************************************************/
/* Hunts Methods */
/*****************************************************************************/
Future = Meteor.npmRequire('fibers/future');

Meteor.methods({

	'hunts/purchase': function(hunt) {
		var user = Meteor.users.findOne(this.userId),
			fut = new Future();		
		if (typeof hunt === 'string') hunt = Hunts.findOne(hunt);
		if (!user) throw new Meteor.Error("No user");
		if (!hunt) throw new Meteor.Error("Cannot find hunt");
		if (user.profile.points < hunt.points) throw new Meteor.Error("Insufficient points");
		Meteor.users.update(this.userId, {
			$inc: {
				'profile.points': -hunt.points
			},
			$push: {
				'profile.live_hunts': {
					id: hunt.id,
					_id: hunt._id,
					bought_at: new Date(),
					bought_price: hunt.points
				}
			}
		}, function(err, res) {
			Hunts.update(hunt._id, {
				$inc: {
					buyers: 1
				}
			});
			fut.return(!!res);
		});
		return fut.wait();
	}

});