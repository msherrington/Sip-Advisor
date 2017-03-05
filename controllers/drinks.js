const Drink = require('../models/drink');

function drinksIndex(req, res) {
  Drink
    .find()
    .exec()
    .then((drinks) => res.render('drinks/index', { drinks }))
    .catch((err) => {
      res.status(500).end(err);
    });
}

function drinksNew(req, res) {
  res.render('drinks/new');
}

function drinksShow(req, res, next) {
  Drink
    .findById(req.params.id)
    .exec()
    .then((drink) => {
      if(!drink) res.notFound();
      res.render('drinks/show', { drink });
    })
    .catch(next);
}

function drinksCreate(req, res, next) {
  if(req.file) req.body.filename = req.file.key;
  // For some reason multer's req.body doesn't behave like body-parser's
  req.body = Object.assign({}, req.body);

  // req.user.image.push(req.body);

  Drink
    .create(req.body)
    .then((drink) => {
      req.flash('success', `${drink.name} has been added to the map.`);
      res.redirect('/drinks');
    })
    .catch((err) => {
      console.log(err);
      if(err.name === 'ValidationError') return res.badRequest('/drinks/new', err.toString());
      next(err);
    });
}

function drinksEdit(req, res, next) {
  Drink
    .findById(req.params.id)
    .exec()
    .then((drink) => {
      if(!drink) res.notFound();
      res.render('drinks/edit', { drink });
    })
    .catch(next);
}

function drinksUpdate(req, res, next) {
  Drink
    .findById(req.params.id)
    .exec()
    .then((drink) => {
      if(!drink) return res.notFound();

      for(const field in req.body) {
        drink[field] = req.body[field];
      }

      return drink.save();
    })
    .then((drink) => {
      req.flash('success', `${drink.name} has been updated.`);
      res.redirect(`/drinks/${drink.id}`);
    })
    .catch(next);
}

function drinksDelete(req, res, next) {
  Drink
    .findById(req.params.id)
    .exec()
    .then((drink) => {
      if(!drink) res.notFound();
      return drink.remove();
    })
    .then((drink) => {
      req.flash('success', `${drink.name} has been deleted.`);
      res.redirect('/drinks');
    })
    .catch(next);
}

module.exports = {
  index: drinksIndex,
  new: drinksNew,
  show: drinksShow,
  create: drinksCreate,
  edit: drinksEdit,
  update: drinksUpdate,
  delete: drinksDelete
};
