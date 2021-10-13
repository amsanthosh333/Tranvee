const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
    
    },
    phone: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    }
});

module.exports = new mongoose.model('owner', ownerSchema);
