const booktripSchema = require('../model/booktrip');
const customerSchema = require('../model/customer');
const driverSchema = require('../model/driver');
const vechicalcostSchema = require('../model/vechicalcost');
const vechicleSchema = require('../model/vechicle _mas');
const historySchema = require('../model/history');
const errorHandler = require('../utils/error.handler');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const historyController = require('./history');
const axios = require('axios')
const planSchema = require('../model/plan');

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


	async driverlocation(){
		let locate;
		await axios.post('http://igps.io/common_pull_api.php', {
			username: 'tranvee_logistics_services_9626163696',
			action: "get_live"
	}).then(res => {
		locate=res.data;
		})
		.catch(error => {
			locate=error;
		})
		return locate;
	}

	async add(farm){
		let historytrip={};
		let historybooktrip={};
		console.log("totalkm",""+farm.TotalKm);
		let totalamount;
		let totalkm=farm.TotalKm
		console.log("totalkm",""+totalkm);

		historytrip.totalkm=""+totalkm;
		let vechimin = await planSchema.find({'_id':farm.plan_id});
		//  console.log("totalamount1",""+vechimin[0].Min_km);
		if(totalkm < vechimin[0].distanceLimit){
			totalamount=vechimin[0].baseFare;
			console.log("totalamount1",""+totalamount);
			historytrip.RateperKm="";
			historytrip.KmCharges=""+totalamount;
			historytrip.FixedCharges="0";
		}else{
			totalamount=(totalkm - vechimin[0].distanceLimit)*vechimin[0].additionDistancePerKm;
			console.log("totalamount2",""+totalamount);
			historytrip.FixedCharges=""+totalamount;
			historytrip.RateperKm="0";
			historytrip.KmCharges="0";
		}
	
		// let count=Object.keys(vechicalcostvicee).length;
		// console.log("count",""+count);
		// console.log("vechicalcostvicee",""+vechicalcostvicee[0].amount);
	  
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
			"Bookingstatus":""+farm.Bookingstatus,
			"plan_id":""+farm.plan_id,
			"extramin":"0",
		    "basefare":""+totalamount,
			"loadingamount":"0",
			"paymentstatus":"pending"
			 }

    let response = await booktripSchema.create(booktrip);

	console.log("response",response)

	// 	try{
			
	// 	var topic = 'general';
	// 	var message = {
	// 	  notification: {
	// 		title: 'New Trip From Customer',
	// 		body: '*New Trip Created Do you accept this Trip?*'
	// 	  },
	// 	  topic: topic
	// 	};
	// 	admin.messaging().send(message)
	// 	.then((response) => {
	// 	  // Response is a message ID string.
	// 	  console.log('Successfully sent message:', response);
	// 	})
	// 	.catch((error) => {
	// 	  console.log('Error sending message:', error);
	//   });

	
		 historytrip.tripid=""+response._id;

		 console.log("historytrip",historytrip);
		
	    let historyres = await historyController.add(historytrip);

	 console.log("historyres",historyres.result._id);


	 historybooktrip.history=historyres.result._id;
	 let responsehis = await booktripSchema.update({_id: response._id}, historybooktrip);

	return { 
	  status: "1", 
	  msg:"Booktrip Added successfully", 
	  result: response, 
	  message: "Added Successfully"
	 };
		// } catch(error){
		// 	return {
		// 		status: "0",
		// 		error: errorHandler.parseMongoError(error)
		// 	};
		// }
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
	async count(){
		try{
			let response = await booktripSchema.find({'Bookingstatus': "Pending"});
			let Pendingcount=Object.keys(response).length;
			let response1 = await booktripSchema.find({'Bookingstatus': "Accepted"});
			let Acceptcount=Object.keys(response1).length;
			let response2 = await booktripSchema.find({'Bookingstatus': "Closed"});
			let Completedcount=Object.keys(response2).length;
			let response3 = await booktripSchema.find({'Bookingstatus': "Cancel"});
			let Cancelcount=Object.keys(response3).length;
			return {
				Pendingcount:Pendingcount,
				Acceptcount:Acceptcount,
				Completedcount:Completedcount,
				Cancelcount:Cancelcount
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
	async cusupdate(id, body) {
        try {
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
		let hours = date_ob.getHours();

		let minutes = date_ob.getMinutes();
		
		let date = year + "-" + month + "-" + day + " " + hours + ":" + minutes;
		
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
            return { status: "success", msg:"Booktrip Cancelled successfully",result: response, message: "Cancelled Successfully" };

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
		console.log("body",body)
		let driverdata = await driverSchema.find({'_id':body.Driverid});
		console.log("driverdata",driverdata)
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

		console.log('messagestatus:',body);

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

	async totalaggregation() {
		try {
		let responce=await booktripSchema.aggregate([
			{ $sort : { Bookdate : -1 } },
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
   }	,{$lookup:
	{
	  from: "goods",
	  localField: "Goods",
	  foreignField: "_id",
	  as: "GoodsDetails"
	}
},{$lookup:
	{
	  from: "plans",
	  localField: "plan_id",
	  foreignField: "_id",
	  as: "planDetails"
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

	async aggregation() {
		try {
		let responce=await booktripSchema.aggregate([
			{
				$match: {
					Bookingstatus: "Pending"
				}
			},
			{ $sort : { _id : -1 } },
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
   }	,{$lookup:
	{
	  from: "goods",
	  localField: "Goods",
	  foreignField: "_id",
	  as: "GoodsDetails"
	}
},{$lookup:
	{
	  from: "plans",
	  localField: "plan_id",
	  foreignField: "_id",
	  as: "planDetails"
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
	async pendingaggregation(referid) {
		try {
		let responce=await booktripSchema.aggregate([
			{
				$match: {
					referid:ObjectId(referid),
					Bookingstatus: "Pending"
				}
			},{ $sort : { Bookdate : -1 } },
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
   }	,{$lookup:
	{
	  from: "goods",
	  localField: "Goods",
	  foreignField: "_id",
	  as: "GoodsDetails"
	}
},{$lookup:
	{
	  from: "plans",
	  localField: "plan_id",
	  foreignField: "_id",
	  as: "planDetails"
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
	async acceptedaggregation(id) {
		try {
		let responce=await booktripSchema.aggregate([
			{
				$match: {
					_id:ObjectId(id)
					// Bookingstatus:Bookingstatus
				}
			},
			{ $sort : { _id : -1 } },
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
},{$lookup:
	{
	  from: "histories",
	  localField: "history",
	  foreignField: "_id",
	  as: "historiesDetails"
	}
},{$lookup:
	{
	  from: "plans",
	  localField: "plan_id",
	  foreignField: "_id",
	  as: "planDetails"
	}
}									 
				]);
				return responce;
		} catch (error) {
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
    }


	async acceptaggregation(Bookingstatus) {
		try {
		let responce=await booktripSchema.aggregate([
			{
				$match: {
					Bookingstatus:Bookingstatus
				}
			}
			,{ $sort : { _id : -1 } },
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
},{$lookup:
	{
	  from: "histories",
	  localField: "history",
	  foreignField: "_id",
	  as: "historiesDetails"
	}
},{$lookup:
	{
	  from: "plans",
	  localField: "plan_id",
	  foreignField: "_id",
	  as: "planDetails"
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
			},{ $sort : { Bookdate : -1 } },
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
},{$lookup:
	{
	  from: "histories",
	  localField: "history",
	  foreignField: "_id",
	  as: "historiesDetails"
	}
},{$lookup:
	{
	  from: "plans",
	  localField: "plan_id",
	  foreignField: "_id",
	  as: "planDetails"
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

	async accepteaggregation(Driverid,Bookingstatus) {
		try {
		let responce=await booktripSchema.aggregate([
			{
				$match: {
					Driverid:ObjectId(Driverid),
					Bookingstatus:Bookingstatus

	           }
			}
			,{ $sort : { Bookdate : -1 } },
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
},{$lookup:
	{
	  from: "histories",
	  localField: "history",
	  foreignField: "_id",
	  as: "historiesDetails"
	}
},{$lookup:
	{
	  from: "plans",
	  localField: "plan_id",
	  foreignField: "_id",
	  as: "planDetails"
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

	async statusaggregation(Bookingstatus) {
		try {
		let responce=await booktripSchema.aggregate([
			{
				$match: {
					Bookingstatus:Bookingstatus
				}
			},{ $sort : { Bookdate : -1 } },
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
},{$lookup:
	{
	  from: "histories",
	  localField: "history",
	  foreignField: "_id",
	  as: "historiesDetails"
	}
},{$lookup:
	{
	  from: "plans",
	  localField: "plan_id",
	  foreignField: "_id",
	  as: "planDetails"
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

	async driveraggregation(Driverid) {
		try {
		let responce=await booktripSchema.aggregate([
			{
				$match: {
					Driverid:ObjectId(Driverid)
								}
			},{ $sort : { Bookdate : -1 } },
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
},{$lookup:
	{
	  from: "histories",
	  localField: "history",
	  foreignField: "_id",
	  as: "historiesDetails"
	}
},{$lookup:
	{
	  from: "plans",
	  localField: "plan_id",
	  foreignField: "_id",
	  as: "planDetails"
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


	async accptaggregation(referid,Bookingstatus) {
		try {
		let responce=await booktripSchema.aggregate([
			{
				$match: {
					referid:ObjectId(referid),
					Bookingstatus:Bookingstatus
				}
			},{ $sort : { Bookdate : -1 } },
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
},{$lookup:
	{
	  from: "histories",
	  localField: "history",
	  foreignField: "_id",
	  as: "historiesDetails"
	}
},{$lookup:
	{
	  from: "plans",
	  localField: "plan_id",
	  foreignField: "_id",
	  as: "planDetails"
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
			{ $sort : { Endtriptime : -1 } },
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
	  from: "histories",
	  localField: "history",
	  foreignField: "_id",
	  as: "historiesDetails"
	}
},{$lookup:
	{
	  from: "plans",
	  localField: "plan_id",
	  foreignField: "_id",
	  as: "planDetails"
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
	async closeingaggregation(referid,Bookingstatus) {
		try {
		let responce=await booktripSchema.aggregate([
			{
				$match: {
					referid:ObjectId(referid),
					Bookingstatus:Bookingstatus
				}
			},
			{ $sort : { Endtriptime : -1 } },
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
	  from: "histories",
	  localField: "history",
	  foreignField: "_id",
	  as: "historiesDetails"
	}
},{$lookup:
	{
	  from: "plans",
	  localField: "plan_id",
	  foreignField: "_id",
	  as: "planDetails"
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
			{ $sort : { _id : -1 } },
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
},{$lookup:
	{
	  from: "plans",
	  localField: "plan_id",
	  foreignField: "_id",
	  as: "planDetails"
	}
},{$lookup:
	{
	  from: "histories",
	  localField: "history",
	  foreignField: "_id",
	  as: "historiesDetails"
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


	async customeraggregation(customerid) {
		try {
		let responce=await booktripSchema.aggregate([
			{
				$match: {				
					Customer:ObjectId(customerid)
								}
			},
			{ $sort : { Bookdate : -1 } },
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
},{$lookup:
	{
	  from: "plans",
	  localField: "plan_id",
	  foreignField: "_id",
	  as: "planDetails"
	}
},{$lookup:
	{
	  from: "histories",
	  localField: "history",
	  foreignField: "_id",
	  as: "historiesDetails"
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

	async paymentstatusaggregation(paymentstatus) {
		try {
		let responce=await booktripSchema.aggregate([
			{
				$match: {
					paymentstatus:paymentstatus
				}
			},{ $sort : { Bookdate : -1 } },
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
},{$lookup:
	{
	  from: "histories",
	  localField: "history",
	  foreignField: "_id",
	  as: "historiesDetails"
	}
},{$lookup:
	{
	  from: "plans",
	  localField: "plan_id",
	  foreignField: "_id",
	  as: "planDetails"
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

	async paymentmodeaggregation(paymentmode) {
		try {
		let responce=await booktripSchema.aggregate([
			{
				$match: {
					paymentmode:paymentmode
				}
			},{ $sort : { Bookdate : -1 } },
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
},{$lookup:
	{
	  from: "histories",
	  localField: "history",
	  foreignField: "_id",
	  as: "historiesDetails"
	}
},{$lookup:
	{
	  from: "plans",
	  localField: "plan_id",
	  foreignField: "_id",
	  as: "planDetails"
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