var User = require('../models/user');
const bcrypt = require('bcrypt');

//save user info in db
exports.user_create_post = [
    //validate and sanitize input
    check('*').isLength({ min: 1 }).withMessage('All fields must not be empty'),
    check('email').isEmail(),
    body('name')
        .not().isEmpty().trim().escape(),
    body('username')
        .not().isEmpty().trim().escape(),
    body('password')
        .not().isEmpty().trim().escape(),
    body('confirmpass')
        .not().isEmpty().trim().escape()], (req, res, next) => {
            var errors = validationResult(req).array();
            errors = req.body.password !== req.body.confirmpass ? errors.push({
                "location": "body",
                "msg": 'Passwords Must Match',
                "param": "password"
            }) : errors;

            if (!errors.isEmpty()) {
                return res.json({ errors: errors });
            }

            bcrypt.hash(req.body.password, 10).then(hash => {
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    hashed_pwd: hash,
                    username: req.body.username
                })
                user.save();
            }).then(() => {
                res.send()
            }).catch(err => {
                console.log('error saving user: ' + err)
                next()
            })




        }


exports.user_login = [
    //validate and sanitize input
    check('*').isLength({ min: 1 }).withMessage('All fields must not be empty'),
    body('username')
        .not().isEmpty().trim().escape(),
    body('password')
        .not().isEmpty().trim().escape(),
], (req, res, next) => {
    var errors = validationResult(req).array();

    if (!errors.isEmpty()) {
        return res.json({ errors: errors });
    }

    User.findOne({ username: req.body.username }, function (err, user) {
        const match = bcrypt.compare(password, user.password);
        if (match) {
            //login
        }
    })





}








//add currency account