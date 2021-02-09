const adminSchema = require('./../model/admin');
const errorHandler = require('./../utils/error.handler');


class adminController {


    async register(newGender){
        try{
            await adminSchema.create(newGender);
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
            let user = await adminSchema.findOne({
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

	async fetch(){
		try{
            let response = await adminSchema.find({});
          
            let count=Object.keys(response).length;
    
			return {
				count
           
			};
		} catch(error){
			return {
				status: "error",
				error: errorHandler.parseMongoError(error)
			};
		}
	}


    async login1(username,password){
       
        try{
            let user = await adminSchema.findOne({
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
}

       

module.exports=new adminController();