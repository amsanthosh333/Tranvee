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
        type: Number,
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
    Goods : {
        type: mongoose.Schema.ObjectId,
        required: false
    },
    history : {
        type: mongoose.Schema.ObjectId,
        required: false
    },
    Amount :{
        type: String,
        required: false
    },
    Closedate :{
        type: String,
        required: false
    },
    Reson :{
        type: String,
        required: false
    },
    plan_id :{
        type: mongoose.Schema.ObjectId,
        required: true
    },
    referid : {
        type: mongoose.Schema.ObjectId,
        required: false
    },
    loadingamount :{
        type: String,
        required: false
    },
    extramin :{
        type: String,
        required: false
    },
    basefare :{
        type: String,
        required: false
    },
    paymentstatus :{
        type: String,
        required: false
    },
    paymentmode  :{
        type: String,
        required: false
    }
})
module.exports = new mongoose.model('booktrip',booktripSchema);
