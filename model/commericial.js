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
    NoofHouses: {
        type: String,
        required: true
    },
    Numberofbedrooms1BHK : {
        type: String,
        required: true
    }, 
     Numberofbedrooms2BHK : {
        type: String,
        required: true
    }, 
     Numberofbedrooms3BHK : {
        type: String,
        required: true
    },  
    Numberofbedrooms4BHK : {
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
        required: true
    },
    ReferbyContact: {
        type: String,
        required: true
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
