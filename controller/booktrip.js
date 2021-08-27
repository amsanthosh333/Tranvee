const booktripSchema = require('../model/booktrip');
const customerSchema = require('../model/customer');
const driverSchema = require('../model/driver');
const vechicalcostSchema = require('../model/vechicalcost');
const vechicleSchema = require('../model/vechicle _mas');

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

		console.log("totalkm",""+farm.TotalKm);
		let totalamount;
		let totalkm=farm.TotalKm*2
		console.log("totalkm",""+totalkm);
		let vechimin = await vechicleSchema.find({'_id':farm.vechical});
		 console.log("totalamount1",""+vechimin[0].Min_km);
		if(totalkm > vechimin[0].Min_km){
			let vechicalcostvicee = await vechicalcostSchema.find({Vechicle:farm.vechical,Startkm:{$lte:totalkm},Endkm:{$gte:totalkm}});
			totalamount=totalkm*vechicalcostvicee[0].amount;
			console.log("totalamount1",""+totalamount);
		}else{
			let vechicalcostvicee=vechimin[0].Min_price;
			totalamount=vechicalcostvicee;
			console.log("totalamount2",""+totalamount);
		}

      
		
		// let count=Object.keys(vechicalcostvicee).length;
		// console.log("count",""+count);
		// console.log("vechicalcostvicee",""+vechicalcostvicee[0].amount);
	  
	    console.log("totalamount",""+totalamount);



		let booktrip={
			"Customer":""+farm.Customer,
			"Pickuploc":""+farm.Pickuploc,
			"Droploc":""+farm.Droploc,
			"TotalKm":""+farm.TotalKm,
			"Vechicaltype":""+farm.Vechicaltype,
			"vechical":""+farm.vechical,
			"Booktime":""+farm.Booktime,
			"Bookdate":""+farm.Bookdate,
			"Amount":""+totalamount,
			"Pickuploclat":""+farm.Pickuploclat,
			"Pickuploclng":""+farm.Pickuploclng,
			"Droploclat":""+farm.Droploclat,
			"Droploclng":""+farm.Droploclng,
			"Goods":""+farm.Goods,
			"Bookingstatus":""+farm.Bookingstatus
			 }





		try{
			let response = await booktripSchema.create(booktrip);
			
		var topic = 'general';
		var message = {
		  notification: {
			title: 'New Trip From Customer',
			body: '*New Trip Created Do you accept this Trip?*'
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

	async amountcalc(farm){

		
		console.log("totalkm",""+farm.TotalKm);
		let totalamount;
		let totalkm=farm.TotalKm*2
		console.log("totalkm",""+totalkm);
		let vechimin = await vechicleSchema.find({'_id':farm.vechical});
		 console.log("totalamount1",""+vechimin[0].Min_km);
		if(totalkm > vechimin[0].Min_km){
			let vechicalcostvicee = await vechicalcostSchema.find({Vechicle:farm.vechical,Startkm:{$lte:totalkm},Endkm:{$gte:totalkm}});
			totalamount=totalkm*vechicalcostvicee[0].amount;
			console.log("totalamount1",""+totalamount);
		}else{
			let vechicalcostvicee=vechimin[0].Min_price;
			totalamount=vechicalcostvicee;
			console.log("totalamount2",""+totalamount);
		}

		return { status: "1", amount: totalamount, message: "Added Successfully" };
	
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
			body: '*New Trip Created Do you accept this Trip?*'
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

	async update(id,state,body) {
		let userdata = await booktripSchema.find({'_id':id});
		console.log('userdata:', userdata[0].Customer);
		let custresponse = await customerSchema.find({'_id': userdata[0].Customer});
		console.log('token:', custresponse[0].token);
		let token=custresponse[0].token;

        let messagestatus=body.Bookingstatus;


		let driverdata = await driverSchema.find({'_id':body.Driverid});


		let drivername=driverdata[0].Name;




		console.log('messagestatus:',state);
        try {
			const message = { 
				notification: {
					title: "Your Trip Status",
					body: " "+state+" "+'by'+" "+drivername
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


	async cancelupdate(id,state,body) {
		let userdata = await booktripSchema.find({'_id':id});
		console.log('userdata:', userdata[0].Customer);
		let custresponse = await customerSchema.find({'_id': userdata[0].Customer});
		console.log('token:', custresponse[0].token);
		let token=custresponse[0].token;

        let messagestatus=body.Bookingstatus;

		let date_ob = new Date();

		let day = ("0" + date_ob.getDate()).slice(-2);
		
		let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
		
		let year = date_ob.getFullYear();
		
		   
		
		let date = year + "-" + month + "-" + day;
		
		console.log(date);
		
		body.Closedate=date;

		console.log('messagestatus:',state);
        try {
			const message = { 
				notification: {
					title: "Your Trip Status",
					body: ""+state
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
	async acceptupdate(id,state,body) {

		let response;

		let bookdriver = await booktripSchema.findOne({
			_id: id,
			Bookingstatus: "Pending",
		});

		if(!bookdriver){
			throw new Error('Already Another Driver Accept the Request');
		}

		let userdata = await booktripSchema.find({'_id':id});
		console.log('userdata:', userdata[0].Customer);
		let custresponse = await customerSchema.find({'_id': userdata[0].Customer});
		console.log('token:', custresponse[0].token);
		let token=custresponse[0].token;
		let messagestatus=body.Bookingstatus;
		let driverdata = await driverSchema.find({'_id':body.Driverid});
		let drivername=driverdata[0].Name;
		console.log('messagestatus:',state);
		try {
			const message = { 
				notification: {
					title: "Your Trip Status",
					body: " "+state+" "+'by'+" "+drivername
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

		 response = await booktripSchema.update({_id: id}, body);


        return { status: "success", msg:"Booktrip Updated successfully",result: response, message: "Updated Successfully" };

        } catch (error) {
            return { status: "error", error: error };
        }

    }

	async amount_update(id, body) {

		let userdata = await booktripSchema.find({'_id':id});
		console.log('userdata:', userdata[0].Customer);
		let custresponse = await customerSchema.find({'_id': userdata[0].Customer});
		console.log('token:', custresponse[0].token);
		let token=custresponse[0].token;

        let messagestatus=body.Bookingstatus;

		let amount =body.Amount;
		console.log('amount:', amount);

		let driverdata = await driverSchema.find({'_id':body.Driverid});


		let drivername=driverdata[0].Name;

   

		let date_ob = new Date();

		let day = ("0" + date_ob.getDate()).slice(-2);
		
		let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
		
		let year = date_ob.getFullYear();
		
		   
		
		let date = year + "-" + month + "-" + day;
		
		console.log(date);

		body.Closedate=date;

		console.log('messagestatus:',messagestatus);
        try {
			const message = { 
				notification: {
					title: "Your Trip Status",
					body: 'Your Trip Completed Successfully.Total Amount :'+amount
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
   }	,{$lookup:
	{
	  from: "goods",
	  localField: "Goods",
	  foreignField: "_id",
	  as: "GoodsDetails"
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
			},
			{$lookup:
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
   },{$lookup:
	{
	  from: "goods",
	  localField: "Goods",
	  foreignField: "_id",
	  as: "GoodsDetails"
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

	async cloaggregation(Driverid,Bookingstatus) {
		try {
		let responce=await booktripSchema.aggregate([
			{
				$match: {
					Driverid:ObjectId(Driverid),
					Bookingstatus:Bookingstatus
				}
			},
			{ $sort : { Closedate : -1 } },
			{$lookup:
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
			},
			{ $sort : { Closedate : -1 } },
			{$lookup:
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
},{$lookup:
	{
	  from: "goods",
	  localField: "Goods",
	  foreignField: "_id",
	  as: "GoodsDetails"
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