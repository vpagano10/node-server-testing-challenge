const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');

// POST - register    >>    Test
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201)
        .json(saved);
    })
    .catch(err => {
      console.log('Error with register POST', err)
      res.status(500)
        .json({ message: 'Could not register user' });
    });
});

// POST - login    >>    Test
router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.getBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);
        res.status(200)
          .json({ token, message: `Welcome ${user.username}!` });
      } else {
        res.status(401)
          .json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      console.log('Error with login POST', err)
      res.status(500)
        .json(error);
    });
});

// GET - logout    >>    Test
router.get('/logout', (req, res) => {
  if (req.session) {
    req.token.destroy(err => {
      if (err) {
        res.status(500)
          .json({ message: 'Could not logout' })
      } else {
        res.status(200)
          .json({ message: 'Successful logout' })
      }
    })
  } else {
    res.status(200)
      .end();
  };
});

function signToken(user) {
  const payload = {
    username: user.username,
    // department: 'development',
  };

  const secret = process.env.JWT_SECRET || 'is it secret, is it safe?';

  const options = {
    expiresIn: '1h',
  }

  return jwt.sign(payload, secret, options)
}

module.exports = router;