// const multer  = require('multer')
const express = require('express');
const router = express.Router();
const upload = require("./upload");

const controller = require('./controller');

router.post('/upload', upload.single('file'), controller.db_operations);
router.get('/long_polling', upload.single('file'), controller.long_polling);

module.exports = router;