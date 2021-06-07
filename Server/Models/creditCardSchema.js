const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let creditCardSchema = new Schema({
    cardType: String,
    cardNumber: Number,
    expiryDate: Date,
    nameOnCard: String,
    verificationNumber: String,
    userEmail: String 
});

const creditCardMODEL = mongoose.model('creditCards', creditCardSchema);

module.exports = creditCardMODEL;