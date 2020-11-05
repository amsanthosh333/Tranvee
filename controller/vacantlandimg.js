const vancantlandimgSchema = require('./../model/vacantlandimg');
const errorHandler = require('../utils/error.handler');

class VancantlantimgController{


	async add(vancantland){
		try{
			let response = await vancantlandimgSchema.create(vancantland);
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
			let response = await vancantlandimgSchema.find({});
			return {
				response: response
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
			let response = await vancantlandimgSchema.find({'vacantid':id});
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
			let response = await vancantlandimgSchema.deleteOne({_id: id});
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
            let response = await vancantlandimgSchema.update({_id: id}, body);
            return { status: "success",   msg:"Vancantland Updated successfully", result: response, message: "Updated Successfully" };

        } catch (error) {
            return { status: "error", error: error };
        }

    }

}
module.exports = new VancantlantimgController();