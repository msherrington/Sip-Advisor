const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const User = require('../models/user');

User.collection.drop();

User
  .create([{
    username: 'Mark',
    email: 'look@me.com',
    password: 'pw',
    passwordConfirmation: 'pw'
  }])
  .then((users) => console.log(`${users.length} users created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
