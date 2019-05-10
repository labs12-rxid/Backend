const diaryRouter = require('express').Router();

const Diary = require('../data/helpers/diary-model');

diaryRouter.get('/', async (req, res) => {
  try {
    const diaries = await Diary.find();
    res.status(200).json(diaries);
  } catch (error) {
    res.status(500).json({ message: `Diaries could not be found ${error}.` });
  }
});

diaryRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const diary = await Diary.findById(id);
    if (diary) {
      res.status(200).json(diary);
    } else {
      res
        .status(404)
        .json({ message: 'Diary with specified ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({ message: `Diary request failed ${error}.` });
  }
});

diaryRouter.post('/', async (req, res) => {
  try {
    console.log('req.body:', req.body);
    const newDiary = await Diary.add(req.body);
    if (newDiary) {
      res.status(201).json(newDiary);
      console.log('newDiary:', newDiary);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Your diary could not be posted ${error}.` });
  }
});

diaryRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const diary = await Diary.remove(id);
    if (diary) {
      res.status(200).json(diary);
    } else {
      res.status(404).json({
        message: 'The diary with the specified ID does not exist.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `The diary's information could not be modified: ${error}.`
    });
  }
});

diaryRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const diary = req.body;
  try {
    const editedDiary = await Diary.update(id, diary);
    if (editedDiary) {
      res.status(200).json(editedDiary);
    } else {
      res.status(404).json({
        message: 'The diary with the specified ID does not exist.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `The diary's information could not be modified: ${error}.`
    });
  }
});

module.exports = diaryRouter;
