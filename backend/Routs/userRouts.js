const express = require('express');
const {registerUser,authuser} = require('../controllers/userControllers');

const router = express.Router()
router.route('/').post(registerUser)
router.post('/login',authuser)


module.exports = router;