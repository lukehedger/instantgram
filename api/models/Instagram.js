/**
* Instagram.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    instagramId: {
      type: "string",
      required: true
    },

    username: {
      type: "string"
    },

    full_name: {
      type: "string"
    },

    profile_picture: {
      type: "string"
    },

    access_token: {
      type: "string"
    }
  }
};
