/**
* InstagramService.js
*
* @description :: Service for dealing with Instagram
*/

var ig = require('instagram-node').instagram(),
    Q = require('kew');

var config = sails.config.instagram;

module.exports = {

  init: function () {

    console.log("init");

    ig.use({
      client_id: config.client_id,
      client_secret: config.client_secret
    });

    ig.add_user_subscription(config.subscribe_uri, function(err, result, remaining, limit) {
      console.log(err,result);
    });

  },

  callback: function (query) {

    console.log("callback");

    // TODO - need to check for GET or POST and handle accoringly
    // GET is for verification - return query['hub.challenge']
    // POST is for realtime update

  }
};
