const mongoose = require("mongoose");

const farmSchema = new mongoose.Schema({
    Date: {
        type: String,
        required: false
    },
    Area: {
        type: String,
        required: false
    },
    Acers: {
        type: String,
        required: false
    },
    NoofWells: {
        type: String,
        required: false
    },
    Well: {
        type: String,
        required: false
    },
    BoreWell  : {
        type: String,
        required: false
    },
    HP: {
        type: String,
        required: false
    }, 
    FreeServices: {
        type: String,
        required: false
    },
    EBServices: {
        type: String,
        required: false
    },
    AgriLand: {
        type: String,
        required: false
    },
    SuitableforSite: {
        type: String,
        required: false
    },
    RoadFacility: {
        type: String,
        required: false
    },
    MainRoadFacing: {
        type: String,
        required: false
    },
    Roadfacedistance: {
        type: String,
        required: false
    },
    SoilType: {
        type: String,
        required: false
    },
    BusRoute: {
        type: String,
        required: false
    },
    Fencing: {
        type: String,
        required: false
    }, 
    Canal: {
        type: String,
        required: false
    },
    House: {
        type: String,
        required: false
    },
    Distance: {
        type: String,
        required: false
    },
    EBLinecrossing: {
        type: String,
        required: false
    },
    RateperAcre: {
        type: String,
        required: false
    },
    Budget: {
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
    Referby: {
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
    OtherDetails: {
        type: String,
        required: false
    },
    GuidelineValue: {
        type: String,
        required: false
    },
    Sold: {
        type: String,
        required: false
    }

})
module.exports = new mongoose.model('farm',farmSchema);
