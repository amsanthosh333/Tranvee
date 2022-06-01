const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
    Name : {
        type: String,
        required: false
    },
    Mobileno : {
        type: String,
        required: false
    },
    Address :{
        type: String,
        required: false
    },
    Email : {
        type: String,
        required: false
    },
    Blood_Group : {
        type: String,
        required: false
    },
    Emg_Contactno : {
        type: String,
        required: false
    },
    Aadhar_No : {
        type: String,
        required: false
    },
    Licence_No : {
        type: String,
        required: false
    },
    Dl_Exp_Date : {
        type: String,
        required: false
    },
    // ,
    // Vechicle_Type : {
    //     type: String,
    //     required: false
    // },
    // Vechicle : {
    //     type: mongoose.Schema.ObjectId,
    //     required: false
    // },
    // VechicleNum : {
    //     type: String,
    //     required: false
    // },
    // VechicleId : {
    //     type: String,
    //     required: false
    // },
    // insuranceNumber : {
    //     type: String,
    //     required: false
    // },
    // insuranceExpDate : {
    //     type: String,
    //     required: false
    // },
    // SmokeTest : {
    //     type: String,
    //     required: false
    // },
    // FcExpdate : {
    //     type: String,
    //     required: false
    // },
    Imageprofile : {
        type: String,
        required: false
    },
    // VechicleImage : {
    //     type: String,
    //     required: false
    // },
    Document1 : {
        type: String,
        required: false
    },
    Document2 : {
        type: String,
        required: false
    },
    // Document3 : {
    //     type: String,
    //     required: false
    // },
    DepositAmount : {
        type: String,
        required: false
    },
    PaymentDate : {
        type: String,
        required: false
    },
    PaymentExpDate : {
        type: String,
        required: false
    },
    Razorpayid : {
        type: String,
        required: false
    },
    Password : {
        type: String,
        required: false
    },
    Status : {
        type: Boolean,
        required: false,
        default: 0
    },
    token: {
        type: String,
        required: false,
    },
    referid : {
        type: mongoose.Schema.ObjectId,
        required: false
    }
})
module.exports = new mongoose.model('driver',driverSchema);
