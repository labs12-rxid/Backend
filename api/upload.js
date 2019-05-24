const multer = require('multer');
// Package for handling image uploads.

const path = require('path');
// Node directory-path resolving function
const uploadTo =
  process.env.UPLOAD_PATH || path.join(__dirname, '..', 'uploads');
// Places files in Backend uploads/ folder for now.

const upload = multer({ dest: `${uploadTo}` });
// Activates multer as a function.

const inMemory = multer.memoryStorage();
const uploadBuffer = multer({ storage: inMemory });
// Buffers the image upload instead, for some files.

module.exports = {
  upload,
  uploadTo,
  uploadBuffer
};
