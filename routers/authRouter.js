const authRouter = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../data/helpers/users-model");

// Maybe pull this jwt code to a new folder?
const jwt = require("jsonwebtoken");

module.exports = {
  generateUserToken
};

function generateUserToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const secret = process.env.SECRET || "poopdiddyscoop";
  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, secret, options);
}

// End of JWT generation code

authRouter.post("/register", (req, res) => {
  let user = req.body;

  if (!user.username || !user.password) {
    res.status(400).json({ error: "Please provide username and password." });
  }

  user.password = bcrypt.hashSync(user.password, 8);

  Users.add(user)
    .then(added => {
      console.log("Added user ", added);
      const token = generateUserToken(user);
      res.status(201).json({ token, id: added.id });
    })
    .catch(error => {
      console.error("Error adding user: ", error);
      res.status(500).json({
        error: error,
        message: "Username is possibly already taken"
      });
    });
});

authRouter.post("/login", (req, res) => {
  let { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Please provide username and password." });
  }

  Users.findBy({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateUserToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token,
          id: user.id
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = authRouter;