const express = require('express')
const get = require('./functions')
const router = new express.Router()

/**
 *  Routing for 'Homepage'
 */

router.get('/', get)

module.exports = router
