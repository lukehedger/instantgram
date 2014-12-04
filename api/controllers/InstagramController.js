/**
 * InstagramController
 *
 * @description :: Server-side logic for managing Instagrams
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	auth: function (req, res, next) {

		InstagramService.getAuthUrl().
			then(function (authUrl) {
				res.redirect(authUrl);
			});
	},

	subscribe: function (req, res, next) {

		InstagramService.createSubscription().
			then(function (result) {
				console.log(result);
				res.ok();
			}).
			fail(function (err) {
				sails.log.error(err);
				res.badRequest(err);
			});
	},
	},

	unsubscribe: function (req, res, next) {

		InstagramService.deleteSubscription(req.param("subscriptionId")).
			then(function (result) {
				console.log(result);
				res.ok();
			}).
			fail(function (err) {
				sails.log.error(err);
				res.badRequest(err);
			});
	},

	callback: function (req, res, next) {

		if (req.param("code")) {

			InstagramService.authorise(req.param("code")).
				then(function (data) {
					// TODO - handle data, save access_token to db
					sails.log(data);
					// TODO - get current subscriptions and render on view with subscriptionId (InstagramService.readSubscriptions())
					res.view("authorised");
				}).
				fail(function (err) {
					sails.log.error(err);
					res.badRequest(err);
				});
		} else if (req.param("hub.challenge")) {

			res.send(200, req.query['hub.challenge']);
		} else {

			InstagramService.callback(req.body).
				then(function(media) {
					// TODO - InstagramService.share(text, img)
					console.log("media", media);
				}).
				fail(function(err){
					sails.log.error(err);
					res.badRequest(err);
				});

			// TODO - does this fire straight away, without waiting for service promise
			console.log("here");
			// acknowledge POST within 2s timeout
			res.ok();
		}
	}
};
