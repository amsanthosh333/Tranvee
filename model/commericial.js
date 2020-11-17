const mongoose = require("mongoose");

const commericialSchema = new mongoose.Schema({
    Date: {
        type: String,
        required: false
    },
    EBServices : {
        type: String,
        required: false
    },
    TAX: {
        type: String,
        required: false
    },
    Rent: {
        type: String,
        required: false
    },
    NoofHouses: {
        type: String,
        required: false
    },
    NoofBedRooms: {
        type: String,
        required: false
    },
    Rainwaterharvest: {
        type: String,
        required: false
    }, 
    CorporationWater: {
        type: String,
        required: false
    },
    Metturwaterline: {
        type: String,
        required: false
    },
    CarParking: {
        type: String,
        required: false
    },
     YearofBuilding: {
        type: String,
        required: false
    },
    Liftfacility: {
        type: String,
        required: false
    },
    Pillar: {
        type: String,
        required: false
    },
    Others: {
        type: String,
        required: false
    },
    Referby : {
        type: String,
        required: false
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
        required: false
    }, 
    BuildupArea: {
        type: String,
        required: false
    },
     LandArea: {
        type: String,
        required: false
    },
    OwnersDetailsName: {
        type: String,
        required: false
    },
    OwnersDetailsMobile: {
        type: String,
        required: false
    },
    Sold: {
        type: String,
        required: false
    },
    place: {
        type: String,
        required: false
    },
    gvalue: {
        type: String,
        required: false
    }
})
module.exports = new mongoose.model('commericial',commericialSchema);
