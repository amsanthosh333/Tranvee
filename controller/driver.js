const driverSchema = require('../model/driver');
const errorHandler = require('../utils/error.handler');
var request = require('request');
const { URL } = require('url');  
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
class driverController{


    async register(newGender){
        try{
            await driverSchema.create(newGender);
   return {
                status: 'success',
                msg: 'Registered Sucessfully...'
            }
        } catch(err){
            return {
                status: 'error',
                msg: 'User creation failed'
            }
        }
    }

    async login(responce){
        let Mobileno=responce.Mobileno;
        let password=responce.password;
        try{
            let user = await driverSchema.findOne({
                Mobileno: Mobileno,
                password: password,
            });

            if(!user){
                throw new Error('invalid creds');
            }
            let token = this.generateToken();

            this.saveToken(user._id, token);

            user.token = token;
            return {
                status: "1",
                msg: "Login Sucessfully",
                token:""+user.token,
                user
            };

        } catch(error){
            return {
                status: '0',
                msg: 'username or password invalid'
            }
        }
    }




    async login1(phone,password){
       
        try{
            let user = await driverSchema.findOne({
                Mobileno: phone,
                password: password,
            });

            if(!user){
                throw new Error('invalid creds');
            }
            let token = this.generateToken();

            this.saveToken(user._id, token);

            user.token = token;

            return {
                status: "1",
                msg: "Login Sucessfully",
                user
            };

        } catch(error){
            return {
                status: '0',
                msg: 'username or password invalid'
            }
        }
    }
    async saveToken(userID, token){
        try{
            await driverSchema.update({_id: userID}, {token: token})
        } catch(err){
            console.log(err);
        }
    }

    generateToken() {
        let timeStamp = `${new Date().getTime()}`;

        return require('crypto').createHash('md5').update(timeStamp).digest('hex')
    }

    async validateToken(res, token){
        try{
            let user = await driverSchema.findOne({
                token: token
            });

            if(!user){
                throw new Error('invalid token');
            }

            global.userSession = user;
            
        } catch(error){
            res.send({
                status: '0',
                msg: 'Invalid token'
            });
        }
    }

	async add(farm){


		try{
			let response = await driverSchema.create(farm);
			return { status: "success",   msg:"driver Added successfully", result: response, message: "Added Successfully" };
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}
	
	async fetch(){
		try{
			let response = await driverSchema.find({});
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
			let response = await driverSchema.find({'_id':id});
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


    async aggregation(id) {
		try {
		let responce=await driverSchema.aggregate([
			{
				$match: {
					_id:ObjectId(id),
				}
			},{$lookup:
			{
			  from: "vachicles",
			  localField: "Vechicle",
			  foreignField: "_id",
			  as: "vechicalDetails"
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

    async aggregationdriver(referid) {
		try {
		let responce=await driverSchema.aggregate([
			{
				$match: {
					referid:ObjectId(referid),
				}
			},{$lookup:
			{
			  from: "vachicles",
			  localField: "Vechicle",
			  foreignField: "_id",
			  as: "vechicalDetails"
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

    async aggregationdriverstatus(status) {
		try {
		let responce=await driverSchema.aggregate([
			{
				$match: {
					Status:0,
				}
			},{$lookup:
			{
			  from: "vachicles",
			  localField: "Vechicle",
			  foreignField: "_id",
			  as: "vechicalDetails"
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

	async delete(id){
		try{
			let response = await driverSchema.deleteOne({_id: id});
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
            let response = await driverSchema.update({_id: id}, body);
            return { status: "success", msg:"driver Updated successfully",result: response, message: "Updated Successfully" };

        } catch (error) {
            return { status: "error", error: error };
        }

    }

    async passwordreset(body) {

        let phoneno=body.Mobileno;


        let user = await driverSchema.findOne({
            Mobileno: body.Mobileno,
        });

        console.log("user",""+user._id);
        var digits = '0123456789';
        var otpLength = 5;
        var otp = '';
for(let i=1; i<=otpLength; i++)   
{
var index = Math.floor(Math.random()*(digits.length));
otp = otp + digits[index];
}


const myURL = new URL(`https://2factor.in/API/V1/7eb26f75-8085-11eb-a9bc-0200cd936042/SMS/+91${phoneno}/${otp}`);

var options = {
 'method': 'GET',
 'url': myURL,
 'headers': {
 }
};
request(options, function (error, response) {
 if (error) throw new Error(error);
 console.log(response.body);
});

//   let payload = JSON.parse(myURL.href)
console.log(myURL.href);


let bodystr={
"password":""+otp
}
try {
let response = await driverSchema.update({_id: user._id}, bodystr);
return { status: "success", msg:"Customer Updated successfully",result: response, message: "Updated Successfully" };

} catch (error) {
return { status: "error", error: error };
}

}
   
}
module.exports = new driverController();