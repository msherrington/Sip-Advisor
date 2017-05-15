module.exports = {
  github: {
    loginURL: 'https://github.com/login/oauth/authorize',
    accessTokenURL: 'https://github.com/login/oauth/access_token',
    profileURL: 'https://api.github.com/user',
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    scope: 'user:email',
    getLoginURL() {
      return `${this.loginURL}?client_id=${this.clientId}&scope=${this.scope}`;
    }
  },

  facebook: {
    loginURL: 'https://www.facebook.com/v2.8/dialog/oauth',
    accessTokenURL: 'https://graph.facebook.com/v2.8/oauth/access_token',
    clientId: process.env.FB_API_KEY,
    clientSecret: process.env.FB_API_SECRET,
    scope: 'user:email',
    appURL: process.env.APP_URL || 'http://localhost:3000/',
    getLoginURL() {
      // return `${this.loginURL}?client_id=${this.clientId}&redirect_uri=${this.appURL}/oauth/facebook`;
      return `${this.loginURL}?client_id=${this.clientId}&redirect_uri=${this.appURL}`;
    }
  }
};
