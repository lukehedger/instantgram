/**
 * InstagramController
 *
 * @description :: Server-side Instagrams
 */

var minId = 0;

module.exports = {

	auth: function (req, res, next) {

		InstagramService.getAuthUrl().
			then(function (authUrl) {
				res.redirect(authUrl);
			});
	},

	subscribe: function (req, res, next) {

		var object = req.param("object"),
				aspect = req.param("aspect");

		if (object == "user") {
			InstagramService.createUserSubscription().
				then(function (result) {
					success(result);
				}).
				fail(function (err) {
					error(err);
				});
		} else if (object == "tag") {
			InstagramService.createTagSubscription(aspect).
				then(function (result) {
					success(result);
				}).
				fail(function (err) {
					error(err);
				});
		} else if (object == "geography") {
			var split = aspect.split(","),
					lat = split[0],
					lng = split[1];
			InstagramService.createGeographySubscription(lat, lng, 100).
				then(function (result) {
					success(result);
				}).
				fail(function (err) {
					error(err);
				});
		}

		function success(result) {
			// TODO - handle subscription success on client/view
			console.log(result);
			res.ok();
		}

		function error(err) {
			sails.log.error(err);
			res.badRequest(err);
		}
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
					res.view("authorised", {
							instagramId: data.user.id
					});
				}).
				fail(function (err) {
					sails.log.error(err);
					res.badRequest(err);
				});
		} else if (req.param("hub.challenge")) {

			res.send(200, req.query['hub.challenge']);
		} else {

			var body = req.body[0],
					object = body.object;

			if (object == "user") {
				InstagramService.getUserMediaRecent(body.data.media_id).
					then(function(media) {
						share(media);
					}).
					fail(function(err){
						error(err);
					});
			} else if (object == "tag") {
				InstagramService.getTagMediaRecent(body.object_id).
					then(function(media) {
						share(media[0]);
					}).
					fail(function(err){
						error(err);
					});
			} else if (object == "geography") {
				InstagramService.getGeographyMediaRecent(body.object_id, minId).
					then(function(media) {
						minId = media[0].id;
						share(media[0]);
					}).
					fail(function(err){
						error(err);
					});
			}

			// acknowledge POST within 2s timeout
			res.ok();

			function share(media) {

				console.log(object, media);
				var text = media.caption ? media.caption.text : "",
						img = media.images.standard_resolution.url || media.images.low_resolution.url;

				InstagramService.share(text, img).
					then(function(results){
						// console.log(results);
						res.ok();
					}).
					fail(function(err){
						// sails.log.error(err);
					});
			}

			function error(err) {
				sails.log.error(err);
				res.badRequest(err);
			}
		}
	}
};
