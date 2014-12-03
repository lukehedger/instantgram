/**
 * InstagramController
 *
 * @description :: Server-side logic for managing Instagrams
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	callback: function (req, res, next) {

		console.log("callback", req.query);

		if (req.query) {
			return req.query['hub.challenge'];
		}

		// InstagramService.callback(req.query).
		// 	then(function () {
		// 		console.log("ok");
		// 	}).
		// 	fail(function () {
		// 		console.log("error");
		// 	});
	}

};
