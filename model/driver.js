const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
    Name : {
        type: String,
        required: true
    },
    Mobileno : {
        type: String,
        required: true
    },
    Address :{
        type: String,
        required: true
    },
    Email : {
        type: String,
        required: true
    },
    Blood_Group : {
        type: String,
        required: true
    },
    Emg_Contactno : {
        type: String,
        required: true
    },
    Aadhar_No : {
        type: String,
        required: true
    },
    Licence_No : {
        type: String,
        required: true
    },
    Dl_Exp_Date : {
        type: String,
        required: true
    },
    Vechicle_Type : {
        type: String,
        required: true
    },
    Vechicle : {
        type: mongoose.Schema.ObjectId,
        required: false
    },
    VechicleNum : {
        type: String,
        required: true
    },
    insuranceNumber : {
        type: String,
        required: true
    },
    insuranceExpDate : {
        type: String,
        required: true
    },
    SmokeTest : {
        type: String,
        required: true
    },
    FcExpdate : {
        type: String,
        required: true
    },
    Imageprofile : {
        type: String,
        required: true
    },
    VechicleImage : {
        type: String,
        required: true
    },
    Document1 : {
        type: String,
        required: true
    },
    Document2 : {
        type: String,
        required: true
    },
    Document3 : {
        type: String,
        required: true
    },
    DepositAmount : {
        type: String,
        required: true
    },
    PaymentDate : {
        type: String,
        required: true
    },
    PaymentExpDate : {
        type: String,
        required: true
    },
    Razorpayid : {
        type: String,
        required: true
    },
    Status : {
        type: String,
        required: true
    }
})
module.exports = new mongoose.model('driver',driverSchema);
