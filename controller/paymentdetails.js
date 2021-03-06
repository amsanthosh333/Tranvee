const paymentdetailsSchema = require('../model/paymentdetails');
const errorHandler = require('../utils/error.handler');


class paymentdetailsController {


	async add(farm){
		try{
			let response = await paymentdetailsSchema.create(farm);
			return { status: "success",   msg:"Paymentdetails Added successfully", result: response, message: "Added Successfully" };
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}
	
	async fetch(){
		try{
			let response = await paymentdetailsSchema.find();
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
			let response = await paymentdetailsSchema.find({_id: id});
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
			let response = await paymentdetailsSchema.deleteOne({_id: id});
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
            let response = await paymentdetailsSchema.update({_id: id}, body);
            return { status: "success", msg:"Paymentdetails Updated successfully",result: response, message: "Updated Successfully" };

        } catch (error) {
            return { status: "error", error: error };
        }

    }


}

       

module.exports=new paymentdetailsController();