/**
 * InstagramController
 *
 * @description :: Server-side logic for managing Instagrams
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	callback: function (req, res, next) {

		console.log("callback", req);

		// InstagramService.callback(req.query).
		// 	then(function () {
		// 		console.log("ok");
		// 	}).
		// 	fail(function () {
		// 		console.log("error");
		// 	});
	},

	subscribe: function (req, res, next) {

		console.log("subscribe", req.query);

		if (req.query['hub.challenge']) {
			console.log(req.query['hub.challenge']);
			return req.query['hub.challenge'];
		}
	}

};
