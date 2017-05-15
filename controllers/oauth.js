const rp = require('request-promise');
const config = require('../config/oauth');
const oauth = require('../config/oauth');
const User = require('../models/user');

function github(req, res, next) {
  return rp({
    method: 'POST',
    url: config.github.accessTokenURL,
    qs: {
      client_id: config.github.clientId,
      client_secret: config.github.clientSecret,
      code: req.query.code
    },
    json: true
  })
  .then((token) => {
    return rp({
      method: 'GET',
      url: config.github.profileURL,
      qs: token,
      json: true,
      headers: {
        'User-Agent': 'Request-Promise'
      }
    });
  })
  .then((profile) => {
    return User
      .findOne({ $or: [{ email: profile.email }, { githubId: profile.id }] })
      .then((user) => {
        if(!user) {
          user = new User({
            username: profile.login,
            email: profile.email
          });
        }

        user.githubId = profile.id;
        user.image = profile.avatar_url;
        return user.save();
      });
  })
  .then((user) => {
    req.session.userId = user.id;
    req.session.isAuthenticated = true;

    req.flash('info', `Welcome back, ${user.username}!`);
    res.redirect('/');
  })
  .catch(next);
}

function facebook(req, res, next) {
  console.log(req.query);
  return rp({
    method: 'GET',
    url: oauth.facebook.accessTokenURL,
    qs: {
      client_id: oauth.facebook.clientId,
      redirect_uri: 'https://sip-advisor.herokuapp.com/oauth/facebook',
      client_secret: oauth.facebook.clientSecret,
      code: req.query.code
    },
    json: true
  })

 .then((token) => {

   return rp.get({
     url: 'https://graph.facebook.com/v2.9/me?fields=id,name,email,picture',
     qs: token,
     json: true
   });
 })
 .then((profile) => {
   console.log(profile);
   return User.findOne({email: profile.email })//first check their emails in case they already exist on our systm
     .then((user) => {
       if(!user) {
         user = new User({
           username: profile.name,
           email: profile.email
         });
       }

       user.facebookId = profile.id;
       user.image = profile.picture.data.url;
       return user.save();
     });
 })
 .then((user) => {
   req.session.userId = user.id;
   req.session.isAuthenticated = true;

   req.flash('info', `Welcome back ${user.username}!`);
   res.redirect('/');
   window.location.replace('https://sip-advisor.herokuapp.com');
 })
 .catch(next);
}

module.exports = { github, facebook };
