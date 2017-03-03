function customResponses(req, res, next) {
  // handles 404 errors throughout
  res.notFound = function notFound() {
    const err = new Error('Not Found');
    err.status = 404;

    throw err;
  };

  // handles form errors
  res.badRequest = function(url, errors) {
    req.flash('alert', errors);
    res.redirect(url);
  };

  // dry's up code for secure login alerts
  res.unauthorized = function(url='/login', message='You must be logged in') {
    req.flash('alert', message);
    res.redirect(url);
  };

  next();
}

module.exports = customResponses;
