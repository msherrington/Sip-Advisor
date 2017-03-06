const Drink = require('../models/drink');
const s3 = require('../lib/s3');

function drinksIndex(req, res) {
  Drink
    .find()
    .populate('createdBy')
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
    .populate('createdBy')
    .exec()
    .then((drink) => {
      if(!drink) res.notFound();
      res.render('drinks/show', { drink });
    })
    .catch(next);
}

function drinksCreate(req, res, next) {
  req.body.createdBy = req.user;

  if(req.file) req.body.image = req.file.key;
  // For some reason multer's req.body doesn't behave like body-parser's
  req.body = Object.assign({}, req.body);
  console.log(req.body);
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
  // add the newly uploaded image filename to req.body
  // but only if a file was uploaded
  if(req.file) req.body.image = req.file.key;
  // clean up req.body, cos multer is a bit shit
  req.body = Object.assign({}, req.body);

  Drink
    .findById(req.params.id)
    .exec()
    .then((drink) => {
      if(!drink) return res.notFound();

      // if(req.body.image) {
      //   // image has been updated
      //   // delete the old image from AWS
      //   s3.removeObject({ Key: drink.image }); // WARNING: we are not handling any error here atm
      // }

      // update the record to contain the new data from the form
      // which would also include the new filename if an image was uploaded
      for(const field in req.body) {
        drink[field] = req.body[field];
      }

      // save the updated record back to the db
      return drink.save();
    })
    .then((drink) => {
      req.flash('success', `${drink.name} has been updated.`);
      res.redirect(`/drinks/${drink.id}`);
    })
    .catch((err) => {
      // at this point the image would have been uploaded regardless.. bolox
      // let's worry about that later
      if(err.name === 'ValidationError') res.badRequest(`/drinks/${req.params.id}/edit`, err.toString());
      next(err);
    });
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
