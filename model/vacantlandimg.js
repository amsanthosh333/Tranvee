const mongoose = require('mongoose');

const vancantlandimgSchema = new mongoose.Schema({
    vacantid: {
        type: String,
        required: true,
    
    },
    vacantimg: {
        type: String,
        required: true,
    }
});

module.exports = new mongoose.model('vancantlandimg', vancantlandimgSchema);
