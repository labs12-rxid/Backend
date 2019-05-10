const upload = require ('../api/upload.js'); // Brings in multer.
const router = require('express').Router();
const axios = require('axios');

// router.post('/', upload.single('image'), async (req, res) => {
router.get('/', async (req, res) => {
  // const file = req.file;
  // console.log(req.body);
  // console.log(req.file);

  // if (!file) {
  //   res.status(400).json({ message: "No file provided." })
  // } else {
    try {
      const dataMagic = await axios.post("http://localhost:8000/rekog", { "wham": "bam" })
        // body: {
        //   image_file: `file://${file.path}`
        // }
      // });
      res.status(200).json({ ...dataMagic.data });
    } catch (error) {
      res.status(500).json({ message: "Internal server error." });
    }
  // }
});

module.exports = router;
