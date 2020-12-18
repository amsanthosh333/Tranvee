const vancantlandSchema = require('./../model/vacantland');
const errorHandler = require('../utils/error.handler');

class VancantlantController{


	async add(vancantland){
		try{
			let response = await vancantlandSchema.create(vancantland);
            return { status: "success",
            msg:"Vancantland Added successfully",
             result: response, message: "Added Successfully" };
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}
	
	async fetch(){
		try{
			let response = await vancantlandSchema.find({});
			let count=Object.keys(response).length;
			return response;
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}

	async fetchdata(id){
		try{
			let response = await vancantlandSchema.find({'_id':id});
			return response;
			
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}


	async fetchdatafilter(Facing,DTCP,RegisterOffice,Sold,MainRoadFacing,Refertype){

		var query="";

		// if (Facing != null||"") {
		// 	query+="Facing:"+Facing;
			
		// }else{
		// }

		// if (DTCP != null||"") {
		// 	query+="DTCP:"+DTCP;
			
		// }else{
		// }
		// if (RegisterOffice != null||"") {
		// 	query+="RegisterOffice:"+RegisterOffice;
			
		// }else{
		// }
		// if (Sold != null||"") {
		// 	query+="Sold:"+Sold;
			
		// }else{
		// }
		// if (Sold != null||"") {
		// 	query+="Sold:"+Sold;
			
		// }else{
		// }
		try{
			let response = await vancantlandSchema.find({
                Facing: Facing,
				DTCP: DTCP,
				RegisterOffice: RegisterOffice,
				Sold: Sold,
				MainRoadFacing: MainRoadFacing,
				Refertype: Refertype,
            });
			return response;
			
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}

	async delete(id){
		try{
			let response = await vancantlandSchema.deleteOne({_id: id});
			return {
				status: "success",
				response: response
			};
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}

	async update(id, body) {

        try {
            let response = await vancantlandSchema.update({_id: id}, body);
            return { status: "success",   msg:"Vancantland Updated successfully", result: response, message: "Updated Successfully" };

        } catch (error) {
            return { status: "error", error: error };
        }

    }

}
module.exports = new VancantlantController();