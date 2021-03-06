const mongoose = require("mongoose");

const goodstypeSchema = new mongoose.Schema({
    GoodsName : {
        type: String,
        required: true
    }
})
module.exports = new mongoose.model('goods',goodstypeSchema);
