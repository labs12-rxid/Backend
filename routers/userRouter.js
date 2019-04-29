const userRouter = require('express').Router();

const Users = require('../data/helpers/users-model');
const Diary = require('../data/helpers/diary-model');

userRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: 'User with specified ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({ message: `User request failed ${error}.` });
  }
});

userRouter.get('/:id/diaries', async (req, res) => {
  const { id } = req.params;
  try {
    const diaries = await Diary.findBy({ user_id: id });
    if (diaries) {
      res.status(200).json(diaries);
    } else {
      res
        .status(404)
        .json({ message: 'User with specified ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({ message: `User diaries request failed ${error}.` });
  }
});

userRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.remove(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: 'The user with the specified ID does not exist.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `The user's information could not be modified: ${error}.`
    });
  }
});

userRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  try {
    const editedUser = await Users.update(id, user);
    if (editedUser) {
      res.status(200).json(editedUser);
    } else {
      res.status(404).json({
        message: 'The user with the specified ID does not exist.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `The user's information could not be modified: ${error}.`
    });
  }
});

module.exports = userRouter;
