const router = require('express').Router()
const User = require('../db/models/user')


module.exports = router



router.use('/google', require('./google'))