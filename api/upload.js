const multer = require('multer');
// Package for handling image uploads.

const path = require('path'); 
// Node directory-path resolving function
const uploadTo = path.join(__dirname, '..', 'uploads'); 
// Places files in Backend uploads/ folder for now.

const upload = multer({ dest: `${uploadTo}` });
// Activates multer as a function.

module.exports = upload;