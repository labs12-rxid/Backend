const upload = require ('../api/upload.js'); // Brings in multer.
const router = require('express').Router();

router.post('/', upload.single('image'), function (req, res) {
  const file = req.file;

  if (!file) {
    res.status(400).json({ message: "No file provided." })
  } else {
    try {
      res.status(200).send(file);
      // Will use a slightly different syntax out of dev, this exposes server path names.
    } catch (error) {
      res.status(500).json({ message: "Internal server error." });
    }
  }
});

module.exports = router;