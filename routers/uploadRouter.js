const upload = require ('../api/upload.js'); // Brings in multer.
const router = require('express').Router();

router.post('/', upload.single('image'), function (req, res) {
  const file = req.file;
  console.log(req.body);

  if (!file) {
    res.status(400).json({ message: "No file provided." })
  } else {
    try {
      res.status(303).redirect('http://localhost:8000');
    } catch (error) {
      res.status(500).json({ message: "Internal server error." });
    }
  }
});

module.exports = router;