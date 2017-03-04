function showRoute(req, res) {
  res.render('drinks/show');
}

function newDrinkRoute(req, res) {
  res.render('drinks/new');
}

function createDrinkRoute(req, res, next) {
  if(req.file) req.body.filename = req.file.key;

  // For some reason multer's req.body doesn't behave like body-parser's
  req.body = Object.assign({}, req.body);

  req.user.images.push(req.body);

  req.user
    .save()
    .then(() => res.redirect('/user'))
    .catch((err) => {
      console.log(err);
      if(err.name === 'ValidationError') return res.badRequest('/drinks/new', err.toString());
      next(err);
    });
}

module.exports = {
  show: showRoute,
  newDrink: newDrinkRoute,
  createDrink: createDrinkRoute
};
