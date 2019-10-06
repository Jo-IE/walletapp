const Transaction = require('../models/transaction');
const User = require('../models/user');

//submit transaction
exports.create_transaction = [
    //validate and sanitize input
    check('*').isLength({ min: 1 }).withMessage('All fields must not be empty'),
    check('amount').isNumber(),
    body('account')
        .not().isEmpty().trim().escape(),
    body('benusername')
        .not().isEmpty().trim().escape(),
], (req, res, next) => {
    var errors = validationResult(req).array();

    if (!errors.isEmpty()) {
        return res.json({ errors });
    }
    const currency = req.body.account === 'Bitcoin' ? 'bitcoin' : 'ethereum';
    User.findOne({ username: req.body.benusername }, (err, user) => {
        if (err) return next(err)
        if (!user) {
            res.status(404).json({ usernamenotfound: "Username not found" });
        }

        const newTransaction = new Transaction({
            curr_amount: req.body.amount,
            curr_type: currency,
            source_user: req.user.id,
            target_user: user.id,
            timestamp_created: Date.now(),
        })

        newTransaction.save().then(transaction => {
            res.json({
                transaction,
                user
            });
        }).catch(err => console.log(err))
    })


}
//get tran history

exports.view_transactions = (req, res, next) => {
    Transaction.find({ source_user: req.user.id }).then(transactions => {
        if (!transactions) {
            res.status(404).json({ notransactions: "No Transactions found" });
        }
        res.json({ transactions })
    }).catch(err => console.log(err))
}



