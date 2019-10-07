const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');
const passport = require('passport')

/* POST request for creating user. */
router.post('/signup', user_controller.user_register)
/* POST request for logging in user. */

router.post('/login', user_controller.user_login)

router.put('/addaccount', user_controller.add_currency)

module.exports = router;
