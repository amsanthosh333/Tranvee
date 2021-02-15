const singlesmsSchema = require('../model/singlesms');
const errorHandler = require('../utils/error.handler');

class singlesmsController{


	async add(farm){
		try{
			let response = await singlesmsSchema.create(farm);
			return { status: "success",   msg:"singlesms Added successfully", result: response, message: "Added Successfully" };
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}
	
	async fetch(){
		try{
			let response = await singlesmsSchema.find({});
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

	async fetchdata1(category){
		try{
			let response = await singlesmsSchema.find({'category':category});
			return {
				response: response,
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
			let response = await singlesmsSchema.deleteOne({_id: id});
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
            let response = await singlesmsSchema.update({_id: id}, body);
            return { status: "success", msg:"singlesms Updated successfully",result: response, message: "Updated Successfully" };

        } catch (error) {
            return { status: "error", error: error };
        }

    }

	async aggregation() {
		try {
		return  await singlesmsSchema.aggregate([
				{$lookup:
					  {
						from: "categories",
						localField: "category",
						foreignField: "_id",
						as: "categoryDetails"
					  }
				 },			 
				]);
		} catch (error) {
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
    }

}
module.exports = new singlesmsController();