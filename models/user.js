var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String, required: true, max: 512 },
    description: { type: String, max: 1000 },
    email: { type: String, max: 1000 },
    bitcoin_wallet_id: { type: Number, },
    bitcoin_wallet_balance: { type: Number, max: 1 },
    ethereum_wallet_id: { type: Number, },
    ethereum_wallet_balance: { type: Number, max: 1 },
    max_allowed_amount: { type: Number },
    hashed_pwd: { type: String, required: true },
    username: { type: String, required: true }

})


module.exports = mongoose.model('User', UserSchema)