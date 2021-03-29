const mongoose = require("mongoose");

const vachicleSchema = new mongoose.Schema({
    Name : {
        type: String,
        required: false
    },
    VechicleType : {
        type: String,
        required: false
    },
    Min_km :{
        type: String,
        required: false
    },
    Min_price : {
        type: String,
        required: false
    },
    Price_km : {
        type: String,
        required: false
    },
    Waiting_min : {
        type: String,
        required: false
    },  
    min_waiting_time : {
        type: String,
        required: false
    },
    Capacity : {
        type: String,
        required: false
    },
    Width : {
        type: String,
        required: false
    },
    Height : {
        type: String,
        required: false
    },
    Length : {
        type: String,
        required: false
    },
    Image : {
        type: String,
        required: false
    }
})
module.exports = new mongoose.model('vachicle',vachicleSchema);
