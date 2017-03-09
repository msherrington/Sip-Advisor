// Require packages
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird'); // setting bluebird to be promises library for mongoose
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const { port, env, dbURI, sessionSecret } = require('./config/environment');
const errorHandler = require('./lib/errorHandler');
const routes = require('./config/routes');
const customResponses = require('./lib/customResponses');
const authentication = require('./lib/authentication');
const methodOverride = require('./lib/methodOverride');

// Create an express app
const app = express();

// Set up template engine
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);

// Set up static files
app.use(express.static(`${__dirname}/public`)); //checks public folder before looking at routes

// Connect to database
mongoose.connect(dbURI);

// Set up middleware
if (env !== 'test') app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true })); // this will create req.body for normal forms
app.use(methodOverride);

// Set up sessions
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}));

// Set up flash messages AFTER sessions
app.use(flash());

// Set up custom middleware
app.use(customResponses);
app.use(authentication);

// Set up routes (penultimate)
app.use(routes);
// Set up error handler (final piece of middleware)
app.use(errorHandler);

app.listen(port, () => console.log(`Express is listening to port ${port}`));
