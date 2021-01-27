const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Regno: {
        type: String,
        required: true
    },
    fathername: {
        type: String,
        required: true
    },
fathermobile: {
    type: String,
    required: true
},
mothername: {
    type: String,
    required: true
},
mothermobile: {
    type: String,
    required: true
},
guardianname: {
    type: String,
    required: true
},
guardianmobile: {
    type: String,
    required: true
},
category: {
    type: mongoose.Schema.ObjectId,
    required: true
}
})
module.exports = new mongoose.model('contact',contactSchema);
