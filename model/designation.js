const mongoose = require("mongoose");

const designationSchema = new mongoose.Schema({
    designation : {
        type: String,
        required: true
    }
})
module.exports = new mongoose.model('designation',designationSchema);
