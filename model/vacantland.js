const mongoose = require("mongoose");

const vancantlandSchema = new mongoose.Schema({
    Date: {
        type: String,
        required: false
    },
    Area: {
        type: String,
        required: false
    },
    totalSizesq: {
        type: String,
        required: false
    },
    Northsizesq: {
        type: String,
        required: false
    },
    Eastsizesq: {
        type: String,
        required: false
    },
    Westsizesq: {
        type: String,
        required: false
    },
    Southsizesq: {
        type: String,
        required: false
    }, 
    Facing: {
        type: String,
        required: false
    },
    RateperSq: {
        type: String,
        required: false
    },
    DTCP: {
        type: String,
        required: false
    },
    FrontRoadwidth: {
        type: String,
        required: false
    },
    CornerSite: {
        type: String,
        required: false
    },
    Corporationwater: {
        type: String,
        required: false
    },
    LTWater: {
        type: String,
        required: false
    },
    BorewellLevel: {
        type: String,
        required: false
    },
    Drainage: {
        type: String,
        required: false
    },
    Undergrounddrainage: {
        type: String,
        required: false
    },
    EBPost: {
        type: String,
        required: false
    },
    GuidelineValue: {
        type: String,
        required: false
    },
    Budget: {
        type: String,
        required: false
    },
    MAP: {
        type: String,
        required: false
    },
    MAPIMAGE: {
        type: String,
        required: false
    },
    EC: {
        type: String,
        required: false
    },
    MainRoadFacing: {
        type: String,
        required: false
    },
    Distance: {
        type: String,
        required: false
    },
    EBLineCrossing: {
        type: String,
        required: false
    },
    Vacantlandtax: {
        type: String,
        required: false
    },
    RegisterOffice: {
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
    Others: {
        type: String,
        required: false
    },
    Refertype: {
        type: String,
        required: false
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
        required: false
    },
    Remarks: {
        type: String,
        required: false
    }

})
module.exports = new mongoose.model('vancant',vancantlandSchema);
