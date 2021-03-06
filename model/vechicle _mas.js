const mongoose = require("mongoose");

const vachicleSchema = new mongoose.Schema({
    Name : {
        type: String,
        required: true
    },
    VechicleType : {
        type: String,
        required: true
    },
    Min_km :{
        type: String,
        required: true
    },
    Min_price : {
        type: String,
        required: true
    },
    Price_km : {
        type: String,
        required: true
    },
    Waiting_min : {
        type: String,
        required: true
    },
    Capacity : {
        type: String,
        required: true
    },
    Width : {
        type: String,
        required: true
    },
    Height : {
        type: String,
        required: true
    },
    Length : {
        type: String,
        required: true
    },
    Image : {
        type: String,
        required: true
    }
})
module.exports = new mongoose.model('vachicle',vachicleSchema);
