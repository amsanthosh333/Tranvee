const vechicleSchema = require('../model/vechicle _mas');
const errorHandler = require('../utils/error.handler');

class vechicleController{


	async add(farm){
		try{
			let response = await vechicleSchema.create(farm);
			return { status: "success",   msg:"vechicle Added successfully", result: response, message: "Added Successfully" };
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}
	
	async fetch(){
		try{
			let response = await vechicleSchema.find({});
			let count=Object.keys(response).length;
			return {
				response: response,
				count
			};
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}

	async fetchdata(id){
		try{
			let response = await vechicleSchema.find({'_id':id});
			return response;
			
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}
	async fetchopenvechicle(){
		try{
			let response = await vechicleSchema.find({'VechicleType':"open"});
			let count=Object.keys(response).length;
			return {
				response: response,
				count
			};
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}
	async fetchclosevechicle(){
		try{
			let response = await vechicleSchema.find({'VechicleType':"close"});
			let count=Object.keys(response).length;
			return {
				response: response,
				count
			};
			
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}
	async delete(id){
		try{
			let response = await vechicleSchema.deleteOne({_id: id});
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
            let response = await vechicleSchema.update({_id: id}, body);
            return { status: "success", msg:"vechicle Updated successfully",result: response, message: "Updated Successfully" };

        } catch (error) {
            return { status: "error", error: error };
        }

    }


	async aggregation(VechicleType) {
		try {
		let responce=await vechicleSchema.aggregate([
			{
				$match: {
					VechicleType: VechicleType
				}
			}				 
				]);
				return {
					response: responce
				};
		} catch (error) {
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
    }
	async aggregation1() {
		try {
		let responce=await vechicleSchema.aggregate([
			{$lookup:
				{
				  from: "vechicaltype",
				  localField: "VechicleType",
				  foreignField: "_id",
				  as: "VechicleTypeDetails"
				}
		   }			 
				]);
				return {
					response: responce
				};
		} catch (error) {
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
    }
}
module.exports = new vechicleController();