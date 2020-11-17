const mongoose = require("mongoose");

const newhouseSchema = new mongoose.Schema({
    Date: {
        type: String,
        required: false
    },
    Type: {
        type: String,
        required: false
    },
    Area: {
        type: String,
        required: false
    },
    DTCP: {
        type: String,
        required: false
    },
    Unapproved: {
        type: String,
        required: false
    },
    BuildingApproval : {
        type: String,
        required: false
    },
    BuildingPlan: {
        type: String,
        required: false
    }, 
    Housetax: {
        type: String,
        required: false
    },
    HouseType: {
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
    Borewell: {
        type: String,
        required: false
    },
    Facing: {
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
    EBType: {
        type: String,
        required: false
    },
    TemporaryEBconnection: {
        type: String,
        required: false
    },
    BoreMotortype: {
        type: String,
        required: false
    },
    SumpCapacity: {
        type: String,
        required: false
    },
    Septictank: {
        type: String,
        required: false
    },
    Pillartype: {
        type: String,
        required: false
    },
    CornerSite: {
        type: String,
        required: false
    },
    Rainwaterharvest: {
        type: String,
        required: false
    },
    Watertank: {
        type: String,
        required: false
    },
    Undergrounddrainage: {
        type: String,
        required: false
    },
    Drainage: {
        type: String,
        required: false
    },
    CarParkingsize: {
        type: String,
        required: false
    },
    Hallsize: {
        type: String,
        required: false
    },
    Bedroomsize: {
        type: String,
        required: false
    },
     Kitchensize: {
        type: String,
        required: false
    },
    Dinningsize: {
        type: String,
        required: false
    },
    Bathroomsize: {
        type: String,
        required: false
    },
    AttachedBathroom: {
        type: String,
        required: false
    },
    Commonbathroom: {
        type: String,
        required: false
    },
    OuterBathroom: {
        type: String,
        required: false
    },
    CompoundWall: {
        type: String,
        required: false
    },
    Kitchengranite: {
        type: String,
        required: false
    },
    ModelerKitchen: {
        type: String,
        required: false
    },
    Woodwork: {
        type: String,
        required: false
    },
    Firstfloor: {
        type: String,
        required: false
    },
    Passageside: {
        type: String,
        required: false
    },
    MainDoortype: {
        type: String,
        required: false
    }, 
    WindowType: {
        type: String,
        required: false
    },
    FlooringType: {
        type: String,
        required: false
    },
    Painting: {
        type: String,
        required: false
    },
    OtherDetails: {
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
    OwnersDetailsContact: {
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
    }

})
module.exports = new mongoose.model('newhouse',newhouseSchema);
