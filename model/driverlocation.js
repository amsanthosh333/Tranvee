const mongoose = require("mongoose");

const driverlocationSchema = new mongoose.Schema({
    Driverid : {
        type: mongoose.Schema.ObjectId,
        required: false
    },
    lat : {
        type: String,
        required: false
    },
    lng : {
        type: String,
        required: false
    },
    lastupdate : {
        type: String,
        required: false
    }
})
module.exports = new mongoose.model('driverlocation',driverlocationSchema);
