const customerSchema = require('../model/customer');
const errorHandler = require('../utils/error.handler');


class CustomerController {


    async register(newGender){
        try{
            await customerSchema.create(newGender);
   return {
                status: 'success',
                msg: 'User created'
            }
        } catch(err){
            return {
                status: 'error',
                msg: 'User creation failed'
            }
        }
    }

    async login(responce){
        let username=responce.username;
        let password=responce.password;
        try{
            let user = await customerSchema.findOne({
                username: username,
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




    async login1(username,password){
       
        try{
            let user = await customerSchema.findOne({
                username: username,
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
            await customerSchema.update({_id: userID}, {token: token})
        } catch(err){
            console.log(err);
        }
    }

    generateToken() {
        let timeStamp = `${new Date().getTime()}`;

        return require('crypto').createHash('md5').update(timeStamp).digest('hex')
    }

    async validateToken(res, token, userId){
        try{
            let user = await userSchema.findOne({
                token: token
            });

            if(!user){
                throw new Error('invalid token');
            }

            global.userSession = user;
            
        } catch(error){
            res.send({
                status: 'error',
                msg: 'Invalid token'
            });
        }
    }

	async add(farm){
		try{
			let response = await customerSchema.create(farm);
			return { status: "success",   msg:"Customer Added successfully", result: response, message: "Added Successfully" };
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}
	
	async fetch(){
		try{
			let response = await customerSchema.find({});
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

	async fetchdata(token){
		try{
			let response = await customerSchema.find({'token':token});
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
			let response = await customerSchema.deleteOne({_id: id});
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
            let response = await customerSchema.update({_id: id}, body);
            return { status: "success", msg:"Customer Updated successfully",result: response, message: "Updated Successfully" };

        } catch (error) {
            return { status: "error", error: error };
        }

    }


}

       

module.exports=new CustomerController();