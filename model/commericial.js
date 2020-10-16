const mongoose = require("mongoose");

const commericialSchema = new mongoose.Schema({
    Date: {
        type: String,
        required: true
    },
    EBServices : {
        type: String,
        required: true
    },
    TAX: {
        type: String,
        required: true
    },
    Rent: {
        type: String,
        required: true
    },
    NoofBedRooms: {
        type: String,
        required: true
    },
    Numberofbedrooms: {
        type: String,
        required: true
    },
    Rainwaterharvest: {
        type: String,
        required: true
    }, 
    CorporationWater: {
        type: String,
        required: true
    },
    Metturwaterline: {
        type: String,
        required: true
    },
    CarParking: {
        type: String,
        required: true
    },
     YearofBuilding: {
        type: String,
        required: true
    },
    Liftfacility: {
        type: String,
        required: true
    },
    Pillar: {
        type: String,
        required: true
    },
    Others: {
        type: String,
        required: true
    },
    Referby : {
        type: String,
        required: true
    },
    ReferbyName: {
        type: String,
        required: false
    },
    ReferbyContact: {
        type: String,
        required: false
    },
    Budget: {
        type: String,
        required: true
    }, 
    BuildupArea: {
        type: String,
        required: true
    },
     LandArea: {
        type: String,
        required: true
    },
    OwnersDetailsName: {
        type: String,
        required: true
    },
    OwnersDetailsMobile: {
        type: String,
        required: true
    },
    Sold: {
        type: String,
        required: true
    }
})
module.exports = new mongoose.model('commericial',commericialSchema);
