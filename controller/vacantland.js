const vancantlandSchema = require('./../model/vacantland');
const errorHandler = require('../utils/error.handler');

class VancantlantController{


	async add(vancantland){
		try{
			let response = await vancantlandSchema.create(vancantland);
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
			let response = await vancantlandSchema.find({});
			let count=Object.keys(response).length;
			return response;
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}

	async fetchdata(id){
		try{
			let response = await vancantlandSchema.find({'_id':id});
			return response;
			
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}


	async fetchdatafilter(Facing,DTCP,RegisterOffice,Sold,MainRoadFacing,Refertype){

		var query={};

		var criteria = {
			'Facing' : Facing ? { $regex: Facing, $options: 'i' } : null ,
			'DTCP' : DTCP ? { $regex: DTCP, $options: 'i' } : null 
		};

		// if (Facing != ""||null) {
		// 	query.Facing="Facing:"+"'"+Facing+"'"+",";
		// 	console.log("jsonstring",""+query.Facing);
			
		// }else{
		// 	console.log("jsonstring",""+query);
			
		// }

		// if (DTCP != ""||null) {
		// 	query.DTCP="DTCP:"+"'"+DTCP+"'"+",";
		// 	console.log("jsonstring",""+query.DTCP);
			
		// }else{
		// 	console.log("jsonstring",""+query);
		// }
		// if (RegisterOffice != ""||null) {
		// 	query.RegisterOffice="RegisterOffice:"+"'"+RegisterOffice+"'"+",";
		// 	console.log("jsonstring",""+query.RegisterOffice);
			
		// }else{
		// 	console.log("jsonstring",""+query);
		// }
		// if (Sold != ""||null) {
		// 	query.Sold="Sold:"+"'"+Sold+"'"+",";
		// 	console.log("jsonstring",""+query.Sold);
			
		// }else{
		// 	console.log("jsonstring",""+query);
		// }
		// if (MainRoadFacing != ""||null) {
		// 	query.MainRoadFacing="MainRoadFacing:"+"'"+MainRoadFacing+"'"+",";
		// 	console.log("jsonstring",""+query.MainRoadFacing);
			
		// }else{
		// 	console.log("jsonstring",""+query);
		// }
		// if (Refertype != ""||null) {
		// 	query.Refertype="Refertype:"+"'"+Refertype+"'"+",";
		// 	console.log("jsonstring",""+query.Refertype);
			
		// }else{
		// 	console.log("jsonstring",""+query);
		// }
	
		// let stringquery=query;
		
		try{
			// let response = await vancantlandSchema.find({
			// 	// Facing:'North'
			// 	// DTCP: DTCP,
			// 	// RegisterOffice: RegisterOffice,
			// 	// Sold: Sold,
			// 	// MainRoadFacing: MainRoadFacing,
			// 	// Refertype: Refertype,
			// 	// Facing:'North',DTCP:'Yes',RegisterOffice:'Rangampalayam',Sold:'Yes',MainRoadFacing:'Yes',Refertype:'Direct',
			// 	// stringquery
			// 	Facing:'North',DTCP:'Yes',RegisterOffice:'Rangampalayam',Sold:'Yes',MainRoadFacing:'Yes',Refertype:'Direct',
			// 	// Facing:'North',DTCP:'Yes',RegisterOffice:'Rangampalayam',Sold:'Yes',MainRoadFacing:'Yes',Refertype:'Direct',				
			// });

			 let response = await vancantlandSchema.find({$and:[{Facing:{$regex: Facing, $options: 'i'}},{DTCP:{$regex: DTCP, $options: 'i'}},{RegisterOffice:{$regex: RegisterOffice, $options: 'i'}},{Sold:{$regex: Sold, $options: 'i'}},{MainRoadFacing:{$regex: MainRoadFacing, $options: 'i'}},{Refertype:{$regex: Refertype, $options: 'i'}}]});
			// return response;


			let result = await vancantlandSchema.aggregate([{
				$match: {
					criteria

				}
			}]);
			// console.log("stringquery",""+stringquery);
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
			let response = await vancantlandSchema.deleteOne({_id: id});
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
            let response = await vancantlandSchema.update({_id: id}, body);
            return { status: "success",   msg:"Vancantland Updated successfully", result: response, message: "Updated Successfully" };

        } catch (error) {
            return { status: "error", error: error };
        }

    }

}
module.exports = new VancantlantController();