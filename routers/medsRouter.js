const medsRouter = require('express').Router();

const Meds = require('../data/helpers/meds-model');

medsRouter.get('/', async (req, res) => {
  try {
    const meds = await Meds.find();
    res.status(200).json(meds);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Medications could not be found ${error}.` });
  }
});

medsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const med = await Meds.findById(id);
    if (med) {
      res.status(200).json(med);
    } else {
      res
        .status(404)
        .json({ message: 'Medidcation with specified ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({ message: `Medication request failed ${error}.` });
  }
});

medsRouter.post('/', async (req, res) => {
  const { user_id } = req.body;
  if (!user_id) {
    // We can add other necessary fields later.
    res.status(401).json({ message: 'No user ID submitted.' });
  } else {
    try {
      const newMed = await Meds.add(req.body);
      if (newMed) {
        res.status(201).json(newMed);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: `Your medication could not be posted ${error}.` });
    }
  }
});

medsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const med = await Meds.remove(id);
    if (med) {
      res.status(200).json(med);
    } else {
      res.status(404).json({
        message: 'The medication with the specified ID does not exist.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `The medication's information could not be modified: ${error}.`
    });
  }
});

medsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const med = req.body;
  try {
    const editedMed = await Meds.update(id, med);
    if (editedMed) {
      res.status(200).json(editedMed);
    } else {
      res.status(404).json({
        message: 'The medication with the specified ID does not exist.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `The medication's information could not be modified: ${error}.`
    });
  }
});

module.exports = medsRouter;
