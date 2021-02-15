const mongoose = require("mongoose");

const singlesmsSchema = new mongoose.Schema({
 date: {
     type: String,
     required: false
 },
msg: {
     type: String,
     required: false
 },
 sentby: {
    type: mongoose.Schema.ObjectId,
    required: false
 },
senton: {
    type: String,
    required: false
},
status: {
    type: String,
    required: false
},
approvedby: {
    type: mongoose.Schema.ObjectId,
    required: false
},
approvedon: {
    type: String,
    required: false
},
to: {
    type: mongoose.Schema.ObjectId,
    required: false
}
})
module.exports = new mongoose.model('singlesms',singlesmsSchema);
