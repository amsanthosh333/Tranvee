const booktripSchema = require('../model/booktrip');
const errorHandler = require('../utils/error.handler');

class booktripController{


	async add(farm){
		try{
			let response = await booktripSchema.create(farm);
			return { status: "1",   msg:"Booktrip Added successfully", result: response, message: "Added Successfully" };
		} catch(error){
			return {
				status: "0",
				error: errorHandler.parseMongoError(error)
			};
		}
	}
	
	async fetch(){
		try{
			let response = await booktripSchema.find({});
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
			let response = await booktripSchema.find({'_id':id});
			return response;
			
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}
	async fetchbookdata(Customer){
		try{
			let response = await booktripSchema.find({'Customer':Customer});
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
			let response = await booktripSchema.deleteOne({_id: id});
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
            let response = await booktripSchema.update({_id: id}, body);
            return { status: "success", msg:"Booktrip Updated successfully",result: response, message: "Updated Successfully" };

        } catch (error) {
            return { status: "error", error: error };
        }

    }
	async aggregation() {
		try {
		let responce=await booktripSchema.aggregate([
			{
				$match: {
					Bookingstatus: "Pending"
				}
			},{$lookup:
				{
				  from: "customers",
				  localField: "Customer",
				  foreignField: "_id",
				  as: "CustomerDetails"
				}
		   },{$lookup:
			{
			  from: "vachicles",
			  localField: "vechical",
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
}
module.exports = new booktripController();