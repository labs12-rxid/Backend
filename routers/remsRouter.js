const remsRouter = require('express').Router();

const Rems = require('../data/helpers/rems-model');

remsRouter.get('/', async (req, res) => {
  try {
    const rems = await Rems.find();
    res.status(200).json(rems);
  } catch (error) {
    res.status(500).json({ message: `Reminders could not be found ${error}.` });
  }
});

remsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const rem = await Rems.findById(id);
    if (rem) {
      res.status(200).json(rem);
    } else {
      res
        .status(404)
        .json({ message: 'Reminder with specified ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({ message: `Reminder request failed ${error}.` });
  }
});

remsRouter.post('/', async (req, res) => {
  const { user_id, med_id } = req.body[0];
  if (!user_id || !med_id) {
    // We can add other necessary fields later.
    res.status(401).json({ message: 'No user ID or medication ID submitted.' });
  } else {
    try {
      const newRem = await Rems.add(req.body);
      if (newRem) {
        res.status(201).json(newRem);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: `Your reminder could not be posted ${error}.` });
    }
  }
});

remsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const rem = await Rems.remove(id);
    if (rem) {
      res.status(200).json(rem);
    } else {
      res.status(404).json({
        message: 'The reminder with the specified ID does not exist.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `The reminder's information could not be modified: ${error}.`
    });
  }
});

remsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const rem = req.body;
  try {
    const editedRem = await Rems.update(id, rem);
    if (editedRem) {
      res.status(200).json(editedRem);
    } else {
      res.status(404).json({
        message: 'The reminders with the specified ID does not exist.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `The reminder's information could not be modified: ${error}.`
    });
  }
});

module.exports = remsRouter;
