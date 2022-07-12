const mongoose = require("mongoose");

const vechicaltypeSchema = new mongoose.Schema({
    name : {
        type: Number,
        required: true
    },
    Document : {
        type: String,
        required: false
    }
})
module.exports = new mongoose.model('vechicaltype',vechicaltypeSchema);
