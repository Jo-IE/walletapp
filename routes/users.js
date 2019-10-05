const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { sanitizeBody } = require('express-validator');

/* POST request for creating user. */
router.post('/create', user_controller.user_create_post)

module.exports = router;
