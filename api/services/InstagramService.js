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
  },

  getAuthUrl: function() {

    var authUrl = ig.get_authorization_url(config.redirect_uri, {
      scope: config.scope
    });

    return Q.resolve(authUrl);
  },

  authorise: function(code) {

    var defer = Q.defer();

    ig.authorize_user(code, config.redirect_uri, function (err, result) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(result);
      }
    });

    return defer.promise;
  },

  deleteSubscriptions: function () {

    var defer = Q.defer();

    ig.del_subscription({ all: true }, function(err, subscriptions, remaining, limit) {
      console.log(err, subscriptions);
      if (err) {
        defer.reject(err)
      } else {
        defer.resolve(subscriptions);
      }
    });

    return defer.promise;
  },

  createSubscription: function () {

    var defer = Q.defer();

    ig.add_user_subscription(config.redirect_uri, function(err, result, remaining, limit) {
      console.log(err, result);
      // TODO - error alerts -> email service
      if (err) {
        // retry ?
        // err.retry();
        defer.reject(err)
      } else {
        defer.resolve(result);
      }
    });

    return defer.promise;
  },

  callback: function (data) {

    // TODO - handle insta realtime data -> get text/img url and post to twitter/FB
    console.log("IGService callback", data);
  }
};
