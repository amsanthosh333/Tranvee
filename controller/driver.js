const driverSchema = require('../model/driver');
const errorHandler = require('../utils/error.handler');

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
        let phone=responce.phone;
        let password=responce.password;
        try{
            let user = await driverSchema.findOne({
                phone: phone,
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
                phone: phone,
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

}
module.exports = new driverController();