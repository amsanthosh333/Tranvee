const mongoose = require("mongoose");

const locationdataSchema = new mongoose.Schema({
    url: {
        type: String,
    },
    datetime: {
        type: String,
    }
})
module.exports = new mongoose.model('locationdata', locationdataSchema);

