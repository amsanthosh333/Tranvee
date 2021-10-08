const driverlocationSchema = require('../model/driverlocation');
const errorHandler = require('../utils/error.handler');

class driverlocationController{


	async add(farm){
		try{
			let response;
			let driverid=farm.Driverid;
         console.log("driverid",""+driverid);

		 var dateTime = require('node-datetime');
		 var dt = dateTime.create();
		 farm.lastupdate= dt.format('Y-m-d H:M:S');

        
           let user = await driverlocationSchema.findOne({
           	Driverid: driverid
           });

			if(!user){
				response = await driverlocationSchema.create(farm);
            }else{
				console.log("User",""+user._id);
				response = await driverlocationSchema.update({_id: user._id}, farm);
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

	async fetchdata(Driverid){
		try{
			let response = await driverlocationSchema.find({'Driverid':Driverid});
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
	async aggregation() {
		try {
		let responce=await driverlocationSchema.aggregate([
			{$lookup:
			{
			  from: "drivers",
			  localField: "Driverid",
			  foreignField: "_id",
			  as: "driversDetails"
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
module.exports = new driverlocationController();