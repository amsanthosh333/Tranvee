const mongoose = require("mongoose");

const newhouseSchema = new mongoose.Schema({
    Date: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    Area: {
        type: String,
        required: true
    },
    DTCP: {
        type: String,
        required: true
    },
    Unapproved: {
        type: String,
        required: true
    },
    BuildingApproval : {
        type: String,
        required: true
    },
    BuildingPlan: {
        type: String,
        required: true
    }, 
    Housetax: {
        type: String,
        required: true
    },
    HouseType: {
        type: String,
        required: true
    },
    Corporationwater: {
        type: String,
        required: true
    },
    LTWater: {
        type: String,
        required: true
    },
    Borewell: {
        type: String,
        required: true
    },
    Facing: {
        type: String,
        required: true
    },
    Sizeinsqft: {
        type: String,
        required: true
    },
    EBType: {
        type: String,
        required: true
    },
    BorewellLevel: {
        type: String,
        required: true
    },
    Drainage: {
        type: String,
        required: true
    },
    Undergrounddrainage: {
        type: String,
        required: true
    },
    EBPost: {
        type: String,
        required: true
    },
    GuidelineValue: {
        type: String,
        required: true
    },
    Budget: {
        type: String,
        required: true
    },
    MAP: {
        type: String,
        required: true
    },
    MAPIMAGE: {
        type: String,
        required: true
    },
    EC: {
        type: String,
        required: true
    },
    MainRoadFacing: {
        type: String,
        required: true
    },
    Distance: {
        type: String,
        required: true
    },
    EBLineCrossing: {
        type: String,
        required: true
    },
    Vacantlandtax: {
        type: String,
        required: true
    },
    RegisterOffice: {
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
    Others: {
        type: String,
        required: true
    },
    Refertype: {
        type: String,
        required: true
    },
    ReferName: {
        type: String,
        required: false
    },
    ReferContact: {
        type: String,
        required: false
    },
    Sold: {
        type: String,
        required: true
    }

})
module.exports = new mongoose.model('newhouse',newhouseSchema);
