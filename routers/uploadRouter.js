const upload = require('../api/upload.js')[upload]; // Brings in multer.
const filepath = require('../api/upload.js')[uploadTo]; // Brings in multer.
const router = require('express').Router();
const axios = require('axios');
const path = require('path');

router.post('/', upload.single('image'), async (req, res) => {
  const file = req.file;
  console.log(req.body);
  console.log(req.file);

  if (!file) {
    res.status(400).json({ message: "No file provided." })
  } else {
    try {
      const dataMagic = await axios.post("https://rxid-ds.us-east-2.elasticbeanstalk.com/", {
        "file_locations": [`d2ccuggcw9y16c.cloudfront.net/api/upload/${file.filename}`]
      };
        // body: {
        //   image_file: `file://${file.path}`
        // }
      // });
      res.status(200).json({ ...dataMagic.data });
    } catch (error) {
      res.status(500).json({ message: "Internal server error." });
    }
  // }
};

router.get('/:filename', async (req, res) => {
  const { filename } = req.params;
  let fileLocation = `${filepath}/${filename}`;
  try {
    res.status(200).sendFile(fileLocation)
  } catch(error) {
    res.status(500).json({ message: "Internal server error." })
  }
})

module.exports = router;