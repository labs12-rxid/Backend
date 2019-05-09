const multer = require('multer');
// Package for handling image uploads.

const path = require('path'); 
// Node directory-path resolving function
const uploadTo = process.env.UPLOAD_PATH || path.join(__dirname, '..', 'uploads'); 
// Places files in Backend uploads/ folder for now.
console.log(uploadTo); // You can run this via: node ./api/upload.js

const upload = multer({ dest: `${uploadTo}` });
// Activates multer as a function.

module.exports = upload;