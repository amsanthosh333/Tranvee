const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
    Cityname : {
        type: String,
        required: true
    },
    Status : {
        type: String,
        required: true
    }
})
module.exports = new mongoose.model('city',citySchema);
