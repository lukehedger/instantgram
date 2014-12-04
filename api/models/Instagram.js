/**
* Instagram.js
*
* @description :: Instagram model
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
