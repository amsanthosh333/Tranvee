const userModel = require('./../model/user');
const errorHandler = require('./../utils/error.handler');



class UserController {


    async register(username, password,email,phone){
        try{
            await userSchema.create({
                username: username,
                password: password,
                email: email,
                phone: phone
              
            });

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

    async login(username, password){
        try{
            let user = await userSchema.findOne({
                username: username,
                password: password,
            });

            if(!user){
                throw new Error('invalid creds');
            }

            return {
                status: "success",
                data: user
            };

        } catch(error){
            return {
                status: 'error',
                msg: 'username or password invalid'
            }
        }
    }

}

       

module.exports=new UserController();