const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');
const passport = require('../config/passport')

/* POST request for creating user. */
router.post('/signup', user_controller.user_register)
/* POST request for logging in user. */

router.post('/login', user_controller.user_login)

router.put('/addaccount', passport.authenticate('jwt', { session: false }), user_controller.add_currency)

module.exports = router;
