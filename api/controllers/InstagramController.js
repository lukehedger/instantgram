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

		// TODO - deleteSubscriptions -> then/fail
		InstagramService.createSubscription().
			then(function (result) {
				console.log(result);
				res.ok();
			}).
			fail(function (err) {
				sails.log.error(err);
			});
	},

	callback: function (req, res, next) {

		if (req.param("code")) {

			InstagramService.authorise(req.param("code")).
				then(function (data) {
					// TODO - handle data, save access_token to db
					sails.log(data);
					res.view("authorised");
				}).
				fail(function (err) {
					sails.log.error(err);
				});
		} else if (req.param("hub.challenge")) {

			console.log("subscription GET callback", req.query);
			res.send(200, req.query['hub.challenge']);
		} else {

			console.log("callback", req);
			res.ok();
		}
	}
};
