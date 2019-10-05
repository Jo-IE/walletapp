var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    curr_amount: { type: Number, required: true },
    curr_type: { type: String, required: true },
    source_user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    target_user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    timestamp_created: { type: Date, required: true },
    timestamp_processed: { type: Date, required: true },
    state: {}
})


module.exports = mongoose.model('Transaction', TransactionSchema)