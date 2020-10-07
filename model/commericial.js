const mongoose = require("mongoose");

const commericialSchema = new mongoose.Schema({
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
    EBType: {
        type: String,
        required: true
    },
    TemporaryEBconnection: {
        type: String,
        required: true
    },
    BoreMotortype: {
        type: String,
        required: true
    },
    SumpCapacity: {
        type: String,
        required: true
    },
    Septictank: {
        type: String,
        required: true
    },
    Pillartype: {
        type: String,
        required: true
    },
    CornerSite: {
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
    Rainwaterharvest: {
        type: String,
        required: true
    },
    Watertank: {
        type: String,
        required: true
    },
    Undergrounddrainage: {
        type: String,
        required: true
    },
    Drainage: {
        type: String,
        required: true
    },
    CarParkingsize: {
        type: String,
        required: true
    },
    Hallsize: {
        type: String,
        required: true
    },
    Bedroomsize: {
        type: String,
        required: true
    },
     Kitchensize: {
        type: String,
        required: true
    },
    Dinningsize: {
        type: String,
        required: true
    },
    Bathroomsize: {
        type: String,
        required: true
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
        required: true
    },
    CompoundWall: {
        type: String,
        required: true
    },
    Kitchengranite: {
        type: String,
        required: true
    },
    ModelerKitchen: {
        type: String,
        required: true
    },
    Woodwork: {
        type: String,
        required: true
    },
    Firstfloor: {
        type: String,
        required: true
    },
    Passageside: {
        type: String,
        required: true
    },
    MainDoortype: {
        type: String,
        required: true
    }, 
    WindowType: {
        type: String,
        required: true
    },
    FlooringType: {
        type: String,
        required: true
    },
    Painting: {
        type: String,
        required: true
    },
    OtherDetails: {
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
    OwnersDetailsContact: {
        type: String,
        required: true
    },
    Sold: {
        type: String,
        required: true
    }

})
module.exports = new mongoose.model('commericial',commericialSchema);
