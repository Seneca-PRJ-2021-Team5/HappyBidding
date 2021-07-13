const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let creditCardSchema = new Schema({
    cardType:  {
        type: String, 
        default: 'none'
    },
    cardNumber:  {
        type: Number, 
        default: 000000000000
    },
    expiryDate:  {
        type: Date, 
        default: new Date() 
    },
    nameOnCard:  {
        type: String, 
        default: 'unkown'
    },
    verificationNumber:  {
        type: String, 
        default: '000'
    },
    userEmail:  {
        type: String, 
        default: 'unkown@unkown.com'
    }, 
});

const creditCardMODEL = mongoose.model('creditCards', creditCardSchema);

module.exports = creditCardMODEL;