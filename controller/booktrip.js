const booktripSchema = require('../model/booktrip');
const errorHandler = require('../utils/error.handler');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
//  const admin = require('../tranzporter-f2fc8-firebase-adminsdk-mnit9-f3d6a6cec4.json')

const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };

  var admin = require("firebase-admin");

  var serviceAccount = require("../kargos-firebase-adminsdk-496kc-87885085c5.json");
  
  admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://kargos.firebaseio.com"
  });

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
	// async notification(farm){
	// 	const  registrationToken = farm.registrationToken
	// 	const message = farm.message
	// 	const options =  notification_options
		
	// 	  admin.messaging().sendToDevice(registrationToken, message, options)
	// 	  .then( response => {
	
	// 	   res.status(200).send("Notification sent successfully"+response)
			
	// 	  })
	// 	  .catch( error => {
	// 		  console.log(error);
	// 	  });
	// }
	async commonnotification(){
		const registrationTokens = [
			'dS6i6JwcTDecFyijxH8HHE:APA91bGb5BEMqhCxYG1MUKUhVfQ7MDeAbJf6RDVQnv9lOKL3SWNhT9NnTKc3y5_3XDTrRfohaEdT9FjgWObYKK-nJ7QgS_0Y10q7oIHHY4GpmNwtbDdQtZrqDHEXhIV3cejrrGldxyMD',
		  ];
		  const message = { 
			  notification: {
				  title: 'Push notifications are great!',
				  body: 'They could be better if you used SendMan :-)'
			  }
		  };
		  console.log(`Attempting to send the notification to ${registrationTokens.length} devices.`);
		  try {
			  const { failureCount, successCount } = await admin.messaging().sendToDevice(registrationToken, message, { priority: 'high' });
			  console.log(`Successfully sent the notification to ${successCount} devices (${failureCount} failed).`);    
		  } catch (err) {
			  console.log('An error occurred while connecting to Firebase');
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


	// async fetchbodydata(body){
	// 	let id=body.id;
	// 	try{
	// 		let response = await booktripSchema.find({'_id':id});
	// 		return {
	// 			response: response
	// 		};
			
	// 	} catch(error){
	// 		return {
	// 			status: "error",
	// 			error: errorHandler.parseMongoError(error)
	// 		};
	// 	}
	// }
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

	async amount_update(id, body) {

        try {
            let response = await booktripSchema.updateOne({_id: id}, body);
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
	   },{$lookup:
		{
		  from: "drivers",
		  localField: "Driverid",
		  foreignField: "_id",
		  as: "DriverDetails"
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


	async accaggregation(Driverid,Bookingstatus) {
		try {
		let responce=await booktripSchema.aggregate([
			{
				$match: {
					Driverid:ObjectId(Driverid),
					Bookingstatus:Bookingstatus
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
	   },{$lookup:
		{
		  from: "drivers",
		  localField: "Driverid",
		  foreignField: "_id",
		  as: "DriverDetails"
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

	async cloaggregation() {
		try {
		let responce=await booktripSchema.aggregate([
			{
				$match: {
					Bookingstatus: "Closed"
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
	   },{$lookup:
		{
		  from: "drivers",
		  localField: "Driverid",
		  foreignField: "_id",
		  as: "DriverDetails"
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


	async aggregation1(customerid,bookingstatus) {
		console.log("bookingstatus",bookingstatus);
		try {
		let responce=await booktripSchema.aggregate([
			{
				$match: {				
					Customer:ObjectId(customerid),
					Bookingstatus:bookingstatus
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
   },{$lookup:
	{
	  from: "drivers",
	  localField: "Driverid",
	  foreignField: "_id",
	  as: "DriverDetails"
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