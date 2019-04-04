const express = require('express')
const get = require('./functions');

const router = new express.Router();

/* GET home page. */
router.get('/:resourceId', get)



module.exports = router
