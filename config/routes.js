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
  .delete(secureRoute, registrations.delete);

router.route('/users/:id/edit')
  .get(secureRoute, users.edit);

router.route('/drinks')
  .get(secureRoute, drinks.index);

router.route('/drinks/new')
  .get(secureRoute, drinks.new)
  .post(secureRoute, upload.single('image'), drinks.create);

router.route('/drinks/:id')
  .get(secureRoute, drinks.show)
  .put(secureRoute, drinks.update)
  .delete(secureRoute, drinks.delete);

router.route('/drinks/:id/edit')
  .get(secureRoute, drinks.edit);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/oauth/github')
  .get(oauth.github);

router.all('*', (req, res) => res.notFound());

module.exports = router;
