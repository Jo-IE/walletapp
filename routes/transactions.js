const express = require('express');
const router = express.Router();
const transaction_controller = require('../controllers/userController');
const passport = require('../config/passport')

/* POST request for creating transaction. */
router.post('/create', passport.authenticate('jwt', { session: false }), transaction_controller.create_transaction)
/* POST request for viewing transaction history. */
router.post('/view', passport.authenticate('jwt', { session: false }), transaction_controller.view_transactions)