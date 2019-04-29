const express = require('express')
const get = require('./functions');

const router = new express.Router();

/**
 *  Routing for 'help centre' page
 */

router.get('/', get)

module.exports = router
