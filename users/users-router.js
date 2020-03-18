const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

// GET - users    >>    TEST
router.get('/', restricted, (req, res) => {
  Users.get()
    .then(users => {
      res.status(200)
        .json(users);
    })
    .catch(err => {
      console.log('Error with users GET', err)
      res.status(500)
        .json({ message: 'Could get retrieve users' })
    });      
});


// DELETE - user    >>    TEST
router.delete('/:id', (req, res) => {
  Users.deleteUser(req.params.id)
    .then(user => {
      res.status(200)
        .json({ message: 'User was deleted' })
    })
    .catch(err => {
      console.log('Error with user DELETE', err)
      res.status(500)
        .json({ message: 'Error deleting the user' })
    });
});

module.exports = router;