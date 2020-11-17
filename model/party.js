const mongoose = require("mongoose");

const partySchema = new mongoose.Schema({
    Name: {
        type: String,
        required: false
    },
    Contact: {
        type: String,
        required: false
    },
    Requiredcategory: {
        type: String,
        required: false
    },
    Remarks: {
        type: String,
        required: false
    }
})
module.exports = new mongoose.model('party',partySchema);
