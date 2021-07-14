const mongoose = require("mongoose");

const booktripSchema = new mongoose.Schema({
  
    Customer : {
        type: mongoose.Schema.ObjectId,
        required: false
    },
    Pickuploc :{
        type: String,
        required: false
    },
    Pickuploclat :{
        type: String,
        required: false
    },
    Pickuploclng :{
        type: String,
        required: false
    },
    Droploc : {
        type: String,
        required: false
    },
    Droploclat :{
        type: String,
        required: false
    },
    Droploclng :{
        type: String,
        required: false
    },
    TotalKm : {
        type: String,
        required: false
    },
    Vechicaltype : {
        type: String,
        required: false
    },
    vechical : {
        type: mongoose.Schema.ObjectId,
        required: false
    },
    helper : {
        type: String,
        required: false
    },
    Booktime : {
        type: String,
        required: false
    },
    Bookdate : {
        type: String,
        required: false
    },
    Driverid : {
        type: mongoose.Schema.ObjectId,
        required: false
    },
    Startotp : {
        type: String,
        required: false
    },
    StartotpTime : {
        type: String,
        required: false
    },
    StartTripTime : {
        type: String,
        required: false
    },
    ReachDestinationTime : {
        type: String,
        required: false
    },
    Endtriptime : {
        type: String,
        required: false
    }, 
    EndotpTime : {
        type: String,
        required: false
    },
    Endotp: {
        type: String,
        required: false
    },
    Bookingstatus : {
        type: String,
        required: false
    },
    Amount :{
        type: String,
        required: false
    }
})
module.exports = new mongoose.model('booktrip',booktripSchema);
