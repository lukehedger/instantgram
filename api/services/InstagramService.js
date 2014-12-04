/**
* InstagramService.js
*
* @description :: Service for dealing with Instagram
*/

var ig = require('instagram-node').instagram(),
    Q = require('kew'),
    async = require('async');

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

  createSubscription: function () {

    var defer = Q.defer();

    ig.add_user_subscription(config.redirect_uri, function(err, result, remaining, limit) {
      if (err) {
        // err.retry(); // retry ?
        defer.reject(err)
      } else {
        defer.resolve(result);
      }
    });

    return defer.promise;
  },
  },

  readSubscriptions: function () {

    var defer = Q.defer();

    ig.subscriptions(function(err, result, remaining, limit) {
      if (err) {
        // err.retry(); // retry ?
        defer.reject(err)
      } else {
        defer.resolve(result);
      }
    });

    return defer.promise;
  },

  deleteSubscription: function (id) {

    var defer = Q.defer();

    ig.del_subscription({ id: id }, function(err, subscriptions, remaining, limit) {
      if (err) {
        defer.reject(err)
      } else {
        defer.resolve(subscriptions);
      }
    });

    return defer.promise;
  },

  callback: function (body) {

    var defer = Q.defer();

    ig.media(body.data.media_id, function (err, media, remaining, limit) {
      if (err) {
        defer.reject(err)
      } else {
        defer.resolve(media);
      }
    });

    return defer.promise;
  },

  share: function (text, img) {

    var defer = Q.defer();

    // TODO - run as async tasks:
    // 1. post to Twitter (need a Twitter Service)
    // 2. post to Facebook (need a Facebook Service)

    return defer.promise;
  }
};
