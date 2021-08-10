const mongoose = require("mongoose");

const driverlocationSchema = new mongoose.Schema({
    Cityname : {
        type: String,
        required: true
    },
    Status : {
        type: String,
        required: true
    }
})
module.exports = new mongoose.model('driverlocation',driverlocationSchema);
