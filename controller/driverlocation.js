const driverlocationSchema = require('../model/driverlocation');
const errorHandler = require('../utils/error.handler');

class driverlocationController{


	async add(farm){
		try{
			let response;
			let driverid=farm.Driverid;

			let User= await driverlocationSchema.find({'Driverid':driverid});

			if(!User){
				response = await driverlocationSchema.create(farm);
            }else{
				response = await driverlocationSchema.update({_id: User.id}, farm);
			}


			
			return { status: "success",   msg:"driverlocation Added successfully", result: response, message: "Added Successfully" };
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}
	
	async fetch(){
		try{
			let response = await driverlocationSchema.find({});
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
			let response = await driverlocationSchema.find({'_id':id});
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
			let response = await driverlocationSchema.deleteOne({_id: id});
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
            let response = await driverlocationSchema.update({_id: id}, body);
            return { status: "success", msg:"city Updated successfully",result: response, message: "Updated Successfully" };

        } catch (error) {
            return { status: "error", error: error };
        }

    }

}
module.exports = new driverlocationController();