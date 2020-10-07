const mongoose = require("mongoose");

const vancantlandSchema = new mongoose.Schema({
    Date: {
        type: String,
        required: true
    },
    Area: {
        type: String,
        required: true
    },
    totalSizesq: {
        type: String,
        required: true
    },
    Northsizesq: {
        type: String,
        required: true
    },
    Eastsizesq: {
        type: String,
        required: true
    },
    Westsizesq: {
        type: String,
        required: true
    },
    Southsizesq: {
        type: String,
        required: true
    },
    RateperSq: {
        type: String,
        required: true
    },
    DTCP: {
        type: String,
        required: true
    },
    Unapproved: {
        type: String,
        required: true
    }

})
module.exports = new mongoose.model('vancant',vancantlandSchema);
