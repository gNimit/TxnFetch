const mongoose = require('mongoose');
const {Schema} = mongoose;

const tranxSchema = new Schema({
    blockNumber : String,
    timeStamp: String,
    hash: String,
    nonce: String,
    blockHash: String,
    transactionIndex: String,
    from: String,
    to: String,
    value: String,
    gas: String,
    gasPrice: String,
    contractAddress: String,
    cumulativeGasUsed: String,
    gasUsed: String,
    confirmations: String
});

const transactionModel = mongoose.model('Transactions', tranxSchema);

module.exports = {
    transactionModel
};
