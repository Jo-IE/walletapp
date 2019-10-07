const express = require('express');
const router = express.Router();
const transaction_controller = require('../controllers/transactionController');
const passport = require('../config/passport');
const { check, validationResult, body } = require('express-validator');


/* POST request for creating transaction. */
router.post('/create', transaction_controller.create_transaction)
/* POST request for viewing transaction history. */
router.post('/view', transaction_controller.view_transactions)

module.exports = router;
