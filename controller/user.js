const userSchema = require('./../model/user');
const errorHandler = require('./../utils/error.handler');


class UserController {


    async register(newGender){
        try{
            await userSchema.create(newGender);
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
            let alluser = await userSchema.findOne({});
            let user = await userSchema.findOne({
                username: username,
                password: password,
            });

            if(!user){
                console.log("alluser",alluser);
                throw new Error('invalid creds');
            }

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
            let user = await userSchema.findOne({
                username: username,
                password: password,
            });

            if(!user){ 
                throw new Error('invalid creds');
            }

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




    async add(farm){
		try{
			let response = await userSchema.create(farm);
			return { status: "success",   msg:"Customer Added successfully", result: response, message: "Added Successfully" };
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}
	
	async fetch(){
        try {
            let responce=await userSchema.aggregate([
              {$lookup:
                {
                  from: "designations",
                  localField: "Designation",
                  foreignField: "_id",
                  as: "designationDetails"
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

	async fetchdata(id){
		try{
			let response = await userSchema.find({_id: id});
			return response;
			
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}

    async fetchcustomerdata(referid){
		try{
			let response = await userSchema.find({referid: referid});
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
			let response = await userSchema.deleteOne({_id: id});
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
            let response = await userSchema.update({_id: id}, body);
            return { status: "success", msg:"Customer Updated successfully",result: response, message: "Updated Successfully" };

        } catch (error) {
            return { status: "error", error: error };
        }
}

}  

module.exports=new UserController();