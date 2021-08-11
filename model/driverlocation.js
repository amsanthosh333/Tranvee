const mongoose = require("mongoose");

const driverlocationSchema = new mongoose.Schema({
    Driverid : {
        type: mongoose.Schema.ObjectId,
        required: false
    },
    lat : {
        type: String,
        required: true
    },
    lng : {
        type: String,
        required: true
    },
    lastupdate : {
        type: String,
        required: true
    }
})
module.exports = new mongoose.model('driverlocation',driverlocationSchema);
