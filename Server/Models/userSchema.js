const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema({ 
    address: {
        streetName: String,
        streetNumber: Number,
        city: String,
        postalCode: String,
        country: String
    }, 
    userType: {
        type: String, 
        default: 'user'
    },
    userName: {
        type: String, 
        required: true
    }, 
    firstName: String,
    lastName: String,
    phoneNumber: String, 
    emailAddress: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    manageAuction: [{
        auctionName: String,
        productName: String,
        auctionStatus: String
    }], 
    currentSessionKey: String
}) 

const userMODEL = mongoose.model('users', userSchema);

module.exports = userMODEL;