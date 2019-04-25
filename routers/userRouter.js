const userRouter = require("express").Router();

const Users = require("../data/helpers/users-model");

userRouter.get("/:id", (req, res) => {
  let { id } = req.params;

  Users.findById(id)
    .then(user => {
      res.status(201).json({ user });
    })
    .catch(error => {
      console.error("Error retreiving user: ", error);
      res.status(500).json({
        error: error,
        message: "Make sure user with ID exists"
      });
    });
});

module.exports = userRouter;
