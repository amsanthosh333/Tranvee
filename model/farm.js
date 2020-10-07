const mongoose = require("mongoose");

const farmSchema = new mongoose.Schema({
    Date: {
        type: String,
        required: true
    },
    Area: {
        type: String,
        required: true
    },
    Acers: {
        type: String,
        required: true
    },
    NoofWells: {
        type: String,
        required: true
    },
    Well: {
        type: String,
        required: true
    },
    BoreWell  : {
        type: String,
        required: true
    },
    HP: {
        type: String,
        required: true
    }, 
    FreeServices: {
        type: String,
        required: true
    },
    EBServices: {
        type: String,
        required: true
    },
    AgriLand: {
        type: String,
        required: true
    },
    SuitableforSite: {
        type: String,
        required: true
    },
    RoadFacility: {
        type: String,
        required: true
    },
    MainRoadFacing: {
        type: String,
        required: true
    },
    Roadfacedistance: {
        type: String,
        required: true
    },
    SoilType: {
        type: String,
        required: true
    },
    BusRoute: {
        type: String,
        required: true
    },
    Fencing: {
        type: String,
        required: true
    },
    WaterLevel: {
        type: String,
        required: true
    }, 
    Canal: {
        type: String,
        required: true
    },
    House: {
        type: String,
        required: true
    },
    Distance: {
        type: String,
        required: true
    },
    EBLinecrossing: {
        type: String,
        required: true
    },
    RateperAcre: {
        type: String,
        required: true
    },
    Budget: {
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
    Referby: {
        type: String,
        required: true
    },
    ReferbyName: {
        type: String,
        required: true
    },
    ReferbyContact: {
        type: String,
        required: true
    },
    OtherDetails: {
        type: String,
        required: true
    },
    GuidelineValue: {
        type: String,
        required: true
    },
    Sold: {
        type: String,
        required: true
    }

})
module.exports = new mongoose.model('farm',farmSchema);
