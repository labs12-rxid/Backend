const userRouter = require('express').Router();

const Users = require('../data/helpers/users-model');
const Meds = require('../data/helpers/meds-model');
const Diary = require('../data/helpers/diary-model');
const Rems = require('../data/helpers/rems-model');

const uploadBuffer = require('../api/upload.js')['uploadBuffer']; // Uses multer to buffer image uploads
const uuid = require('uuid/v4');
const util = require('util');

const S3 = require('aws-sdk/clients/s3');
const useS3 = new S3({
  apiVersion: '2006-03-01',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION
});

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

userRouter.get('/:id/meds', async (req, res) => {
  const { id } = req.params;
  try {
    const meds = await Meds.findUsersMeds(id);
    if (meds) {
      res.status(200).json(meds);
    } // else {
    //   res.status(200).json({
    //     message: 'User with specified ID does not have any medications.'
    //   });
    // }
  } catch (error) {
    res
      .status(500)
      .json({ message: `User medications request failed ${error}.` });
  }
});

userRouter.get('/:id/diaries', async (req, res) => {
  const { id } = req.params;
  try {
    const diaries = await Diary.findBy(id);
    if (diaries) {
      res.status(200).json(diaries);
    } // else {
    //   res
    //     .status(200)
    //     .json({ message: 'User with specified ID does not have any diaries.' });
    // }
  } catch (error) {
    res.status(500).json({ message: `User diaries request failed ${error}.` });
  }
});

userRouter.get('/:id/rems', async (req, res) => {
  const { id } = req.params;
  try {
    const rems = await Rems.findBy(id);
    if (rems) {
      res.status(200).json(rems);
    } // else {
    //   res.status(200).json({
    //     message: 'User with specified ID does not have any reminders.'
    //   });
    // }
  } catch (error) {
    res
      .status(500)
      .json({ message: `User reminders request failed ${error}.` });
  }
});

userRouter.post(
  '/:id/avatar',
  uploadBuffer.single('image'),
  async (req, res) => {
    const { id } = req.params;
    const file = req.file;
    const body = req.body;

    if (!file || !body) {
      res.status(400).json({ message: 'No image provided.' });
    } else {
      try {
        const { buffer, mimetype } = file;
        const extension = mimetype.slice(6);
        const uniqueFilename = `avatar-${uuid()}.${extension}`;
        const usersBucket = process.env.USER_BUCKET;

        const sendToS3 = await useS3
          .putObject({
            ACL: 'something-invalid',
            Body: buffer,
            Bucket: `${usersBucket}`,
            Key: `users/images/${uniqueFilename}`,
            ContentType: mimetype
          })
          .promise();

        const updateDatabase = await Users.update(id, {
          profile_image_url: uniqueFilename
        });

        util.log(sendToS3, updateDatabase);

        if (sendToS3 && updateDatabase) {
          res.status(200).json({ message: 'Successfully uploaded!' });
        } else {
          res.status(502).json({ message: 'Something went wrong.' });
        }
      } catch (error) {
        util.log(error);
        res.status(500).json({ message: 'Internal server error.' });
      }
    }
  }
);

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
