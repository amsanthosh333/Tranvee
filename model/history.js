const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    tripid : {
        type: mongoose.Schema.ObjectId,
        required: false
    },
    TotalKm : {
        type: Number,
        required: true
    },
    FixedCharges : {
        type: Number,
        required: true
    },
    RateperKm : {
        type: String,
        required: true
    },
    KmCharges : {
        type: String,
        required: true
    },
    WaitingTime : {
        type: String,
        required: true
    },
    WaitingTimeCharges : {
        type: String,
        required: true
    },
})
module.exports = new mongoose.model('history',historySchema);
