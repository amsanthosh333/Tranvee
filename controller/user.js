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

	async fetch(){
		try{
            let response = await partySchema.find({});
            let response1 = await commericialSchema.find({});
            let response2 = await farmSchema.find({});
            let response3 = await newhouseSchema.find({});
            let response4 = await vancantlandSchema.find({});
            let partycount=Object.keys(response).length;
            let commericialcount=Object.keys(response1).length;
            let farmcount=Object.keys(response2).length;
            let newhousecount=Object.keys(response3).length;
            let vancountcount=Object.keys(response4).length;
			return {
				partycount,
                commericialcount,
                farmcount,
                newhousecount,
                vancountcount
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
}

       

module.exports=new UserController();