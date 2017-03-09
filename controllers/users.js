const User = require('../models/user');
const Drink = require('../models/drink');


function usersIndex(req, res) {
  User
    .find()
    .exec()
    .then((users) => res.render('users/index', { users }))
    .catch((err) => {
      res.status(500).end(err);
    });
}

function usersShow(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) res.notFound();
      return Drink.find({createdBy: user.id})
      .then((drinks) => {
        res.render('users/show', { user, drinks });
      })
    .catch(next);
    });
}

function usersEdit(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) res.notFound();
      res.render('users/edit', { user });
    })
    .catch(next);
}

function usersUpdate(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      for(const field in req.body) {
        user[field] = req.body[field];
      }

      return user.save();
    })
    .then((user) => {
      req.flash('success', `${user.name} has been updated.`);
      res.redirect(`/users/${user.id}`);
    })
    .catch(next);
}

// function usersDelete(req, res, next) {
//   User
//     .findById(req.params.id)
//     .exec()
//     .then((user) => {
//       if(!user) res.notFound();
//       return user.remove();
//     })
//     .then((user) => {
//       req.flash('success', `${user.name} has been deleted.`);
//       res.redirect('/users');
//     })
//     .catch(next);
// }

module.exports = {
  index: usersIndex,
  show: usersShow,
  edit: usersEdit,
  update: usersUpdate
  // delete: usersDelete

};
