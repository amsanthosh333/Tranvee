const mongoose = require("mongoose");

const vancantlandSchema = new mongoose.Schema({
    Date: {
        type: String,
        required: true
    }
})
module.exports = new mongoose.model('vancant',vancantlandSchema);
