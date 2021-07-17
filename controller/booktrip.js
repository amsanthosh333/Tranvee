const booktripSchema = require('../model/booktrip');
const customerSchema = require('../model/customer');
const errorHandler = require('../utils/error.handler');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
//  const admin = require('../tranzporter-f2fc8-firebase-adminsdk-mnit9-f3d6a6cec4.json')


//   const admin = require('../firebase-config')

//   const notification_options = {
//     priority: "high",
//     timeToLive: 60 * 60 * 24
//   };

var admin = require("firebase-admin");

var serviceAccount = require('../kargos-firebase-adminsdk-496kc-87885085c5.json');

admin.initializeApp({
  	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://kargos.firebaseio.com"
});




class booktripController{


	async add(farm){
		try{
			let response = await booktripSchema.create(farm);
			
		var topic = 'general';
		var message = {
		  notification: {
			title: 'New Order From Customer',
			body: 'Are You Accept the Order??'
		  },
		  topic: topic
		};
		admin.messaging().send(message)
		.then((response) => {
		  // Response is a message ID string.
		  console.log('Successfully sent message:', response);
		})
		.catch((error) => {
		  console.log('Error sending message:', error);
	  });



			return { status: "1",   msg:"Booktrip Added successfully", result: response, message: "Added Successfully" };
		} catch(error){
			return {
				status: "0",
				error: errorHandler.parseMongoError(error)
			};
		}
	}
	async notification(){
		// const registrationTokens = [
		// 	'dS6i6JwcTDecFyijxH8HHE:APA91bGb5BEMqhCxYG1MUKUhVfQ7MDeAbJf6RDVQnv9lOKL3SWNhT9NnTKc3y5_3XDTrRfohaEdT9FjgWObYKK-nJ7QgS_0Y10q7oIHHY4GpmNwtbDdQtZrqDHEXhIV3cejrrGldxyMD',
		// 	'cyDaH0qYQJui6kbBvwexTg:APA91bE4mF0BQmkuJEUcQmQSJWNK_W0HKD1MdCFdUMlaTPmQqE1AM2ueXG0Wqtyc1mLcNzFBIiHbyZZCe_8LKOvbY7HiuxlthbkeiOAN9AaFmhO3Qs90i9Eou2xFyEoRLtBr5tlbYVfC'
		//   ];
		  const message = { 
			  notification: {
				  title: 'Push notifications are great!',
				  body: 'They could be better if you used SendMan :-)'
			  },
			  token:'dS6i6JwcTDecFyijxH8HHE:APA91bGb5BEMqhCxYG1MUKUhVfQ7MDeAbJf6RDVQnv9lOKL3SWNhT9NnTKc3y5_3XDTrRfohaEdT9FjgWObYKK-nJ7QgS_0Y10q7oIHHY4GpmNwtbDdQtZrqDHEXhIV3cejrrGldxyMD'
		  };


		admin.messaging().send(message)
		.then((response) => {
		  // Response is a message ID string.
		  console.log('Successfully sent message:', response);
		})
		.catch((error) => {
		  console.log('Error sending message:', error);
	  });



	}
	async commonnotification(){
	
		var topic = 'general';
		var message = {
		  notification: {
			title: 'New Order From Customer',
			body: 'Are You Accept the Order??'
		  },
		  topic: topic
		};
		admin.messaging().send(message)
		.then((response) => {
		  // Response is a message ID string.
		  console.log('Successfully sent message:', response);
		})
		.catch((error) => {
		  console.log('Error sending message:', error);
	  });


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
		let userdata = await booktripSchema.find({'_id':id});

		let custresponse = await customerSchema.find({'_id': userdata[0].Customer});

		let token=custresponse[0].token;

        let messagestatus=body.Bookingstatus;
		
        try {
			const message = { 
				notification: {
					title: messagestatus,
					body: 'Your order Has been'+message
				},
				token:token
			};
  
  
		  admin.messaging().send(message)
		  .then((response) => {
			console.log('Successfully sent message:', response);
		  })
		  .catch((error) => {
			console.log('Error sending message:', error);
		});


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