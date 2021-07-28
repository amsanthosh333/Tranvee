const mongoose = require("mongoose");

const vechicalcostSchema = new mongoose.Schema({
    Startkm : {
        type: String,
        required: true
    },
    Endkm : {
        type: String,
        required: true
    },
    amount : {
        type: String,
        required: true
    },
    Vechicle : {
        type: mongoose.Schema.ObjectId,
        required: false
    },
})
module.exports = new mongoose.model('vechicalcost',vechicalcostSchema);
