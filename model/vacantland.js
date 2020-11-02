const mongoose = require("mongoose");

const vancantlandSchema = new mongoose.Schema({
    Date: {
        type: String,
        required: true
    },
    Area: {
        type: String,
        required: true
    },
    totalSizesq: {
        type: String,
        required: true
    },
    Northsizesq: {
        type: String,
        required: true
    },
    Eastsizesq: {
        type: String,
        required: true
    },
    Westsizesq: {
        type: String,
        required: true
    },
    Southsizesq: {
        type: String,
        required: true
    }, 
    Facing: {
        type: String,
        required: true
    },
    RateperSq: {
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
    FrontRoadwidth: {
        type: String,
        required: true
    },
    CornerSite: {
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
    MAPIMAGE1: {
        type: String,
        required: false
    },
     MAPIMAGE2: {
        type: String,
        required: false
    }, 
    MAPIMAGE3: {
        type: String,
        required: false
    }, 
    MAPIMAGE4: {
        type: String,
        required: false
    }, 
    MAPIMAGE5: {
        type: String,
        required: false
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
    },
    Remarks: {
        type: String,
        required: true
    }

})
module.exports = new mongoose.model('vancant',vancantlandSchema);
