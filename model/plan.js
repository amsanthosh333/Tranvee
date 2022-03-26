const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
    name : {
        type: String,
        required: false
    },
    baseFare : {
        type: String,
        required: false
    },
    distanceLimit :{
        type: String,
        required: false
    },
    timeLimit : {
        type: String,
        required: false
    },
    additionDistancePerKm  : {
        type: Number,
        required: false
    },
    additionMinPerMin  : {
        type: Number,
        required: false
    }
})
module.exports = new mongoose.model('plan',planSchema);
