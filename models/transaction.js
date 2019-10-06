var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    curr_amount: { type: Number, required: true },
    curr_type: { type: String, enum: ['bitcoin', 'ethereum'], required: true },
    source_user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    target_user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    timestamp_created: { type: Date, required: true, default: Date.now() },
    timestamp_processed: { type: Date },
    state: { type: String, enum: ['Processing', 'Processed'], default: 'Processing' }
})


module.exports = mongoose.model('Transaction', TransactionSchema)