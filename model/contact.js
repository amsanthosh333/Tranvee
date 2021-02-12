const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
 name: {
     type: String,
     required: false
 },
 Regno: {
     type: String,
     required: false
 },
 fathername: {
     type: String,
     required: false
 },
fathermobile: {
    type: String,
    required: false
},
mothername: {
    type: String,
    required: false
},
mothermobile: {
    type: String,
    required: false
},
guardianname: {
    type: String,
    required: false
},
guardianmobile: {
    type: String,
    required: false
},
category: {
    type: mongoose.Schema.ObjectId,
    required: false
}, 
password: {
    type: String,
    required: false,
}
})
module.exports = new mongoose.model('contact',contactSchema);
