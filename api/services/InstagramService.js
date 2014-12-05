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

  createUserSubscription: function () {

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

  createTagSubscription: function (tag) {

    var defer = Q.defer();

    ig.add_tag_subscription(tag, config.redirect_uri, function(err, result, remaining, limit) {
      if (err) {
        // err.retry(); // retry ?
        defer.reject(err)
      } else {
        defer.resolve(result);
      }
    });

    return defer.promise;
  },

  createGeographySubscription: function (lat, lng, radius) {

    var defer = Q.defer();

    ig.add_geography_subscription(lat, lng, radius, config.redirect_uri, function(err, result, remaining, limit) {
      if (err) {
        // err.retry(); // retry ?
        defer.reject(err)
      } else {
        defer.resolve(result);
      }
    });

    return defer.promise;
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

  getUserMediaRecent: function (media_id) {

    var defer = Q.defer();

    ig.media(media_id, function (err, media, remaining, limit) {
      if (err) {
        defer.reject(err)
      } else {
        defer.resolve(media);
      }
    });

    return defer.promise;
  },

  getTagMediaRecent: function (object_id) {

    var defer = Q.defer();

    ig.tag_media_recent(object_id, {count: 1}, function (err, media, remaining, limit) {
      if (err) {
        defer.reject(err)
      } else {
        defer.resolve(media);
      }
    });

    return defer.promise;
  },

  getGeographyMediaRecent: function (object_id, min_id) {
    console.log("min_id", min_id);
    var defer = Q.defer();

    // removed this from options: min_id: min_id -> no results returned if used
    ig.geography_media_recent(object_id, {count: 1, min_id: min_id}, function (err, media, remaining, limit) {
      if (err) {
        console.log(err);
        defer.reject(err)
      } else {
        console.log("media", media);
        defer.resolve(media);
      }
    });

    return defer.promise;
  },

  share: function (text, img) {

    var defer = Q.defer();

    var tasks = [
      function twitter(cb) {
        // TwitterService.post(text, img).
        //   then(function(){
        //
        //   }).
        //   fail(function(){
        //
        //   });
        cb(null, "twitter");
      },
      function facebook(cb) {
        // FacebookService.post(text, img).
        //   then(function(){
        //
        //   }).
        //   fail(function(){
        //
        //   });
        cb(null, "facebook");
      }
    ];

    async.parallel(tasks, function (err, results) {
      if (err) {

        sails.log.error("Share async tasks failed:", err);
        defer.reject({
          error: err
        });
      } else {

        // sails.log.info("Share async tasks completed:", results);
        defer.resolve({
          results: results
        });
      }
    });

    return defer.promise;
  }
};
