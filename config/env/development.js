/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMongodbServer'
  // }

  facebook: {
    client_id:      '',
    client_secret:  '',
    scope:          'offline_access, user_about_me, user_activities, user_likes, read_stream, read_insights, manage_pages',
    redirect_uri:   'http://localhost:1337/facebook/callback',
    return_scopes:   true
  },

  twitter: {
    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_token_secret: ''
  },

  instagram: {
    client_id:      '0fdfffab4da743eeaafa79c71de5f2f7',
    client_secret:  'fab9e64e250148e1a138641f623dbdc9',
    scope:          [ 'likes' ],
    redirect_uri:   'http://dev.lrsocial.com:1337/instagram/callback'
  }

};
