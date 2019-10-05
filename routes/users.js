const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController')
/* POST request for creating user. */
router.post('/signup', user_controller.user_register)
/* GET request for logging in user. */

router.get('/login', user_controller.user_login)

module.exports = router;
