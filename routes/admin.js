const express = require('express');
const router = express.Router()
const {getAllUsers, } = require('../controllers/adminController')


router.get('/all-users', getAllUsers)

module.exports = router