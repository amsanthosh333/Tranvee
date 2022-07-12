const vechicaltypeSchema = require('../model/vechicaltype');
const errorHandler = require('../utils/error.handler');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
class vechicaltypeController{


	async add(farm){
		try{
			let response = await vechicaltypeSchema.create(farm);
			return { status: "success",   msg:"vechicalcost Added successfully", result: response, message: "Added Successfully" };
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}
	
	async fetch(){
		try{
			let response = await vechicaltypeSchema.find({});
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
	async aggregation(Vechicle) {
		try {
		let responce=await vechicaltypeSchema.aggregate([
			{
				$match: {
					Vechicle:ObjectId(Vechicle),
				}
			},{$lookup:
			{
			  from: "vachicles",
			  localField: "Vechicle",
			  foreignField: "_id",
			  as: "vechicalDetails"
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
	async fetchdata(id){
		try{
			let response = await vechicaltypeSchema.find({'_id':id});
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
			let response = await vechicaltypeSchema.deleteOne({_id: id});
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
            let response = await vechicaltypeSchema.update({_id: id}, body);
            return { status: "success", msg:"vechicalcost Updated successfully",result: response, message: "Updated Successfully" };

        } catch (error) {
            return { status: "error", error: error };
        }

    }

}
module.exports = new vechicaltypeController();