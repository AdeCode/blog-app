const express = require('express');
const router = express.Router()
const {createUser, login} = require('../controllers/authController')

router.get('/auth', function(req, res){
    res.json({message:'Welcome to auth section'})
})

router.post('/signup', createUser)
router.post('/login', login)

module.exports = router