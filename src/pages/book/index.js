const express = require('express')
const functions = require('./functions')
const router = new express.Router()

/**
 *  Routing for booking page, takes resourceId as URL parameter.
 */

router.get('/:resourceId', functions.get)
router.post('/:resourceId', functions.post);


module.exports = router
