const mongoose = require("mongoose");

const vachicleSchema = new mongoose.Schema({
    Name : {
        type: String,
        required: false
    },
    VechicleType : {
        type: mongoose.Schema.ObjectId,
        required: false
    },
    // Min_km :{
    //     type: Number,
    //     required: false
    // },
    // Min_price : {
    //     type: Number,
    //     required: false
    // },
    // Price_km : {
    //     type: String,
    //     required: false
    // },
    // Waiting_min : {
    //     type: String,
    //     required: false
    // },  
    // min_waiting_time : {
    //     type: String,
    //     required: false
    // },
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
    },
    VechicleNum : {
        type: String,
        required: false
    },
    insuranceNumber : {
        type: String,
        required: false
    },
    insuranceExpDate : {
        type: String,
        required: false
    },
    FcExpdate : {
        type: String,
        required: false
    },
    Document1 : {
        type: String,
        required: false
    },
    Document2 : {
        type: String,
        required: false
    },
    Document3 : {
        type: String,
        required: false
    },
    imeiNo : {
        type: String,
        required: false
    },
    nextServiceDueDate : {
        type: String,
        required: false
    },
    chassisNumber : {
        type: String,
        required: false
    },
    auxBatteryNumber : {
        type: String,
        required: false
    },
    mainLiBatteryNumber : {
        type: String,
        required: false
    },
})
module.exports = new mongoose.model('vachicle',vachicleSchema);
