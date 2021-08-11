const driverlocationSchema = require('../model/driverlocation');
const errorHandler = require('../utils/error.handler');

class driverlocationController{


	async add(farm){
		try{
			let response;
			let driverid=farm.Driverid;
         console.log("driverid",""+driverid);


		 let date_ob = new Date();

		 // current date
		 // adjust 0 before single digit date
		 let date = ("0" + date_ob.getDate()).slice(-2);
		 
		 // current month
		 let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
		 
		 // current year
		 let year = date_ob.getFullYear();
		 
		 // current hours
		 let hours = date_ob.getHours();
		 
		 // current minutes
		 let minutes = date_ob.getMinutes();
		 
		 // current seconds
		 let seconds = date_ob.getSeconds();

        farm.lastupdate=date_ob.toTimeString();
	     	 
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

}
module.exports = new driverlocationController();