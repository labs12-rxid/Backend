const authRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../data/helpers/users-model');

authRouter.post('/register', async (req, res) => {
  let user = req.body;

  if (!user.username || !user.password) {
    res.status(401).json({ message: 'Please provide username and password.' });
  } else {
    user.password = bcrypt.hashSync(user.password, 8);
    const newUser = await Users.add(user);
    if (newUser) {
      const token = generateUserToken(newUser);
      res
        .status(201)
        .json({ message: `Welcome ${user.username}!`, token, id: newUser.id });
    } else {
      res.status(500).json({ message: `Error adding user ${error}.` });
    }
  }
});

authRouter.post('/login', async (req, res) => {
  let { username, password } = req.body;

  if (!username || !password) {
    res.status(401).json({ message: 'Please provide username and password.' });
  } else {
    const user = await Users.findBy({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateUserToken(user);
      res
        .status(200)
        .json({ message: `Welcome ${user.username}!`, token, id: user.id });
    }
  }
});

// Maybe pull this jwt code to a new folder?

function generateUserToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const secret = process.env.SECRET || 'poopdiddyscoop';
  const options = {
    expiresIn: '7d'
  };

  return jwt.sign(payload, secret, options);
}

// End of JWT generation code
module.exports = {
  generateUserToken
};

module.exports = authRouter;
