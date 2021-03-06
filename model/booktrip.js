const mongoose = require("mongoose");

const booktripSchema = new mongoose.Schema({
    Date : {
        type: String,
        required: true
    },
    Customer : {
        type: mongoose.Schema.ObjectId,
        required: false
    },
    Pickuploc :{
        type: String,
        required: true
    },
    Droploc : {
        type: String,
        required: true
    },
    TotalKm : {
        type: String,
        required: true
    },
    Vechicaltype : {
        type: String,
        required: true
    },
    vechical : {
        type: mongoose.Schema.ObjectId,
        required: false
    },
    helper : {
        type: String,
        required: true
    },
    Booktime : {
        type: String,
        required: true
    },
    Bookdate : {
        type: String,
        required: true
    },
    Time : {
        type: String,
        required: true
    },
    Driverid : {
        type: mongoose.Schema.ObjectId,
        required: false
    },
    Startotp : {
        type: String,
        required: true
    },
    StartotpTime : {
        type: String,
        required: true
    },
    StartTripTime : {
        type: String,
        required: true
    },
    ReachDestinationTime : {
        type: String,
        required: true
    },
    Endotp : {
        type: String,
        required: true
    },
    EndotpTime : {
        type: String,
        required: true
    }
})
module.exports = new mongoose.model('booktrip',booktripSchema);
