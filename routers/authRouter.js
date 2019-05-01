const authRouter = require('express').Router();
const Users = require('../data/helpers/users-model.js');
const authorization = require('./authorization.js');

authRouter.post('/login', authorization, async (req, res) => {
  const auth_id = req.headers.decoded.sub;
  try {
    const user = await Users.findBy({ auth_id });
    if (user) {
      res.status(200).json({ ...user, loggedIn: true, newUser: false });
    } else {
      const newUser = await Users.add({ auth_id });
      newUser && res.status(201).json({ loggedIn: true, newUser: true });
    }
  } catch (error) {
    res.status(500).json({ message: `Error retrieving user ${error}.` });
  }
});

module.exports = authRouter;
