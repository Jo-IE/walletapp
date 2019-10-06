var User = require('../models/user');
const bcrypt = require('bcrypt');

//save user info in db
exports.user_register = [
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

            User.findOne({ username: req.body.username }).then(user => {
                if (user) {
                    return res.status(400).json({ email: "Username already exists" });
                } else {
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        hashed_pwd: req.body.password,
                        username: req.body.username
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.hashed_pwd, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.hashed_pwd = hash;
                            newUser
                                .save()
                                .then(user => {
                                    // Create JWT Payload
                                    const payload = {
                                        id: user.id,
                                        name: user.name
                                    };
                                    // Sign token
                                    jwt.sign(
                                        payload,
                                        process.env.SECRET,
                                        {
                                            expiresIn: 31556926 // 1 year in seconds
                                        },
                                        (err, token) => {
                                            res.json({
                                                success: true,
                                                token: "Bearer " + token,
                                                user
                                            });
                                        }
                                    )
                                })
                                .catch(err => console.log(err));
                        });
                    });
                }
            });




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
    const username = req.body.email;
    const password = req.body.password;

    User.findOne({ username }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ usernamenotfound: "Username not found" });
        }
        // Check password
        bcrypt.compare(password, user.hashed_pwd).then(match => {
            if (match) {

                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    process.env.SECRET,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {

                        res.json({
                            success: true,
                            token: "Bearer " + token,
                            user
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
}


exports.add_currency = [
    //validate and sanitize input
    check('*').isLength({ min: 1 }).withMessage('All fields must not be empty'),
    check('walletid').isNumber(),
    body('accountname')
        .not().isEmpty().trim().escape(),
    body('walletid')
        .not().isEmpty().trim().escape(),
], (req, res, next) => {
    var errors = validationResult(req).array();

    if (!errors.isEmpty()) {
        return res.json({ errors: errors });
    }
    //update user object with new information

    const newInformation = req.body.accounttype === 'Bitcoin' ? {
        bitcoin_wallet_id: req.body.walletid,
    } : {
            ethereum_wallet_id: req.body.walletid,
        }
    User.findOneAndUpdate({ _id: req.user.id }, newInformation, { new: true }).then(user => {
        res.send(user);
    }).catch(err => console.log(err));


}













//add currency account