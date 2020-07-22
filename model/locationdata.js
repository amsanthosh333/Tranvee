const mongoose = require("mongoose");

const locationdataSchema = new mongoose.Schema({
    url: {
        type: String,
    }, 
    username: {
        type: String,
    }, 
    currenttime: {
        type: String,
    }, 
    deviceid: {
        type: String,
    },
    time: {
        type: String,
    },
    lat: {
        type: String,
    },
    lon: {
        type: String,
    },
    speed: {
        type: String,
    },
    couse: {
        type: String,
    },
    accuracy: {
        type: String,
    },
    battery: {
        type: String,
    },
    mock: {
        type: String,
    },
    datetime: {
        type: String,
    }
})
module.exports = new mongoose.model('locationdata', locationdataSchema);

