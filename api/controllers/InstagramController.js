/**
 * InstagramController
 *
 * @description :: Server-side logic for managing Instagrams
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	callback: function (req, res, next) {

		console.log("callback");
		res.send(200);

		// TODO - what data do we get, need to pass this to InstagramService
		// console.log(req.query);
		//
		// InstagramService.callback(req.query).
		// 	then(function () {
		// 		console.log("ok");
		// 	}).
		// 	fail(function () {
		// 		console.log("error");
		// 	});
	},

	user: function (req, res, next) {
		console.log("user");
		res.send(200);
	}

};
