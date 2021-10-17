const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: false,
    },
    fcmtoken: {
        type: String,
        required: false,
    },
    referid : {
        type: mongoose.Schema.ObjectId,
        required: false
    }
});

module.exports = new mongoose.model('customer', customerSchema);
