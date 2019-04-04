const express = require('express')
const get = require('./functions');

const router = new express.Router();

/* GET home page. */
router.get('/', get)



module.exports = router
