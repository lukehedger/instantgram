/**
 * InstagramController
 *
 * @description :: Server-side Instagrams
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

			InstagramService.callback(req.body[0]).
				then(function(media) {
					// console.log("media", media);
					var text = media.caption ? media.caption : "",
							img = media.images.standard_resolution;

					InstagramService.share(text, img).
						then(function(results){
							console.log(results);
						}).
						fail(function(err){
							console.log(err);
						});
				}).
				fail(function(err){
					sails.log.error(err);
					res.badRequest(err);
				});

			// acknowledge POST within 2s timeout
			res.ok();
		}
	}
};
