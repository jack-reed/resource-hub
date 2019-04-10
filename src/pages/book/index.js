const express = require('express')
const functions = require('./functions');

const router = new express.Router();

/* GET home page. */
router.get('/:resourceId', functions.get)
// router.post('/:resourceId', functions.post);




module.exports = router
