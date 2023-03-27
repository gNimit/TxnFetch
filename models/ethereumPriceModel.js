const mongoose = require('mongoose');
const {Schema} = mongoose;

const ethereumPriceSchema = new Schema({
    ethereum: {price : String}
})

const ethereumPriceModel = mongoose.model('Price', ethereumPriceSchema);
module.exports = {
    ethereumPriceModel
};
