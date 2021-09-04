const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    tripid : {
        type: mongoose.Schema.ObjectId,
        required: false
    },
    TotalKm : {
        type: Number,
        required: false
    },
    FixedCharges : {
        type: Number,
        required: false
    },
    RateperKm : {
        type: String,
        required: false
    },
    KmCharges : {
        type: String,
        required: false
    },
    WaitingTime : {
        type: String,
        required: false
    },
    WaitingTimeCharges : {
        type: String,
        required: false
    },
})
module.exports = new mongoose.model('history',historySchema);
