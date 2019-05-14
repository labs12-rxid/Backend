const upload = require('../api/upload.js')['upload']; // Brings in multer.
const filepath = require('../api/upload.js')['uploadTo']; // Brings in multer.
const router = require('express').Router();
const axios = require('axios');
// const path = require('path');
const util = require('util');
require('dotenv').config(); 

router.post('/', upload.single('image'), async (req, res) => {
  const file = req.file;
  const here = process.env.MY_CRIB || "localhost";
  const science = process.env.DS_SERVER || "localhost";

  if (!file) {
    res.status(400).json({ message: "No file provided." })
  } else {
    try {
      const imageLocArray = [`${here}/api/upload/${file.filename}`];
      const rekogEndpoint = `${science}/rekog`;

      const axiosConfig = {
        url: rekogEndpoint, 
        method: 'post',
        data: {
          "image_locations": imageLocArray
        },
        timeout: 300000
      };

      const dataMagic = await axios(axiosConfig);
      const { data } = dataMagic;

      util.log(data);

      res.status(200).json([...data]);
    } catch (error) {
      util.log(error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
});

router.get('/:filename', async (req, res) => {
  const { filename } = req.params;
  let fileLocation = `${filepath}/${filename}`;

  try {
    res.status(200).type('png').sendFile(fileLocation)
  } catch(error) {
    res.status(500).json({ message: "Internal server error." })
  }
})

module.exports = router;
