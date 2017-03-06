const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');
const users = require('../controllers/users');
const drinks = require('../controllers/drinks');
const oauth = require('../controllers/oauth');
const upload = require('../lib/upload');

router.get('/', (req, res) => res.render('statics/index'));

router.route('/users/:id')
  .get(secureRoute, users.show)
  .put(secureRoute, users.update)
  // .get(secureRoute, drinks.index)
  // .get(secureRoute, drinks.show)
  .delete(secureRoute, registrations.delete);

router.route('/users/:id/edit')
  .get(secureRoute, users.edit);

router.route('/drinks')
  .get(secureRoute, drinks.index)
  .post(secureRoute, upload.single('image'), drinks.create);

router.route('/drinks/new')
  .get(secureRoute, drinks.new);

router.route('/drinks/:id')
  .get(secureRoute, drinks.show)
  .post(secureRoute, upload.single('image'), drinks.update)
  .delete(secureRoute, drinks.delete);

router.route('/drinks/:id/edit')
  .get(secureRoute, drinks.edit);

// router.route('/drinks/:id/comments')
//   .post(secureRoute, drinks.createComment);
//
// router.route('/drinks/:id/comments/:commentId')
//   .delete(secureRoute, drinks.deleteComment);

router.route('/register')
  .get(registrations.new)
  .post(upload.single('image'), registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/oauth/github')
  .get(oauth.github);

router.all('*', (req, res) => res.notFound());

module.exports = router;
