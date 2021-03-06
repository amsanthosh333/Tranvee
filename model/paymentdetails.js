const mongoose = require("mongoose");

const paymentdetailsSchema = new mongoose.Schema({
    Driver : {
        type: mongoose.Schema.ObjectId,
        required: false
    },
    Amount : {
        type: String,
        required: true
    },
    Payment_Date :{
        type: String,
        required: true
    },
    Payment_Exp_Date : {
        type: String,
        required: true
    },
    Razorpay  : {
        type: String,
        required: true
    }
})
module.exports = new mongoose.model('paymentdetails',paymentdetailsSchema);
