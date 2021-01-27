const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    }
})
module.exports = new mongoose.model('category',groupSchema);
